"use client";

import Image from "next/image";
import styles from "./header.module.scss";
import { Search, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [categories, setCategories] = useState<string[]>([]);
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
        <Image src="/logo.svg" alt="Logo Pagbá" width={100} height={100} />
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
          </ul>
        </nav>
      </div>
      <div className={styles.search}>
        <input type="text" placeholder="Pesquisar" />
        <button>
          <Search size={20} />
        </button>
      </div>
    </header>
  );
}
