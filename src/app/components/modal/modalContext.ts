"use client";

import Product from "@/interfaces/products";
import React, { createContext } from "react";
import { set } from "react-hook-form";

interface ModalContextProps {
  show: boolean;
  setShow: (show: boolean) => void;
  product?: Product;
  setProduct: (product: Product | undefined) => void;
  typeModal: "form" | "message" | "error";
  setTypeModal: (type: "form" | "message" | "error") => void;
  successMessage?: string;
  setSuccessMessage: (message: string | undefined) => void;
  errorMessage?: string;
  setErrorMessage: (message: string | undefined) => void;
}

export const ModalContext = createContext<ModalContextProps>({
  show: false,
} as ModalContextProps);
