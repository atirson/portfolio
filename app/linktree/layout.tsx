// app/casamento/layout.tsx
import type { Metadata } from "next";
import "../globals.css"; // Importa seus estilos globais

export const metadata: Metadata = {
  title: "LinkTree • Atirson Fabiano",
  description: "Central de links de Atirson Fabiano",
};

export default function LinktreeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}