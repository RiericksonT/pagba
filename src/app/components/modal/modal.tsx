"use client";

import styles from "./modal.module.scss";
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/app/components/ui/dialog";
import { ModalContext } from "./modalContext";
import { useForm } from "react-hook-form";
import { useContext, useRef, useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import category from "@/interfaces/category";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

// Schema de validação com zod
const schema = z.object({
  name: z.string().nonempty("Nome é obrigatório"),
  price: z
    .string()
    .refine((val) => !isNaN(Number(val)), {
      message: "Preço deve ser um número",
    })
    .transform((val) => Number(val)),
  description: z.string().nonempty("Descrição é obrigatória"),
  categoryId: z.string().nonempty("Categoria é obrigatória"),
  imagesIds: z.any(),
});

type FormDataa = z.infer<typeof schema>;

export default function Modal() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataa>({
    criteriaMode: "all",
    mode: "all",
    resolver: zodResolver(schema),
  });
  const {
    show,
    setShow,
    typeModal,
    setTypeModal,
    product,
    setProduct,
    successMessage,
    setSuccessMessage,
    errorMessage,
    setErrorMessage,
  } = useContext(ModalContext);

  const [categories, setCategories] = useState<category[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dialogRef = useRef<HTMLDivElement | null>(null);

  const handleSubmission = async (data: FormDataa) => {
    setIsSubmitting(true);

    let formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price.toString());
    formData.append("description", data.description);
    formData.append("categoryId", data.categoryId);

    for (let i = 0; i < data.imagesIds.length; i++) {
      const image = data.imagesIds[i];
      if (!ACCEPTED_IMAGE_TYPES.includes(image.type)) {
        setTypeModal("error");
        setErrorMessage("Formato de imagem inválido");
        setShow(true);
        setIsSubmitting(false);
        return;
      }
      formData.append("imagesIds", image);
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/product`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        setTypeModal("message");
        setSuccessMessage("Produto cadastrado com sucesso!");
        setShow(true);
      } else {
        setTypeModal("error");
        setErrorMessage("Erro ao adicionar o produto");
        setShow(true);
      }
    } catch (error) {
      setTypeModal("error");
      setErrorMessage("Erro ao adicionar o produto");
      setShow(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setProduct(undefined);
    }
    setTypeModal("form");
    setShow(isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dialogRef.current &&
      !dialogRef.current.contains(event.target as Node)
    ) {
      handleOpenChange(false);
    }
  };

  useEffect(() => {
    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/category`).then(async (res) => {
      if (res.status === 200) {
        const data = await res.json();
        setCategories(data);
      } else {
        setTypeModal("error");
        setShow(true);
        setErrorMessage("Erro ao carregar categorias");
      }
    });

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show]);

  return (
    <Dialog open={show} onOpenChange={handleOpenChange}>
      <DialogContent
        className={
          typeModal === "form" ? styles.modal : styles.messageOnlyModal
        }
        ref={dialogRef}
      >
        <DialogHeader onClick={() => handleOpenChange(false)} />
        <div className={styles.modalContent}>
          {typeModal === "form" ? (
            <>
              <h1>{product ? "Editar Produto" : "Adicionar Produto"}</h1>
              <form
                className={styles.form}
                onSubmit={handleSubmit(handleSubmission)}
                encType="multipart/form-data"
              >
                <div className={styles.formGroup}>
                  <label>Nome</label>
                  <input
                    type="text"
                    placeholder="Nome do produto"
                    {...register("name")}
                    disabled={isSubmitting}
                  />
                  {errors.name && <span>{errors.name.message}</span>}
                </div>
                <div className={styles.formGroup}>
                  <label>Preço</label>
                  <input
                    type="number"
                    placeholder="Preço do produto"
                    step={0.01}
                    {...register("price")}
                    disabled={isSubmitting}
                  />
                  {errors.price && <span>{errors.price.message}</span>}
                </div>
                <div className={styles.formGroup}>
                  <label>Descrição</label>
                  <textarea
                    placeholder="Descrição do produto"
                    {...register("description")}
                    disabled={isSubmitting}
                  ></textarea>
                  {errors.description && (
                    <span>{errors.description.message}</span>
                  )}
                </div>
                <div className={styles.formGroup}>
                  <label>Categoria</label>
                  <select {...register("categoryId")} disabled={isSubmitting}>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  {errors.categoryId && (
                    <span>{errors.categoryId.message}</span>
                  )}
                </div>
                <div className={styles.formGroup}>
                  <label>Imagens</label>
                  <input
                    type="file"
                    multiple
                    className={styles.fileInput}
                    {...register("imagesIds")}
                    disabled={isSubmitting}
                  />
                </div>
                <div className={styles.buttons}>
                  <button type="submit" disabled={isSubmitting}>
                    {isSubmitting
                      ? product
                        ? "Salvando..."
                        : "Adicionando..."
                      : product
                      ? "Salvar"
                      : "Adicionar"}
                  </button>
                  <button
                    type="reset"
                    className={styles.cancel}
                    disabled={isSubmitting}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div
              className={
                typeModal === "message"
                  ? `${styles.messageBox} ${styles.success}`
                  : `${styles.messageBox} ${styles.error}`
              }
            >
              <h1 className={styles.message}>
                {typeModal === "message" ? (
                  <>
                    <FaCheckCircle color="#28a745" />
                    Sucesso!
                  </>
                ) : (
                  <>
                    <FaTimesCircle color="#dc3545" />
                    Erro!
                  </>
                )}
              </h1>
              <p>{typeModal === "message" ? successMessage : errorMessage}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
