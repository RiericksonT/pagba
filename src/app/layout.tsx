import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./style/globals.scss";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pagbá",
  description: "Seja bem-vindo a Pagbá!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <footer>{Footer()}</footer>
      </body>
    </html>
  );
}
