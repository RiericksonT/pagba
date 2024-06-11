"use client";

import Product from "@/interfaces/products";
import { ModalContext } from "./modalContext";
import React, { useState } from "react";

function ModalProvider({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState<boolean>(false);
  const [product, setProduct] = useState<Product | undefined>(undefined);

  return (
    <ModalContext.Provider value={{ show, setShow, product, setProduct }}>
      {children}
    </ModalContext.Provider>
  );
}
export default ModalProvider;
