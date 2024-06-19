"use client";

import Product from "@/interfaces/products";
import React, { createContext } from "react";

interface ModalContextProps {
  show: boolean;
  setShow: (show: boolean) => void;
  product?: Product;
  setProduct: (product: Product | null) => void;
}

export const ModalContext = createContext<ModalContextProps>({
  show: false,
} as ModalContextProps);
