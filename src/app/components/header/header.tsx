"use client";

import Image from "next/image";
import styles from "./header.module.scss";
import { Search, ChevronDown, Phone } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";

export default function Header() {
  const [categories, setCategories] = useState<string[]>([]);
  const { data: session } = useSession();
  var products = [
    {
      name: "Ps5",
      category: "Consoles",
      price: 5000,
      image: "/images/ps5.jpg",
      description: "O melhor console da nova geração.",
    },
    {
      name: "Tv",
      category: "Eletrônicos",
      price: 3000,
      image: "/images/tv.jpg",
      description: "A melhor TV do mercado.",
    },
    {
      name: "Iphone",
      category: "Celulares",
      price: 5000,
      image: "/images/iphone.jpg",
      description: "O melhor celular do mercado.",
    },
  ];

  if (products.length > 0) {
    products.forEach((product) => {
      if (!categories.includes(product.category)) {
        categories.push(product.category);
      }
    });
  }

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Image src="/whatsapp.svg" alt="Logo Pagbá" width={100} height={100} />
      </div>
      <div className={styles.menu}>
        <nav className={styles.nav}>
          <ul className={styles.ul}>
            <li>
              <a href="/#home">Home</a>
            </li>
            <li>
              <a href="/#who">Sobre</a>
            </li>
            <li>
              <a href="/#contact">Contato</a>
            </li>
            <li className={styles.products}>
              <Link href="/products">Produtos</Link>
            </li>
            {session ? (
              <li>
                <Link href="/dashboard">Dashboard</Link>
              </li>
            ) : (
              <></>
            )}
          </ul>
        </nav>
      </div>
      <div className={styles.search}>
        {session ? (
          <div className={styles.search}>
            <button onClick={() => signOut()}>Sair</button>
          </div>
        ) : (
          <Phone />
        )}
      </div>
    </header>
  );
}
