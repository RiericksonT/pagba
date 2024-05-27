import Image from "next/image";
import style from "./who.module.scss";
import { MessageCircleQuestion, ShieldMinus } from "lucide-react";

export default function Who() {
  return (
    <>
      <div className={style.containerWho}>
        <div className={style.titleContainer}>
          <h1 className={style.title}>Quem somos?</h1>
        </div>
        <div className={style.textContainer}>
          <p className={style.text}>
            Somos uma empresa que busca sempre a satisfação do cliente, com
            produtos de qualidade e preços acessíveis.
          </p>
        </div>
        <MessageCircleQuestion size={100} />
      </div>
      <div className={style.containerMission}>
        <div className={style.titleContainerM}>
          <h1 className={style.titleM}>Nossa Missão</h1>
        </div>
        <div className={style.textContainerM}>
          <p className={style.textM}>
            Somos uma empresa que busca sempre a satisfação do cliente, com
            produtos de qualidade e preços acessíveis.
          </p>
        </div>
        <ShieldMinus size={100} />
      </div>
    </>
  );
}
