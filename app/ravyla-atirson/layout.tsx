// app/casamento/layout.tsx
import type { Metadata } from "next";
import "../globals.css"; // Importa seus estilos globais

export const metadata: Metadata = {
  title: "Casamento • Ravyla Rachel & Atirson Fabiano",
  description: "Site oficial do casamento de Ravyla e Atirson",
};

export default function WeddingLayout({
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