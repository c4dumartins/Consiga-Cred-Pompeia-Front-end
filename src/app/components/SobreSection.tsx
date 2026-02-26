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

            {/* Stats Cards com Ícones */}
            <div className={styles.stats}>
              {/* Card 1 - Clientes */}
              <div className={styles.statCard}>
                <div className={styles.statParticle} />
                <div className={styles.statParticle} />
                <div className={styles.statParticle} />
                <div className={styles.statIcon}>
                  <div className={styles.statIconBg} />
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className={styles.statNumber}>+15k</div>
                <div className={styles.statLabel}>Clientes atendidos</div>
              </div>

              {/* Card 2 - Satisfação */}
              <div className={styles.statCard}>
                <div className={styles.statParticle} />
                <div className={styles.statParticle} />
                <div className={styles.statParticle} />
                <div className={styles.statIcon}>
                  <div className={styles.statIconBg} />
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className={styles.statNumber}>98%</div>
                <div className={styles.statLabel}>Satisfação</div>
              </div>

              {/* Card 3 - Emprestados */}
              <div className={styles.statCard}>
                <div className={styles.statParticle} />
                <div className={styles.statParticle} />
                <div className={styles.statParticle} />
                <div className={styles.statIcon}>
                  <div className={styles.statIconBg} />
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2V22M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
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
              <a href="https://api.whatsapp.com/send?phone=5514998471839&text=Ol%C3%A1,%20gostaria%20de%20saber%20mais%20informa%C3%A7%C3%B5es!" className={styles.ctaButtonSecondary}>
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
                  <span className={styles.placeholderHint}>/public/Ivana-Elaine-Beth.png</span>
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