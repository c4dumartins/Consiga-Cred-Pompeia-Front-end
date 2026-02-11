'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './BancosParceiros.module.css';

interface Banco {
  id: number;
  nome: string;
  cor: string;
  corSecundaria: string;
  logo: string;
  descricao: string;
}

const BancosParceiros = () => {
  const [hoveredBank, setHoveredBank] = useState<number | string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const bancos: Banco[] = [
    {
      id: 1,
      nome: "Safra",
      cor: "#F37021",
      corSecundaria: "#D35E1A",
      logo: "https://logospng.org/download/banco-safra/logo-banco-safra-256.png",
      descricao: "Banco privado brasileiro focado em atendimento personalizado e soluções financeiras exclusivas para alta renda."
    },
    {
      id: 2,
      nome: "Caixa",
      cor: "#005CA9",
      corSecundaria: "#003D73",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Caixa_Economica_Federal_logo.svg",
      descricao: "Maior banco público do Brasil, líder em crédito imobiliário e programas sociais do governo federal."
    },
    {
      id: 3,
      nome: "Santander",
      cor: "#EC0000",
      corSecundaria: "#C00000",
      logo: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Santander_2019.svg",
      descricao: "Banco internacional com forte presença no Brasil, oferecendo produtos diversificados para pessoas e empresas."
    },
    {
      id: 4,
      nome: "Banco do Brasil",
      cor: "#FFDE00",
      corSecundaria: "#D4B800",
      logo: "https://upload.wikimedia.org/wikipedia/commons/8/86/Banco_do_Brasil_logo.svg",
      descricao: "Instituição financeira mais antiga do país, com ampla capilaridade e soluções completas para todos os públicos."
    },
    {
      id: 5,
      nome: "Bradesco",
      cor: "#CC092F",
      corSecundaria: "#A00726",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Bradesco_logo.svg",
      descricao: "Um dos maiores bancos privados do Brasil, com forte atuação em seguros, capitalização e previdência."
    },
    {
      id: 6,
      nome: "Itaú",
      cor: "#FF6500",
      corSecundaria: "#E65A00",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Itau_logo.svg",
      descricao: "Maior banco privado da América Latina, referência em inovação digital e atendimento multicanal."
    },
    {
      id: 7,
      nome: "Facta",
      cor: "#00A859",
      corSecundaria: "#008847",
      logo: "https://factafinanceira.com.br/wp-content/uploads/2021/03/logo-facta.png",
      descricao: "Financeira especializada em crédito consignado e soluções de empréstimo para servidores públicos e aposentados."
    }
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className={styles.bancosParceirosSection}>
      <div className={styles.container}>
        {/* Título da Seção */}
        <div className={styles.header}>
          <span className={styles.badge}>Parceiros</span>
          <h2 className={styles.titulo}>
            Bancos <span className={styles.highlight}>Parceiros</span>
          </h2>
          <p className={styles.subtitulo}>
            Trabalhamos com as principais instituições financeiras do Brasil para oferecer as melhores condições
          </p>
        </div>

        {/* Container do Carrossel */}
        <div className={styles.carrosselContainer}>
          <button 
            className={`${styles.navBtn} ${styles.navBtnLeft}`}
            onClick={() => scroll('left')}
            aria-label="Anterior"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div className={styles.carrosselScroll} ref={scrollRef}>
            <div className={styles.carrosselTrack}>
              {bancos.map((banco) => (
                <div
                  key={banco.id}
                  className={styles.bancoCard}
                  onMouseEnter={() => setHoveredBank(banco.id)}
                  onMouseLeave={() => setHoveredBank(null)}
                >
                  {/* Card Principal */}
                  <div 
                    className={styles.cardFront}
                    style={{
                      '--banco-cor': banco.cor,
                      '--banco-cor-secundaria': banco.corSecundaria
                    } as React.CSSProperties}
                  >
                    <div className={styles.logoContainer}>
                      <img 
                        src={banco.logo} 
                        alt={`Logo ${banco.nome}`}
                        className={styles.logo}
                        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          if (target.nextElementSibling) {
                            (target.nextElementSibling as HTMLElement).style.display = 'flex';
                          }
                        }}
                      />
                      <div className={styles.logoFallback} style={{ backgroundColor: banco.cor }}>
                        <span>{banco.nome.charAt(0)}</span>
                      </div>
                    </div>
                    <h3 className={styles.nomeBanco}>{banco.nome}</h3>
                  </div>

                  {/* Overlay com Descrição */}
                  <div 
                    className={`${styles.cardBack} ${hoveredBank === banco.id ? styles.active : ''}`}
                    style={{
                      backgroundColor: banco.cor,
                      backgroundImage: `linear-gradient(135deg, ${banco.cor} 0%, ${banco.corSecundaria} 100%)`
                    }}
                  >
                    <p className={styles.descricao}>{banco.descricao}</p>
                  </div>
                </div>
              ))}

              {/* Card +45 Bancos */}
              <div 
                className={styles.bancoCard}
                onMouseEnter={() => setHoveredBank('mais')}
                onMouseLeave={() => setHoveredBank(null)}
              >
                <div className={styles.cardMaisBancos}>
                  <div className={styles.maisNumero}>+45</div>
                  <p className={styles.maisTexto}>Outros Bancos</p>
                </div>

                <div className={`${styles.cardBackMais} ${hoveredBank === 'mais' ? styles.active : ''}`}>
                  <p className={styles.descricao}>
                    Além destes, trabalhamos com mais 45 instituições financeiras parceiras em todo o Brasil.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <button 
            className={`${styles.navBtn} ${styles.navBtnRight}`}
            onClick={() => scroll('right')}
            aria-label="Próximo"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Texto de Rodapé */}
        <div className={styles.footer}>
          <p className={styles.footerTexto}>
            📊 <span className={styles.footerDestaque}>52 instituições financeiras</span> parceiras trabalhando para você encontrar a melhor solução
          </p>
        </div>
      </div>
    </section>
  );
};

export default BancosParceiros;