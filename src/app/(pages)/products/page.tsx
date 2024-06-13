"use client";

import Product from "@/interfaces/products";
import styles from "./products.module.scss";
import ProductCard from "@/app/components/productCard/productCard";
import { useEffect, useState } from "react";

export default function Products() {
  const [products] = useState<Product[]>([
    {
      name: "Ps5",
      category: "Consoles",
      price: 5000,
      images: "https://i.imgur.com/5ZQ3j5S.jpg",
      description: "O melhor console da nova geração.",
    },
    {
      name: "Tv",
      category: "Eletrônicos",
      price: 3000,
      images: "https://i.imgur.com/5ZQ3j5S.jpg",
      description: "A melhor TV do mercado.",
    },
    {
      name: "Iphone",
      category: "Celulares",
      price: 5000,
      images: "https://i.imgur.com/5ZQ3j5S.jpg",
      description: "O melhor celular do mercado.",
    },
  ]);

  const [copyProducts, setCopyProducts] = useState<Product[]>(products);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(
    new Set(products.map((product) => product.category))
  );

  function handleClick(category: string) {
    if (selectedCategory === category) {
      // If the same category is clicked again, reset to the original product list
      setSelectedCategory(null);
      setCopyProducts(products);
    } else {
      // Filter products by the selected category
      setSelectedCategory(category);
      const filteredProducts = products.filter(
        (product) => product.category === category
      );
      setCopyProducts(filteredProducts);
    }
  }

  useEffect(() => {
    if (!selectedCategory) {
      setCopyProducts(products);
    }
  }, [products, selectedCategory]);

  return (
    <div className={styles.container}>
      <div className={styles.category}>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleClick(category)}
            className={selectedCategory === category ? styles.active : ""}
          >
            {category}
          </button>
        ))}
      </div>
      <div className={styles.products}>
        {copyProducts.map((product) => (
          <ProductCard product={product} key={product.name} />
        ))}
      </div>
    </div>
  );
}
