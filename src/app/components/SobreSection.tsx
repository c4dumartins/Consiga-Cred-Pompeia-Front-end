"use client";

import Image from "next/image";
import styles from "./SobreSection.module.css";

const missao = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    badge: "Missão",
    texto: "Solucionamos problemas financeiros, possibilitando a realização de sonhos com ética e transparência.",
    stagger: "0.1s",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    badge: "Propósito",
    texto: "Existimos para transformar vidas trazendo a liberdade financeira e contribuindo para uma sociedade próspera e consciente.",
    stagger: "0.2s",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    badge: "Visão",
    texto: "Ser a principal referência em soluções de crédito da nossa região, reconhecida pela confiança e excelência no atendimento.",
    stagger: "0.3s",
  },
];

const valores = [
  "Seus valores refletem o compromisso com a qualidade e o respeito ao cliente, sendo pautados em honestidade, responsabilidade, proatividade, otimismo, empatia, criatividade, ética, transparência, excelência no atendimento, coragem, gratidão e inovação."
];

export default function SobreSection() {
  return (
    <section id="sobre" className={styles.section}>
      <div className={styles.container}>
        {/* Grid Layout */}
        <div className={styles.grid}>

          {/* ── COLUNA ESQUERDA — Texto + Stats + CTA ── */}
          <div className={styles.content}>
            <span className={styles.badge}>Sobre nós</span>
            <h2 className={styles.title}>
              Transformando <span className={styles.highlight}>vidas</span> através do crédito consciente
            </h2>
            <p className={styles.description}>
            Fundada em agosto de 2013, a ConsigaCred nasceu com o propósito de democratizar o 
            acesso ao crédito consignado, oferecendo soluções financeiras transparentes e personalizadas para milhares de brasileiros.
             Localizada na Avenida Senador Rodolfo Miranda, nº 284 – Centro, Pompéia/SP – CEP: 17580-029, a empresa atua com compromisso, segurança e excelência no atendimento.
            </p>
            <p className={styles.description}>
            Com anos de experiência no mercado financeiro, nossa equipe trabalha incansavelmente para garantir que você tenha acesso às 
            melhores taxas e condições do mercado, sempre com total transparência e confiabilidade.
            </p>

            {/* Stats Cards */}
            <div className={styles.stats}>
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

          {/* ── COLUNA DIREITA — Imagem + MVV + Valores ── */}
          <div className={styles.rightColumn}>

            {/* Foto */}
            <div className={styles.imageWrapper}>
              <div className={styles.imageContainer}>
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

            {/* ── MISSÃO / PROPÓSITO / VISÃO ── */}
            <div className={styles.mvvGrid}>
              {missao.map((item) => (
                <div
                  key={item.badge}
                  className={styles.mvvCard}
                  style={{ '--stagger': item.stagger } as React.CSSProperties}
                >
                  {/* Ícone */}
                  <div className={styles.mvvIcon}>{item.icon}</div>

                  {/* Corpo */}
                  <div className={styles.mvvBody}>
                    <div className={styles.mvvBadge}>
                      <span className={styles.mvvBadgeDot} />
                      <span className={styles.mvvBadgeLabel}>{item.badge}</span>
                    </div>
                  
                    <p className={styles.mvvTexto}>{item.texto}</p>
                  </div>

                  {/* Seta decorativa */}
                  <div className={styles.mvvArrow}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              ))}
            </div>

            {/* ── VALORES ── */}
            <div className={styles.valoresWrapper}>
              <div className={styles.valoresHeader}>
                <div className={styles.valoresHeaderIcon}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className={styles.valoresTitulo}>Valores</span>
                <div className={styles.valoresDivider} />
              </div>

              <div className={styles.valoresTags}>
                {valores.map((v, i) => (
                  <span
                    key={v}
                    className={styles.valorTag}
                    style={{ '--tag-delay': `${i * 0.04}s` } as React.CSSProperties}
                  >
                    <span className={styles.valorDot} />
                    {v}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>

        <div className={styles.bgGrid} />
      </div>
    </section>
  );
}