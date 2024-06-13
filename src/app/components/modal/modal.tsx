"use client";

import styles from "./modal.module.scss";
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/app/components/ui/dialog";
import { ModalContext } from "./modalContext";
import { useForm } from "react-hook-form";
import { useContext, useRef, useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
  category: z.string().nonempty("Categoria é obrigatória"),
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
  const { show, setShow, product, setProduct } = useContext(ModalContext);

  const dialogRef = useRef(null);

  const { NEXT_PUBLIC_API_URL } = process.env;

  const handleSubmission = async (data: FormDataa) => {
    let formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price.toString());
    formData.append("description", data.description);
    formData.append("category", data.category);
    for (let i = 0; i < data.imagesIds.length; i++) {
      const image = data.imagesIds[i];
      if (!ACCEPTED_IMAGE_TYPES.includes(image.type)) {
        alert("Tipo de imagem inválido");
        return;
      }
      formData.append("imagesIds", image);
    }
    try {
      const response = await fetch(`http://localhost:4000/product`, {
        method: "POST",

        body: formData,
      });
      if (response.ok) {
        alert("Produto adicionado com sucesso");
      } else {
        alert(`Erro ao adicionar o produto: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Erro ao adicionar o produto:", error);
      alert("Erro ao adicionar o produto");
    }
  };
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setProduct(null);
    }
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

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show]);

  return (
    <Dialog open={show} onOpenChange={handleOpenChange}>
      <DialogContent className={styles.modal} ref={dialogRef}>
        <DialogHeader onClick={() => handleOpenChange(false)} />
        <div className={styles.modalContent}>
          {product ? (
            <>
              <h1>Editar Produto</h1>
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
                    defaultValue={product.name}
                    {...register("name")}
                  />
                  {errors.name && <span>{errors.name.message}</span>}
                </div>
                <div className={styles.formGroup}>
                  <label>Preço</label>
                  <input
                    type="number"
                    placeholder="Preço do produto"
                    defaultValue={product.price}
                    step={0.01}
                    {...register("price")}
                  />
                  {errors.price && <span>{errors.price.message}</span>}
                </div>
                <div className={styles.formGroup}>
                  <label>Descrição</label>
                  <textarea
                    placeholder="Descrição do produto"
                    defaultValue={product.description}
                    {...register("description")}
                  ></textarea>
                  {errors.description && (
                    <span>{errors.description.message}</span>
                  )}
                </div>
                <div className={styles.formGroup}>
                  <label>Categoria</label>
                  <select
                    defaultValue={product.category}
                    {...register("category")}
                  >
                    <option value="">Selecione uma categoria</option>
                    <option value="Categoria 1">Categoria 1</option>
                    <option value="Categoria 2">Categoria 2</option>
                    <option value="Categoria 3">Categoria 3</option>
                  </select>
                  {errors.category && <span>{errors.category.message}</span>}
                </div>
                <div className={styles.formGroup}>
                  <label>Imagens</label>
                  <input
                    type="file"
                    multiple
                    className={styles.fileInput}
                    {...register("imagesIds")}
                  />
                  {errors.imagesIds && <span>{errors.imagesIds.message}</span>}
                </div>

                <button type="submit">Salvar</button>
                <button type="reset" className={styles.cancel}>
                  Cancelar
                </button>
              </form>
            </>
          ) : (
            <>
              <h1>Adicionar Produto</h1>
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
                  />
                  {errors.price && <span>{errors.price.message}</span>}
                </div>
                <div className={styles.formGroup}>
                  <label>Descrição</label>
                  <textarea
                    placeholder="Descrição do produto"
                    {...register("description")}
                  ></textarea>
                  {errors.description && (
                    <span>{errors.description.message}</span>
                  )}
                </div>
                <div className={styles.formGroup}>
                  <label>Categoria</label>
                  <select {...register("category")}>
                    <option value="">Selecione uma categoria</option>
                    <option value="Categoria 1">Categoria 1</option>
                    <option value="Categoria 2">Categoria 2</option>
                    <option value="Categoria 3">Categoria 3</option>
                  </select>
                  {errors.category && <span>{errors.category.message}</span>}
                </div>
                <div className={styles.formGroup}>
                  <label>Imagens</label>
                  <input
                    type="file"
                    multiple
                    className={styles.fileInput}
                    {...register("imagesIds")}
                  />
                  {errors.imagesIds && <span>{errors.imagesIds.message}</span>}
                </div>
                <div className={styles.buttons}>
                  <button type="submit">Adicionar</button>
                  <button type="reset" className={styles.cancel}>
                    Cancelar
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
