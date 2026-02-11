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
            <a href="#simulacao" onClick={(e) => scrollToSection(e, "#simulacao")}>
              Simulação
            </a>
          </li>
          <li>
            <a href="#sobre" onClick={(e) => scrollToSection(e, "#sobre")}>
              Sobre Nós
            </a>
          </li>
          <li>
            <a href="#feedback" onClick={(e) => scrollToSection(e, "#feedback")}>
              Feedbacks
            </a>
          </li>
        </ul>

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
        <div className={styles.sidebarHeader}>
          <h3 className={styles.sidebarTitle}>Menu</h3>
          <button
            className={styles.closeBtn}
            aria-label="Fechar menu"
            onClick={() => setOpen(false)}
          >
            ×
          </button>
        </div>

        <nav className={styles.sidebarNav}>
          <Link href="/" onClick={() => setOpen(false)}>
            Home
          </Link>
          <Link href="/produtos" onClick={() => setOpen(false)}>
            Produtos
          </Link>
          <Link href="#simulacao" onClick={(e) => scrollToSection(e, "#simulacao")}>
            Simulação
          </Link>
          <Link href="#sobre" onClick={(e) => scrollToSection(e, "#sobre")}>
            Sobre nós
          </Link>
          <Link href="#feedback" onClick={(e) => scrollToSection(e, "#feedback")}>
            Feedbacks
          </Link>
        </nav>
      </aside>
    </>
  );
}