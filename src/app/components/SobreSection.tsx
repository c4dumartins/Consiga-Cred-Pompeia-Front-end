"use client";

import Image from "next/image";
import styles from "./SobreSection.module.css";

export default function SobreSection() {
  return (
    <section id="sobre" className={styles.section}>
      <div className={styles.container}>
        {/* Grid Layout */}
        <div className={styles.grid}>
          {/* Conteúdo de Texto */}
          <div className={styles.content}>
            <span className={styles.badge}>Sobre nós</span>
            <h2 className={styles.title}>
              Transformando <span className={styles.highlight}>vidas</span> através do crédito consciente
            </h2>
            <p className={styles.description}>
              A ConsigaCred nasceu com o propósito de democratizar o acesso ao crédito consignado,
              oferecendo soluções financeiras transparentes e personalizadas para milhares de brasileiros.
            </p>
            <p className={styles.description}>
              Com anos de experiência no mercado financeiro, nossa equipe trabalha incansavelmente
              para garantir que você tenha acesso às melhores taxas e condições do mercado,
              sempre com total segurança e transparência.
            </p>

            {/* Stats */}
            <div className={styles.stats}>
              <div className={styles.stat}>
                <div className={styles.statNumber}>+15k</div>
                <div className={styles.statLabel}>Clientes atendidos</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statNumber}>98%</div>
                <div className={styles.statLabel}>Satisfação</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statNumber}>+50M</div>
                <div className={styles.statLabel}>Emprestados</div>
              </div>
            </div>

            {/* CTA */}
            <div className={styles.cta}>
              <a href="#simulacao" className={styles.ctaButton}>
                Simular agora
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="#contato" className={styles.ctaButtonSecondary}>
                Fale conosco
              </a>
            </div>
          </div>

          {/* Área de Imagem */}
          <div className={styles.imageWrapper}>
            <div className={styles.imageContainer}>
              {/* Elementos decorativos */}
              <div className={styles.imageDecor1} />
              <div className={styles.imageDecor2} />
              <div className={styles.imageFrame}>
                {/* Substitua /sobre-nos.jpg pela sua imagem */}
                <Image
                  src="/Ivana-Elaine-Beth.png"
                  alt="Equipe ConsigaCred"
                  fill
                  className={styles.image}
                  priority
                />
                {/* Placeholder caso não tenha imagem ainda */}
                <div className={styles.imagePlaceholder}>
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
                    <path d="M4 16L8.586 11.414C9.367 10.633 10.633 10.633 11.414 11.414L16 16M14 14L15.586 12.414C16.367 11.633 17.633 11.633 18.414 12.414L20 14M14 8H14.01M6 20H18C19.105 20 20 19.105 20 18V6C20 4.895 19.105 4 18 4H6C4.895 4 4 4.895 4 6V18C4 19.105 4.895 20 6 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Adicione sua imagem aqui</span>
                  <span className={styles.placeholderHint}>/public/sobre-nos.jpg</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background Elements */}
        <div className={styles.bgGrid} />
      </div>
    </section>
  );
}