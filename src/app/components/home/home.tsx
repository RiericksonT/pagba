import style from "./home.module.scss";
import Image from "next/image";
import { ChevronsDown } from "lucide-react";

export default function Head() {
  return (
    <div className={style.container}>
      <Image
        src="./prop.svg"
        alt="Produtos: Ps5, Tv e iphone"
        width={800}
        height={500}
      />
      <div className={style.textContainer}>
        <h1 className={style.title}>Bem vindos a Pagbá!</h1>
        <p className={style.text}>
          Aqui você encontra os melhores produtos do mercado com os melhores
          preços.
        </p>
        <button>
          <a href="/produtos">Ver mais</a>
        </button>
        <ChevronsDown size={20} />
      </div>
    </div>
  );
}
