import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./style/globals.scss";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import ModalProvider from "./components/modal/modalProvider";
import Modal from "./components/modal/modal";
import ReactQueryProvider from "@/lib/query/reactQuery";
import { AuthProvider } from "./api/auth/provider/authProvider";

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
    <AuthProvider>
      <html lang="pt-br">
        <body className={inter.className}>
          <Header />
          <ModalProvider>
            <ReactQueryProvider>
              <Modal />
              <main>{children}</main>
            </ReactQueryProvider>
          </ModalProvider>
          <footer>{Footer()}</footer>
        </body>
      </html>
    </AuthProvider>
  );
}
