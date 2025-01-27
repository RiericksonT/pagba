"use client";

import Product from "@/interfaces/products";
import { ModalContext } from "./modalContext";
import React, { useState } from "react";

function ModalProvider({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(false);
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [typeModal, setTypeModal] = useState<"form" | "message" | "error">(
    "form"
  );
  const [successMessage, setSuccessMessage] = useState<string | undefined>(
    undefined
  );
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  return (
    <ModalContext.Provider
      value={{
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
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
export default ModalProvider;
