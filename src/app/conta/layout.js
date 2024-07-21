import HeaderLogado from "../components/HeaderLogado";

export const metadata = {
  title: "Rx campanhas",
  description: "gerencie  suas campanhas de forma fácil",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>
        <HeaderLogado />
        {children}</body>
    </html>
  );
}
