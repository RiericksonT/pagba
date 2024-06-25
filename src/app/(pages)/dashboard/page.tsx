"use client";

import DataTable, { Selector } from "react-data-table-component";
import styles from "./dashboard.module.scss";
import { Pencil, Trash } from "lucide-react";
import Modal from "@/app/components/modal/modal";
import ModalProvider from "@/app/components/modal/modalProvider";
import { ModalContext } from "@/app/components/modal/modalContext";
import { useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Product from "@/interfaces/products";

export default function DashboardPage() {
  const { show, setShow } = useContext(ModalContext);
  const { product, setProduct } = useContext(ModalContext);
  const { data: session } = useSession();

  function handleDelete(id: string) {
    const response = fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/${id}`, {
      method: "DELETE",
    }).then(async (res) => {
      if (res.ok) {
        alert("Produto excluido com sucesso");
      }
    });
  }

  const styleTable = {
    table: {
      style: {
        width: "100%",
        border: "1px solid #3a006c",
      },
    },
    headRow: {
      style: {
        backgroundColor: "#3a006c",
        color: "#ececec",
      },
    },
    headCells: {
      style: {
        color: "#ececec",
        fontSize: "16px",
      },
    },
    rows: {
      style: {
        "&:not(:last-of-type)": {
          borderBottom: "1px solid #3a006c",
        },
        "&:nth-of-type(odd)": {
          backgroundColor: "#f0f0f0",
        },

        fontSize: "14px",
      },
    },
  };

  const columns = [
    {
      name: "Nome",
      selector: (row: any) => row.name,
      sortable: true,
    },
    {
      name: "Preço",
      selector: (row: any) => row.price,
      sortable: true,
      cell: (row: any) => <span>R$ {row.price}</span>,
    },
    {
      name: "Categoria",
      selector: (row: any) => row.category.name,
      sortable: true,
    },
    {
      name: "Editar",
      cell: (row: any) => (
        <div className={styles.actions}>
          <button
            onClick={() => {
              setProduct!(row), setShow(true);
            }}
          >
            <Pencil size={24} />
          </button>
          <button
            onClick={() => {
              handleDelete(row.id);
            }}
          >
            <Trash size={24} />
          </button>
        </div>
      ),
    },
  ];

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const res = fetch(`${process.env.NEXT_PUBLIC_API_URL}/product`, {
      method: "GET",
    }).then(async (res) => {
      if (res.ok) {
        const prod = res.json();
        setProducts(await prod);
        console.log(await prod);
      }
    });
  }, [products]);

  return (
    <div className={styles.dashboard}>
      <h1>Dashboard</h1>
      <div className={styles.header}>
        <h2 className={styles.title}>Olá, {session?.user?.name}</h2>
        <button className={styles.button} onClick={() => setShow(true)}>
          Adicionar Produto
        </button>
      </div>
      <div className={styles.table}>
        <DataTable
          columns={columns}
          data={products}
          className={styles.dataTable}
          responsive
          fixedHeader
          customStyles={styleTable}
        />
      </div>
    </div>
  );
}
