import React, { useState, useMemo } from "react";
import Product from "@/interfaces/products";
import styles from "./productcard.module.scss";
import Image from "next/image";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  // Memoizar settings para não recriar objeto toda render
  const sliderSettings: Settings = useMemo(() => ({
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true, // recomendo ativar só se necessário
    autoplaySpeed: 6000,
    arrows: true,
    adaptiveHeight: true,
  }), []);

  // Garantir array de imagens para evitar erro
  const images = Array.isArray(product.images) && product.images.length > 0
    ? product.images
    : ["/placeholder.png"]; // substitua pelo caminho de um placeholder válido

  return (
    <div className={styles.container} role="group" aria-label={`Produto ${product.name}`}>
      <div className={styles.imageContainer}>
        <Slider {...sliderSettings}>
          {images.map((src, idx) => (
            <ImageWithLoading
              key={idx}
              src={src}
              alt={`${product.name} - imagem ${idx + 1}`}
              width={300}
              height={300}
            />
          ))}
        </Slider>
      </div>

      <div className={styles.infoContainer}>
        <h1>{product.name}</h1>
        <p className={styles.truncate}>{product.description}</p>
        <h2>R$ {product.price.toFixed(2)}</h2>
        <Link
          className={styles.button}
          href="https://wa.me/c/558182199466"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Comprar ${product.name} via WhatsApp`}
        >
          Comprar
        </Link>
      </div>
    </div>
  );
}

type ImageWithLoadingProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

function ImageWithLoading({ src, alt, width, height }: ImageWithLoadingProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Você pode mover esse spinner para o CSS do módulo para melhor controle
  const spinner = (
    <div className={styles.spinner} role="status" aria-live="polite" aria-label="Carregando imagem">
      <svg
        width="40"
        height="40"
        viewBox="0 0 50 50"
        xmlns="http://www.w3.org/2000/svg"
        stroke="#555"
      >
        <g fill="none" fillRule="evenodd" strokeWidth="4">
          <circle cx="25" cy="25" r="20" strokeOpacity=".2" />
          <path d="M45 25c0-11.046-8.954-20-20-20">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 25 25"
              to="360 25 25"
              dur="1s"
              repeatCount="indefinite"
            />
          </path>
        </g>
      </svg>
    </div>
  );

  return (
    <div className={styles.imageWrapper} style={{ width, height }}>
      {loading && !error && spinner}

      {error && (
        <div className={styles.errorMessage} role="alert" aria-live="assertive">
          Falha ao carregar imagem
        </div>
      )}

      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        onLoad={() => setLoading(false)}
        onError={() => {
          setLoading(false);
          setError(true);
        }}
        style={{
          opacity: loading || error ? 0 : 1,
          transition: "opacity 0.3s ease-in-out",
        }}
      />

    </div>
  );
}
