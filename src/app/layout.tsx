import "./globals.css";
import { ReactNode } from "react";
import WhatsAppFloat from "./components/WhatsAppFloat";

export const metadata = {
  title: "Consiga Cred",
  description: "Projeto integrador Consiga Cred",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        {/* Botão flutuante do WhatsApp — aparece em todas as páginas */}
        <WhatsAppFloat />
      </body>
    </html>
  );
}