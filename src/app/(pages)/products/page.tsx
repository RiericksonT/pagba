"use client";

import Product from "@/interfaces/products";
import styles from "./products.module.scss";
import ProductCard from "@/app/components/productCard/productCard";
import { useEffect, useState } from "react";
import { GET } from "@/app/api/auth/[...nextauth]/route";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);

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
        (product) => product.category.name === category
      );
      setCopyProducts(filteredProducts);
    }
  }

  useEffect(() => {
    const res = fetch(`${process.env.NEXT_PUBLIC_API_URL}/product`, {
      method: "GET",
    }).then(async (res) => {
      if (res.ok) {
        const prod = res.json();
        setProducts(await prod);
      }
    });
    if (!selectedCategory) {
      setCopyProducts(products);
    }
  }, [products, selectedCategory]);

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
          <ProductCard product={product} key={product.name} />
        ))}
      </div>
    </div>
  );
}
