"use client";

import styles from "./modal.module.scss";
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/app/components/ui/dialog";
import { ModalContext } from "./modalContext";
import { useContext, useRef, useEffect } from "react";

export default function Modal() {
  const { show, setShow, product, setProduct } = useContext(ModalContext);
  const dialogRef = useRef(null);

  // Função para lidar com a mudança de estado do modal
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setProduct!(null); // Redefinindo o produto para null quando o modal é fechado
    }
    setShow(isOpen); // Atualiza o estado de visibilidade do modal
  };

  // Função para lidar com cliques fora do modal
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
              <form className={styles.form}>
                <div className={styles.formGroup}>
                  <label>Nome</label>
                  <input
                    type="text"
                    placeholder="Nome do produto"
                    defaultValue={product.name}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Preço</label>
                  <input
                    type="number"
                    placeholder="Preço do produto"
                    defaultValue={product.price}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Descrição</label>
                  <textarea
                    placeholder="Descrição do produto"
                    defaultValue={product.description}
                  ></textarea>
                </div>
                <div className={styles.formGroup}>
                  <label>Categoria</label>
                  <select defaultValue={product.category}>
                    <option value="">Selecione uma categoria</option>
                    <option value="Categoria 1">Categoria 1</option>
                    <option value="Categoria 2">Categoria 2</option>
                    <option value="Categoria 3">Categoria 3</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Imagens</label>
                  <input type="file" multiple className={styles.fileInput} />
                </div>
                <div className={styles.buttons}>
                  <button type="submit">Salvar</button>
                  <button type="reset" className={styles.cancel}>
                    Cancelar
                  </button>
                </div>
              </form>
            </>
          ) : (
            <>
              <h1>Adicionar Produto</h1>
              <form className={styles.form}>
                <div className={styles.formGroup}>
                  <label>Nome</label>
                  <input type="text" placeholder="Nome do produto" />
                </div>
                <div className={styles.formGroup}>
                  <label>Preço</label>
                  <input type="number" placeholder="Preço do produto" />
                </div>
                <div className={styles.formGroup}>
                  <label>Descrição</label>
                  <textarea placeholder="Descrição do produto"></textarea>
                </div>
                <div className={styles.formGroup}>
                  <label>Categoria</label>
                  <select>
                    <option value="">Selecione uma categoria</option>
                    <option value="1">Categoria 1</option>
                    <option value="2">Categoria 2</option>
                    <option value="3">Categoria 3</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Imagens</label>
                  <input type="file" multiple className={styles.fileInput} />
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
