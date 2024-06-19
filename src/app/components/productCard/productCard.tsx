import Product from "@/interfaces/products";
import styles from "./productcard.module.scss";
import Image from "next/image";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image
          src={product.images}
          alt={product.name}
          width={300}
          height={300}
        />
      </div>
      <div className={styles.infoContainer}>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <h2>R$ {product.price}</h2>
        <button className={styles.button}>Comprar</button>
      </div>
    </div>
  );
}
