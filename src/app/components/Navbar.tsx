"use client";

import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Verifica se há sessão admin ativa (sessionStorage some ao fechar a aba)
  useEffect(() => {
    const token = sessionStorage.getItem("adminToken");
    setIsAdmin(!!token);
  }, [pathname]); // re-verifica a cada mudança de rota

  const handleLogout = () => {
    sessionStorage.removeItem("adminToken");
    sessionStorage.removeItem("adminData");
    setIsAdmin(false);
    router.push("/");
  };

  const handleSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    setOpen(false);

    if (pathname === "/") {
      const el = document.querySelector(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
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
          <li>
            <a href="/#sobre" onClick={(e) => handleSection(e, "#sobre")}>
              Sobre Nós
            </a>
          </li>
          <li>
            <a href="/#bancosparceiros" onClick={(e) => handleSection(e, "#bancosparceiros")}>
              Parceiros
            </a>
          </li>
          <li><Link href="/produtos">Produtos</Link></li>
          <li>
            <a href="/#simulacao" onClick={(e) => handleSection(e, "#simulacao")}>
              Simulação
            </a>
          </li>
          <li>
            <a href="/#feedback" onClick={(e) => handleSection(e, "#feedback")}>
              Feedbacks
            </a>
          </li>
        </ul>

        {/* Área Admin — Desktop */}
        <div className={styles.adminArea}>
          {isAdmin ? (
            <>
              <Link href="/admin" className={styles.adminBtn}>
                ⚙️ Painel
              </Link>
              <button className={styles.logoutBtn} onClick={handleLogout}>
                Sair
              </button>
            </>
          ) : (
            <Link href="/admin/login" className={styles.adminBtn}>
              🔐 Admin
            </Link>
          )}
        </div>

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
          <a href="/#sobre" onClick={(e) => handleSection(e, "#sobre")}>Sobre nós</a>
          <Link href="/produtos" onClick={() => setOpen(false)}>Produtos</Link>
          <a href="/#simulacao" onClick={(e) => handleSection(e, "#simulacao")}>Simulação</a>
          <a href="/#feedback" onClick={(e) => handleSection(e, "#feedback")}>Feedbacks</a>
          <a href="#bancosparceiros" onClick={(e) => handleSection(e, "#bancosparceiros")}>Parceiros</a>
        </nav>

        {/* Separador Admin no mobile */}
        <div className={styles.sidebarDivider} />
        <div className={styles.sidebarAdminArea}>
          {isAdmin ? (
            <>
              <Link
                href="/admin"
                className={styles.sidebarAdminBtn}
                onClick={() => setOpen(false)}
              >
                ⚙️ Painel Admin
              </Link>
              <button
                className={styles.sidebarLogoutBtn}
                onClick={() => { setOpen(false); handleLogout(); }}
              >
                Sair da conta
              </button>
            </>
          ) : (
            <Link
              href="/admin/login"
              className={styles.sidebarAdminBtn}
              onClick={() => setOpen(false)}
            >
              🔐 Área Admin
            </Link>
          )}
        </div>
      </aside>
    </>
  );
}