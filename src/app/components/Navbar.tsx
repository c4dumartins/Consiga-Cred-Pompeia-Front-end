"use client";

import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detecta scroll para adicionar classe .scrolled
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll suave para seções internas
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setOpen(false); // fecha sidebar ao clicar
  };

  return (
    <>
      <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
        {/* Logo */}
        <div className={styles.logo}>
          <Link href="/">
            <Image
              src="/MenuLogo.webp"
              alt="Consiga Cred"
              fill
              priority
              className={styles.logoImg}
            />
          </Link>
        </div>

        {/* Menu Desktop */}
        <ul className={styles.menuDesktop}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/produtos">Produtos</Link>
          </li>
          <li>
            <a href="#feedback" onClick={(e) => scrollToSection(e, "#feedback")}>
              Feedbacks
            </a>
          </li>
        </ul>

        {/* Botão Entrar */}
        <button className={styles.btnLogin}>Entrar</button>

        {/* Hamburger Mobile */}
        <button
          className={styles.hamburger}
          aria-label="Abrir menu"
          onClick={() => setOpen(true)}
        >
          ☰
        </button>
      </header>

      {/* Overlay */}
      <div
        className={`${styles.overlay} ${open ? styles.overlayVisible : ""}`}
        onClick={() => setOpen(false)}
      />

      {/* Sidebar Mobile */}
      <aside className={`${styles.sidebar} ${open ? styles.open : ""}`}>
        <button
          className={styles.closeBtn}
          aria-label="Fechar menu"
          onClick={() => setOpen(false)}
        >
          ←
        </button>

        <nav className={styles.sidebarNav}>
          <Link href="#simulacao" onClick={(e) => scrollToSection(e, "#simulacao")}>
            Simulação
          </Link>
          <Link href="#contato" onClick={(e) => scrollToSection(e, "#contato")}>
            Entre em contato
          </Link>
          <Link href="#sobre" onClick={(e) => scrollToSection(e, "#sobre")}>
            Sobre nós
          </Link>
          <Link href="#feedback" onClick={(e) => scrollToSection(e, "#feedback")}>
            Feedback
          </Link>
          <Link href="#trabalhe" onClick={(e) => scrollToSection(e, "#trabalhe")}>
            Trabalhe conosco
          </Link>
          <Link href="#bancos" onClick={(e) => scrollToSection(e, "#bancos")}>
            Bancos parceiros
          </Link>
        </nav>
      </aside>
    </>
  );
}
