"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaWhatsapp, FaBars, FaTimes } from "react-icons/fa";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const menuItems = [
    { label: "Início", href: "#" },
    { label: "Simulação", href: "#simulacao" },
    { label: "Sobre Nós", href: "#sobre" },
    { label: "Feedback", href: "#feedback" },
    { label: "Parceiros", href: "#parceiros" },
  ];

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.navContainer}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <img src="/logo.png" alt="ConsigaCred" />
        </Link>

        {/* Menu Desktop */}
        <ul className={styles.menu}>
          {menuItems.map((item, idx) => (
            <li key={idx}>
              <a href={item.href} className={styles.menuLink}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Botão WhatsApp */}
        <a
          href="https://api.whatsapp.com/send?phone=5514998471839&text=Ol%C3%A1,%20gostaria%20de%20saber%20mais%20informa%C3%A7%C3%B5es!"
          className={styles.whatsappBtn}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp /> Fale Conosco
        </a>

        {/* Botão Mobile Menu */}
        <button 
          className={styles.mobileMenuBtn} 
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Menu Mobile */}
      <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ""}`}>
        <ul className={styles.mobileMenuList}>
          {menuItems.map((item, idx) => (
            <li key={idx}>
              <a 
                href={item.href} 
                className={styles.mobileMenuLink}
                onClick={closeMobileMenu}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="https://api.whatsapp.com/send?phone=5514998471839&text=Ol%C3%A1,%20gostaria%20de%20saber%20mais%20informa%C3%A7%C3%B5es!"
              className={styles.mobileWhatsappBtn}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMobileMenu}
            >
              <FaWhatsapp /> Fale Conosco
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}