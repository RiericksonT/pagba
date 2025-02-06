"use client";

import Image from "next/image";
import styles from "./header.module.scss";
import { Search, ChevronDown, Phone, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Image src="/logo.svg" alt="Logo Pagbá" width={100} height={100} />
      </div>
      <button
        className={styles.menuToggle}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <div className={`${styles.menu} ${menuOpen ? styles.open : ""}`}>
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
            ) : null}
            <li className={styles.searchMobile}>
              {session ? (
                <button onClick={() => signOut()}>Sair</button>
              ) : (
                <Phone />
              )}
            </li>
          </ul>
        </nav>
      </div>
      <div className={styles.search}>
        {session ? <button onClick={() => signOut()}>Sair</button> : <Phone />}
      </div>
    </header>
  );
}
