"use client";

import Image from "next/image";
import { useState } from "react";
import { FaWhatsapp, FaFacebookF, FaInstagram } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import styles from "./Footer.module.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para enviar o email
    console.log("Newsletter email:", email);
    setEmail("");
    alert("Obrigado por se inscrever!");
  };

  return (
    <footer className={styles.footer}>
      {/* Background Pattern */}
      <div className={styles.bgPattern} />

      {/* Floating Particles */}
      <div className={styles.particle} />
      <div className={styles.particle} />
      <div className={styles.particle} />

      <div className={styles.container}>
        {/* Main Grid */}
        <div className={styles.mainGrid}>
          {/* Brand Section */}
          <div className={styles.brand}>
            <div className={styles.logoWrapper}>
              <Image
                src="/FooterLogo.webp"
                alt="ConsigaCred"
                width={200}
                height={80}
                className={styles.logo}
              />
            </div>
            <p className={styles.tagline}>
              Transformando vidas através de soluções financeiras inteligentes e
              acessíveis. Seu parceiro de confiança em crédito consignado.
            </p>
            <div className={styles.socials}>
              <a
                href="https://api.whatsapp.com/send?phone=5514998471839&text=Ol%C3%A1,%20gostaria%20de%20saber%20mais%20informa%C3%A7%C3%B5es!"
                className={styles.socialLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <FaWhatsapp size={20} />
              </a>
              <a
                href="https://www.facebook.com/consiga.credpompeia"
                className={styles.socialLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FaFacebookF size={20} />
              </a>
              <a
                href="https://www.instagram.com/consigacredpompeia/"
                className={styles.socialLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://maps.app.goo.gl/J8P8znB27nohmm5FA"
                className={styles.socialLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Localização"
              >
                <GoLocation size={20} />
              </a>
            </div>
          </div>

          {/* Contato */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Contato</h3>
            <ul className={styles.linksList}>
              <li className={styles.linkItem}>
                <a href="tel:+5514998471839" className={styles.link}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M3 5C3 3.895 3.895 3 5 3H8.276C8.715 3 9.1 3.284 9.224 3.703L10.23 7.181C10.345 7.571 10.203 7.993 9.874 8.238L7.929 9.68C9.111 12.126 11.126 14.126 13.571 15.307L15.013 13.362C15.258 13.033 15.68 12.891 16.07 13.006L19.548 14.012C19.967 14.136 20.251 14.521 20.251 14.96V18.235C20.251 19.34 19.356 20.235 18.251 20.235C10.406 20.235 3.766 13.595 3.766 5.75C3.766 5.336 4.086 5 4.5 5H5C3.895 5 3 4.105 3 3V5Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  (14) 99847-1839
                </a>
              </li>
              <li className={styles.linkItem}>
                <a href="mailto:consigapompeia@hotmail.com" className={styles.link}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M3 8L10.89 13.26C11.566 13.672 12.434 13.672 13.11 13.26L21 8M5 19H19C20.105 19 21 18.105 21 17V7C21 5.895 20.105 5 19 5H5C3.895 5 3 5.895 3 7V17C3 18.105 3.895 19 5 19Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  consigapompeia@hotmail.com
                </a>
              </li>
              <li className={styles.linkItem}>
                <a
                  href="https://api.whatsapp.com/send?phone=5514998471839&text=Ol%C3%A1,%20gostaria%20de%20saber%20mais%20informa%C3%A7%C3%B5es!"
                  className={styles.link}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M8 10H8.01M12 10H12.01M16 10H16.01M9 16H5C3.895 16 3 15.105 3 14V6C3 4.895 3.895 4 5 4H19C20.105 4 21 4.895 21 6V14C21 15.105 20.105 16 19 16H14L9 21V16Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Chat WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {/* Localização */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Localização</h3>
            <ul className={styles.linksList}>
              <li className={styles.linkItem}>
                <span className={styles.infoText}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 21C10.694 21 6 15.518 6 10.5C6 7.462 8.462 5 11.5 5C14.538 5 17 7.462 17 10.5C17 15.518 13.306 21 12 21ZM12 8C10.343 8 9 9.343 9 11C9 12.657 10.343 14 12 14C13.657 14 15 12.657 15 11C15 9.343 13.657 8 12 8Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Rua Senador Rodolfo Miranda, 284
                </span>
              </li>
              <li className={styles.linkItem}>
                <span className={styles.infoText}>Centro - Pompeia, SP</span>
              </li>
              <li className={styles.linkItem}>
                <a
                  href="https://maps.app.goo.gl/J8P8znB27nohmm5FA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M9 11C9 12.657 10.343 14 12 14C13.657 14 15 12.657 15 11C15 9.343 13.657 8 12 8C10.343 8 9 9.343 9 11Z"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M17.657 16.657L13.414 20.9C12.633 21.68 11.367 21.68 10.586 20.9L6.343 16.657C3.219 13.533 3.219 8.467 6.343 5.343C9.467 2.219 14.533 2.219 17.657 5.343C20.781 8.467 20.781 13.533 17.657 16.657Z"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                  Abrir mapa
                </a>
              </li>
            </ul>
          </div>

          {/* Links Rápidos */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Links Rápidos</h3>
            <ul className={styles.linksList}>
              <li className={styles.linkItem}>
                <a href="#simulacao" className={styles.link}>
                  Simulação
                </a>
              </li>
              <li className={styles.linkItem}>
                <a href="#sobre" className={styles.link}>
                  Sobre Nós
                </a>
              </li>
              <li className={styles.linkItem}>
                <a href="#feedback" className={styles.link}>
                  Feedbacks
                </a>
              </li>
              <li className={styles.linkItem}>
                <a
                  href="https://auto-contratacao.nossafintech.com.br/home/RVFrUXY1cXozaHM1V1R0ZEF4M1FPbS9pNExYU3Bocm5LWHBCZmVORndMbVgxYW8vbHhTN0VLbW1ycTR3eFFGWmk2eXN0TUlxTXlqTjM1VTBPR21Zb1E9PQ=="
                  className={styles.link}
                >
                  Autocontratação
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {currentYear} ConsigaCred Pompeia. Feito com{" "}
            <span className={styles.heartbeat}>❤️</span> para você
          </p>
        </div>
      </div>
    </footer>
  );
}