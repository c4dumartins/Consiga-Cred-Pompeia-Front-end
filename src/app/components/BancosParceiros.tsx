'use client';

import { useState, useRef } from 'react';
import styles from './BancosParceiros.module.css';

interface Banco {
  id: number;
  nome: string;
  cor: string;
  corSecundaria: string;
  logo: string;
  descricao: string;
}

const bancos: Banco[] = [
  {
    id: 1,
    nome: 'Safra',
    cor: '#F37021',
    corSecundaria: '#D35E1A',
    logo: 'https://img.logo.dev/safra.com.br?token=pk_X-1ZO13GSgeOoUrIuJ6BeQ',
    descricao: 'Banco privado brasileiro focado em atendimento personalizado e soluções financeiras exclusivas para alta renda.',
  },
  {
    id: 2,
    nome: 'Caixa',
    cor: '#005CA9',
    corSecundaria: '#003D73',
    logo: 'https://img.logo.dev/caixa.gov.br?token=pk_X-1ZO13GSgeOoUrIuJ6BeQ',
    descricao: 'Maior banco público do Brasil, líder em crédito imobiliário e programas sociais do governo federal.',
  },
  {
    id: 3,
    nome: 'Santander',
    cor: '#EC0000',
    corSecundaria: '#C00000',
    logo: 'https://img.logo.dev/santander.com.br?token=pk_X-1ZO13GSgeOoUrIuJ6BeQ',
    descricao: 'Banco internacional com forte presença no Brasil, oferecendo produtos diversificados para pessoas e empresas.',
  },
  {
    id: 4,
    nome: 'Banco do Brasil',
    cor: '#F9D000',
    corSecundaria: '#D4B800',
    logo: 'https://img.logo.dev/bb.com.br?token=pk_X-1ZO13GSgeOoUrIuJ6BeQ',
    descricao: 'Instituição financeira mais antiga do país, com ampla capilaridade e soluções completas para todos os públicos.',
  },
  {
    id: 5,
    nome: 'Bradesco',
    cor: '#CC092F',
    corSecundaria: '#A00726',
    logo: 'https://img.logo.dev/bradesco.com.br?token=pk_X-1ZO13GSgeOoUrIuJ6BeQ',
    descricao: 'Um dos maiores bancos privados do Brasil, com forte atuação em seguros, capitalização e previdência.',
  },
  {
    id: 6,
    nome: 'Itaú',
    cor: '#FF6500',
    corSecundaria: '#E65A00',
    logo: 'https://img.logo.dev/itau.com.br?token=pk_X-1ZO13GSgeOoUrIuJ6BeQ',
    descricao: 'Maior banco privado da América Latina, referência em inovação digital e atendimento multicanal.',
  },
  {
    id: 7,
    nome: 'Facta',
    cor: '#00A859',
    corSecundaria: '#008847',
    logo: 'https://img.logo.dev/factafinanceira.com.br?token=pk_X-1ZO13GSgeOoUrIuJ6BeQ',
    descricao: 'Financeira especializada em crédito consignado e soluções de empréstimo para servidores públicos e aposentados.',
  },
];

