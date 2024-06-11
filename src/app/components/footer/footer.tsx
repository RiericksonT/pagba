import Link from "next/link";
import styles from "./footer.module.scss";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainerUp}>
        <div className={styles.containerLogo}>
          <Image src="/logo.svg" alt="Logo" width={200} height={200} />
        </div>
        <div className={styles.containerLinks}>
          <a href="#" className={styles.link}>
            Home
          </a>
          <a href="#" className={styles.link}>
            Quem somos
          </a>
          <a href="#" className={styles.link}>
            Contato
          </a>
          <Link href="/login" className={styles.link}>
            Admin
          </Link>
        </div>
        <div className={styles.containerSocial}>
          <a href="#" className={styles.social}>
            <Image src="/facebook.svg" alt="Facebook" width={50} height={50} />
          </a>
          <a href="#" className={styles.social}>
            <Image
              src="/instagram.svg"
              alt="Instagram"
              width={50}
              height={50}
            />
          </a>
          <a href="#" className={styles.social}>
            <Image src="/whatsapp.svg" alt="Twitter" width={50} height={50} />
          </a>
        </div>
      </div>
      <div className={styles.footerContainerDown}>
        <h2 className={styles.text}>
          © 2024 - Todos os direitos reservados - Desenvolvido por BTS Dev
        </h2>
        <a href="#" className={styles.link}>
          @btsdev
        </a>
      </div>
    </footer>
  );
}
