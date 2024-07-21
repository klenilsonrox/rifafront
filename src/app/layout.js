import { Inter } from "next/font/google";
import "./globals.css";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Rx campanhas",
  description: "gerencie  suas campanhas de forma fácil",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
       
        {children}</body>
    </html>
  );
}
