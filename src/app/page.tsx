import Image from "next/image";
import Head from "./components/home/home";
import style from "./style/page.module.scss";
import Who from "./components/whoweare/who";
import Contact from "./components/contact/contact";

export default function Home() {
  return (
    <>
      <div id="home">
        <Head />
      </div>
      <div id="who">
        <Who />
      </div>
      <div id="contact">
        <Contact />
      </div>
    </>
  );
}
