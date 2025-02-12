"use client";

import Link from "next/link";
import styles from "./register.module.scss";
import { useForm } from "react-hook-form";
import User from "@/interfaces/users";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { ModalContext } from "@/app/components/modal/modalContext";

const schema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

type FormData = z.infer<typeof schema>;

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    criteriaMode: "all",
    mode: "all",
    resolver: zodResolver(schema),
  });

  const { setErrorMessage, setSuccessMessage, setShow, setTypeModal } =
    useContext(ModalContext);

  const handleRegister = async (data: User) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.ok) {
        setTypeModal("message");
        setSuccessMessage("Usuário cadastrado com sucesso");
        setShow(true);
      }
    });
  };

  return (
    <div className={styles.container}>
      <h1>Crie sua conta</h1>
      <form className={styles.form} onSubmit={handleSubmit(handleRegister)}>
        <input type="text" placeholder="Nome" required {...register("name")} />
        {errors.name && <span>{errors.name.message}</span>}
        <input
          type="email"
          placeholder="Email"
          required
          {...register("email")}
        />
        {errors.email && <span>{errors.email.message}</span>}
        <input
          type="password"
          placeholder="Senha"
          required
          {...register("password")}
        />
        {errors.password && <span>{errors.password.message}</span>}
        <button type="submit">Cadastrar</button>

        <div className={styles.actions}>
          <Link href="/login">Já tenho uma conta</Link>
        </div>
      </form>
    </div>
  );
}
