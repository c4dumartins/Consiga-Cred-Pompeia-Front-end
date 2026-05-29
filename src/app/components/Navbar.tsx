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

  // Verifica se há sessão admin ativa tanto no sessionStorage quanto no localStorage
  useEffect(() => {
    const token = sessionStorage.getItem("adminToken") || localStorage.getItem("token_admin");
    setIsAdmin(!!token);
  }, [pathname]); // re-verifica a cada mudança de rota

  // Função de Logout completa limpando todas as frentes
  const handleLogout = () => {
    // 1. Limpa o Session Storage
    sessionStorage.removeItem("adminToken");
    sessionStorage.removeItem("adminData");

    // 2. Limpa o Local Storage
    localStorage.removeItem("token_admin");

    // 3. Limpa o Cookie por segurança
    document.cookie = "adminToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict";

    setIsAdmin(false);

    // 4. Força a página a dar um "F5" ao voltar pra Home
    window.location.href = "/";
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Link href="/admin" className={styles.adminBtn}>
                <svg 
                  className={styles.adminIcon} 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                Painel Admin
              </Link>
              
              <button onClick={handleLogout} className={styles.logoutBtn}>
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Sair
              </button>
            </div>
          ) : (
            <Link href="/admin" className={styles.adminBtn}>
              <svg 
                className={styles.adminIcon} 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Área Admin
            </Link>
          )}
        </div> {/* 🟢 DIV FECHADA AQUI CORRETAMENTE */}

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
                <svg 
                  width="14" 
                  height="14" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  style={{ marginRight: '6px', verticalAlign: 'middle' }}
                >
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
                Painel Admin
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
              <svg 
                width="14" 
                height="14" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                style={{ marginRight: '6px', verticalAlign: 'middle' }}
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Área Admin
            </Link>
          )}
        </div>
      </aside>
    </>
  );
}