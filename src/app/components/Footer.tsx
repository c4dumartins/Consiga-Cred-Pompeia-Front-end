import { FaWhatsapp, FaFacebookF, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerWrapper}>
        {/* Logo Section */}
        <div className={styles.footerLogoSection}>
          <div className={styles.logoWrapper}>
            <img 
              src="/FooterLogo.webp" 
              alt="ConsigaCred - Empréstimos Consignados" 
            />
          </div>
          <p className={styles.footerTagline}>
            Soluções financeiras que transformam vidas
          </p>
        </div>

        {/* Contact Section */}
        <div className={styles.footerSection}>
          <h4 className={styles.footerTitle}>Fale com a gente</h4>
          <div className={styles.footerLinks}>
            <a href="tel:+5514998471839" className={styles.footerLink}>
              <FaPhone className={styles.linkIcon} />
              <span>(14) 99847-1839</span>
            </a>
            <a href="mailto:consigapompeia@hotmail.com" className={styles.footerLink}>
              <FaEnvelope className={styles.linkIcon} />
              <span>consigapompeia@hotmail.com</span>
            </a>
            <a 
              href="https://api.whatsapp.com/send?phone=5514998471839&text=Ol%C3%A1,%20gostaria%20de%20saber%20mais%20informa%C3%A7%C3%B5es!"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.footerLink}
            >
              <FaWhatsapp className={styles.linkIcon} />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Location Section */}
        <div className={styles.footerSection}>
          <h4 className={styles.footerTitle}>Localização</h4>
          <div className={styles.footerLinks}>
            <p className={styles.footerText}>
              <FaMapMarkerAlt className={styles.linkIcon} />
              <span>Rua Senador Rodolfo Miranda - 284</span>
            </p>
            <p className={styles.footerText}>
              <span>Centro - Pompeia/SP</span>
            </p>
            <a 
              href="https://maps.app.goo.gl/J8P8znB27nohmm5FA"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.footerLink} ${styles.mapLink}`}
            >
              <FaMapMarkerAlt className={styles.linkIcon} />
              <span>Ver no mapa</span>
            </a>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className={styles.footerSection}>
          <h4 className={styles.footerTitle}>Links Rápidos</h4>
          <div className={styles.footerLinks}>
            <a href="#simulacao" className={styles.footerLink}>
              <span>Simulação</span>
            </a>
            <a href="#sobre" className={styles.footerLink}>
              <span>Sobre Nós</span>
            </a>
            <a href="#feedback" className={styles.footerLink}>
              <span>Feedback</span>
            </a>
            <a href="#parceiros" className={styles.footerLink}>
              <span>Parceiros</span>
            </a>
          </div>
        </div>
      </div>

      {/* Social Media & Quote Section */}
      <div className={styles.footerSocialWrapper}>
        <div className={styles.socialContent}>
          <h4 className={styles.footerTitle}>Redes Sociais</h4>
          <div className={styles.socialGrid}>
            <a 
              href="https://api.whatsapp.com/send?phone=5514998471839&text=Ol%C3%A1,%20gostaria%20de%20saber%20mais%20informa%C3%A7%C3%B5es!"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.socialBtn} ${styles.whatsapp}`}
              aria-label="WhatsApp"
            >
              <FaWhatsapp />
            </a>
            <a
              href="https://www.facebook.com/consiga.credpompeia"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.socialBtn} ${styles.facebook}`}
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.instagram.com/consigacredpompeia/"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.socialBtn} ${styles.instagram}`}
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://maps.app.goo.gl/J8P8znB27nohmm5FA"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.socialBtn} ${styles.maps}`}
              aria-label="Google Maps"
            >
              <FaMapMarkerAlt />
            </a>
          </div>
        </div>

        <blockquote className={styles.footerQuote}>
          <span className={styles.quoteIcon}>"</span>
          Transformando sonhos em conquistas financeiras com dedicação e confiança
          <span className={styles.quoteIcon}>"</span>
        </blockquote>
      </div>

      {/* Footer Bottom */}
      <div className={styles.footerBottom}>
        <p>© 2025 ConsigaCred Pompeia. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}