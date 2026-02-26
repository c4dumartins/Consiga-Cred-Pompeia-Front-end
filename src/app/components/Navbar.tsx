"use client";

import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    setOpen(false);

    if (pathname === "/") {
      // Já está na home — só scrolla
      const el = document.querySelector(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      // Em outra página — vai para a home com hash
      router.push(`/${sectionId}`);
    }
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
          <li><Link href="/">Home</Link></li>
          <li><Link href="/produtos">Produtos</Link></li>
          <li>
            <a href="/#simulacao" onClick={(e) => handleSection(e, "#simulacao")}>
              Simulação
            </a>
          </li>
          <li>
            <a href="/#sobre" onClick={(e) => handleSection(e, "#sobre")}>
              Sobre Nós
            </a>
          </li>
          <li>
            <a href="/#feedback" onClick={(e) => handleSection(e, "#feedback")}>
              Feedbacks
            </a>
          </li>
        </ul>

        {/* Hamburger */}
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
          <Link href="/" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/produtos" onClick={() => setOpen(false)}>Produtos</Link>
          <a href="/#simulacao" onClick={(e) => handleSection(e, "#simulacao")}>Simulação</a>
          <a href="/#sobre" onClick={(e) => handleSection(e, "#sobre")}>Sobre nós</a>
          <a href="/#feedback" onClick={(e) => handleSection(e, "#feedback")}>Feedbacks</a>
        </nav>
      </aside>
    </>
  );
}