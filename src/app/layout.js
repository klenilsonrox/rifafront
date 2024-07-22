import { Inter } from "next/font/google";
import "./globals.css";
import HeaderLogado from "./components/HeaderLogado";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Rx campanhas",
  description: "gerencie  suas campanhas de forma fácil",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
     <link rel="shortcut icon" href="./favicon.png" type="image/x-icon"></link>

      <body className={inter.className}>
        <HeaderLogado />
        {children}</body>
    </html>
  );
}
