"use client";

import Product from "@/interfaces/products";
import styles from "./products.module.scss";
import ProductCard from "@/app/components/productCard/productCard";
import { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [copyProducts, setCopyProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Garantindo categorias únicas por ID
  const categories = Array.from(
    new Map(products.map((p) => [p.category.id, p.category])).values()
  );

  function handleClick(categoryId: string) {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null);
      setCopyProducts(products);
    } else {
      setSelectedCategory(categoryId);
      const filteredProducts = products.filter(
        (product) => product.category.id === categoryId
      );
      setCopyProducts(filteredProducts);
    }
  }

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product`);
      if (res.ok) {
        const prod = await res.json();
        setProducts(prod);
        setCopyProducts(prod);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.category}>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleClick(category.id)}
            className={selectedCategory === category.id ? styles.active : ""}
          >
            {category.name}
          </button>
        ))}
      </div>
      <div className={styles.products}>
        {copyProducts.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}
