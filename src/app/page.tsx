import Image from "next/image";
import Head from "./components/home/home";
import style from "./style/page.module.scss";
import Who from "./components/whoweare/who";
import Contact from "./components/contact/contact";

export default function Home() {
  return (
    <main className={style.homePage}>
      <div id="home" className={style.home}>
        <Head />
      </div>
      <div id="who" className={style.who}>
        <Who />
      </div>
      <div id="contact" className={style.contact}>
        <Contact />
      </div>
    </main>
  );
}