export default function BancosParceiros() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [failedLogos, setFailedLogos] = useState<Set<number>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -320 : 320, behavior: 'smooth' });
  };

  const handleLogoError = (id: number) => {
    setFailedLogos((prev) => new Set([...prev, id]));
  };

  return (
    <section className={styles.section}>
      <div className={styles.bgGlow1} aria-hidden />
      <div className={styles.bgGlow2} aria-hidden />
      <div className={styles.bgGrid} aria-hidden />

      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.badgeRow}>
            <span className={styles.badgePulse} />
            <span className={styles.badgeText}>Parceiros</span>
          </div>
          <h2 className={styles.titulo}>
            Bancos <span className={styles.highlight}>Parceiros</span>
          </h2>
          <p className={styles.subtitulo}>
            Trabalhamos com as principais instituições financeiras do Brasil
            para oferecer as <strong>melhores condições</strong>
          </p>
        </div>

        {/* Carrossel */}
        <div className={styles.carrosselOuter}>
          <div className={styles.fadeLeft} aria-hidden />
          <div className={styles.fadeRight} aria-hidden />

          <div className={styles.carrosselScroll} ref={scrollRef}>
            <div className={styles.carrosselTrack}>
              {bancos.map((banco, idx) => {
                const isHovered = hoveredId === banco.id;
                const logoFailed = failedLogos.has(banco.id);

                return (
                  <div
                    key={banco.id}
                    className={styles.card}
                    style={{
                      '--cor': banco.cor,
                      '--cor-sec': banco.corSecundaria,
                      '--delay': `${idx * 0.08}s`,
                    } as React.CSSProperties}
                    onMouseEnter={() => setHoveredId(banco.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <div className={styles.cardGlowBg} style={{ opacity: isHovered ? 1 : 0 }} />
                    <div className={`${styles.topBar} ${isHovered ? styles.topBarActive : ''}`} />

                    {/* FRENTE */}
                    <div className={`${styles.cardFront} ${isHovered ? styles.hideFront : ''}`}>
                      <div className={styles.logoRing}>
                        {!logoFailed ? (
                          <img
                            src={banco.logo}
                            alt={`Logo ${banco.nome}`}
                            className={styles.logo}
                            onError={() => handleLogoError(banco.id)}
                          />
                        ) : (
                          <div
                            className={styles.logoFallback}
                            style={{ background: `linear-gradient(135deg, ${banco.cor}, ${banco.corSecundaria})` }}
                          >
                            {banco.nome.slice(0, 2).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <p className={styles.nomeBanco}>{banco.nome}</p>
                      <div className={styles.hoverHint}>
                        <span>Passe o mouse</span>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                          <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>

                    {/* VERSO */}
                    <div className={`${styles.cardBack} ${isHovered ? styles.showBack : ''}`}>
                      <div className={styles.backBankIcon}>
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <h3 className={styles.backNome} style={{ color: banco.cor }}>{banco.nome}</h3>
                      <p className={styles.backDesc}>{banco.descricao}</p>
                      <div className={styles.backLine} style={{ background: `linear-gradient(90deg, transparent, ${banco.cor}, transparent)` }} />
                    </div>
                  </div>
                );
              })}

              {/* Card +45 bancos */}
              <div
                className={`${styles.card} ${styles.cardMais}`}
                onMouseEnter={() => setHoveredId(-1)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className={`${styles.cardFront} ${hoveredId === -1 ? styles.hideFront : ''}`}>
                  <div className={styles.maisCircle}>
                    <span className={styles.maisNum}>+45</span>
                  </div>
                  <p className={styles.nomeBanco}>Outros Bancos</p>
                  <div className={styles.hoverHint}>
                    <span>Passe o mouse</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <div className={`${styles.cardBack} ${styles.cardBackMais} ${hoveredId === -1 ? styles.showBack : ''}`}>
                  <div className={styles.backBankIcon} style={{ color: '#10b981' }}>
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8"/>
                      <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <h3 className={styles.backNome} style={{ color: '#10b981' }}>+45 Parceiros</h3>
                  <p className={styles.backDesc}>
                    Além destes, trabalhamos com mais 45 instituições financeiras parceiras em todo o Brasil.
                  </p>
                  <div className={styles.backLine} style={{ background: 'linear-gradient(90deg, transparent, #10b981, transparent)' }} />
                </div>
              </div>
            </div>
          </div>

          <button className={`${styles.navBtn} ${styles.navLeft}`} onClick={() => scroll('left')} aria-label="Anterior">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className={`${styles.navBtn} ${styles.navRight}`} onClick={() => scroll('right')} aria-label="Próximo">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <div className={styles.footerDivider} />
          <p className={styles.footerTexto}>
            🏦 <strong>52 instituições financeiras</strong> parceiras trabalhando para você
          </p>
          <div className={styles.footerDivider} />
        </div>
      </div>
    </section>
  );
}