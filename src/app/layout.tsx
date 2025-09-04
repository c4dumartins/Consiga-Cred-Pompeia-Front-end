import "./globals.css";
import { ReactNode } from "react";


export const metadata = {
  title: "Consiga Cred",
  description: "Projeto integrador Consiga Cred",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
