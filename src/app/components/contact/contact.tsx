import { FaWhatsapp } from "react-icons/fa";
import styles from "./contact.module.scss";
import Image from "next/image";
import Link from "next/link";

export default function Contact() {
  return (
    <div className={styles.container}>
      <div className={styles.contact}>
        <h1 className={styles.title}>Contato</h1>
        <h2 className={styles.text}>
          Entre em contato conosco através do nosso whatsapp:{" "}
          <a href="https://wa.me/c/558182199466">+55 (81) 98219-9466</a>
        </h2>
        <Image src="/qrwhats.svg" alt="Whatsapp" width={250} height={250} />
        <Link href="https://wa.me/c/558182199466">
          <FaWhatsapp size={80} />
        </Link>
      </div>
      <div className={styles.newsletterContainer}>
        <form action="" className={styles.form}>
          <h2 className={styles.newsletter}>
            Deseja receber um email com as novidades do nosso catalogo? Se
            inscreva em nossa newsletter!
            <input
              type="email"
              placeholder="Digite seu email"
              className={styles.input}
            />
            <button type="submit" className={styles.button}>
              Inscrever-se
            </button>
          </h2>
        </form>
      </div>
    </div>
  );
}
