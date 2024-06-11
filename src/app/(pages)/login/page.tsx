"use client";

import Link from "next/link";
import styles from "./auth.module.scss";
import { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import DashboardPage from "../dashboard/page";
import { LoaderCircle } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoad, setIsLoad] = useState(false);
  const [error, setError] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoad(true);

    const response = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (!response?.error) {
      window.location.href = "/dashboard";
      setIsLoad(false);
    }

    if (response?.error) {
      setIsLoad(false);
      setError(true);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Faça seu login</h1>
      {isLoad ? (
        <div className={styles.loading}>
          <LoaderCircle size={50} />
        </div>
      ) : (
        <div className={styles.form}>
          {error && (
            <span style={{ color: "red" }}>
              Email ou senha incorretos, tente novamente.
            </span>
          )}
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button onClick={handleLogin}>Entrar</button>

          <div className={styles.actions}>
            <Link href="/register">Criar conta</Link>
            <Link href="/forgot-password">Esqueci minha senha</Link>
          </div>
        </div>
      )}
    </div>
  );
}
