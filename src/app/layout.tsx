import VLibras from "@components/vlibras";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "../components/layout/footer";
import Header from "../components/layout/header";
import "./globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blog - Faculdade Betânia de Curitiba",
  description: "Blog - Faculdade Betânia de Curitiba",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
        <VLibras />
      </body>
    </html>
  );
}
