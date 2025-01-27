"use client";

import { useParams } from "next/navigation";
import { Key, useContext, useEffect, useState } from "react";
import Image from "next/image";
import styles from "./product.module.scss";
import Slider from "react-slick";
import Product from "@/interfaces/products";
import { FaArrowLeft } from "react-icons/fa";
import { ModalContext } from "@/app/components/modal/modalContext";
import { set } from "react-hook-form";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export default function ProductDetails({
  params,
}: {
  params: { productID: string };
}) {
  const { productId } = useParams<{ productId: string }>();
  const { show, setShow, setTypeModal, setErrorMessage, setSuccessMessage } =
    useContext(ModalContext);
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [images, setImages] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  useEffect(() => {
    if (productId) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/${productId}`, {
        method: "GET",
      })
        .then(async (res) => {
          if (res.ok) {
            const productData = await res.json();
            setImages(productData.productImage);
            setProduct(productData.product);
            setIsLoading(false);
          }
        })
        .catch((error) => {
          setTypeModal("error");
          setErrorMessage("Erro ao carregar o produto");
          setIsLoading(false);
          setShow(true);
        });
    }
  });

  if (isLoading) {
    return <div>Loading...</div>; // Or any other loading indication
  }

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Slider {...settings}>
          {images!.map(
            (
              image: { url: string | StaticImport },
              index: Key | null | undefined
            ) => (
              <div key={index}>
                <Image
                  src={image.url}
                  alt={product!.name}
                  width={300}
                  height={300}
                />
              </div>
            )
          )}
        </Slider>
      </div>
      <div className={styles.infoContainer}>
        <h1>{product!.name}</h1>
        <p>{product!.description}</p>
        <h2>R$ {product!.price}</h2>
        <button className={styles.button}>Comprar</button>
      </div>
    </div>
  );
}
