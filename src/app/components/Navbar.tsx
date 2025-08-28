"use client";

import { useState } from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className={styles.navbar}>
        {/* Logo (use a imagem se tiver em /public, senão fica o texto) */}
        <div className={styles.logo}>
          {/* <img src="/logo.png" alt="Consiga Cred" /> */}
          <span className={styles.logoMark}>con</span>
          <span className={styles.logoMid}>siga</span>
          <span className={styles.logoEnd}>Cred</span>
        </div>

        {/* Menu desktop */}
        <ul className={styles.menuDesktop}>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/produtos">Produtos</Link></li>
        </ul>

        {/* Botão Entrar (desktop) */}
        <button className={styles.btnLogin}>Entrar</button>

        {/* Botão hamburger (mobile) */}
        <button
          className={styles.hamburger}
          aria-label="Abrir menu"
          onClick={() => setOpen(true)}
        >
          ☰
        </button>
      </header>

      {/* Overlay escuro quando o menu abre */}
      <div
        className={`${styles.overlay} ${open ? styles.overlayVisible : ""}`}
        onClick={() => setOpen(false)}
      />

      {/* Drawer lateral direito (mobile) */}
      <aside className={`${styles.sidebar} ${open ? styles.open : ""}`}>
        <button
          className={styles.closeBtn}
          aria-label="Fechar menu"
          onClick={() => setOpen(false)}
        >
          ←
        </button>

        <nav className={styles.sidebarNav}>
          <Link href="#simulacao" onClick={() => setOpen(false)}>simulação</Link>
          <Link href="#contato" onClick={() => setOpen(false)}>entre em contato</Link>
          <Link href="#sobre" onClick={() => setOpen(false)}>sobre nós</Link>
          <Link href="#feedback" onClick={() => setOpen(false)}>feedback</Link>
          <Link href="#trabalhe" onClick={() => setOpen(false)}>trabalhe conosco</Link>
          <Link href="#bancos" onClick={() => setOpen(false)}>bancos parceiros</Link>
        </nav>
      </aside>
    </>
  );
}
