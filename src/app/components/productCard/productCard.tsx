import Product from "@/interfaces/products";
import styles from "./productcard.module.scss";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Slider {...settings}>
          {product.images.map((image, index) => (
            <div key={index}>
              <Image src={image} alt={product.name} width={300} height={300} />
            </div>
          ))}
        </Slider>
      </div>
      <div className={styles.infoContainer}>
        <h1>{product.name}</h1>
        <p className={styles.truncate}>{product.description}</p>
        <h2>R$ {product.price}</h2>
        <Link className={styles.button} href={`/products/${product.id}`}>
          Comprar
        </Link>
      </div>
    </div>
  );
}
