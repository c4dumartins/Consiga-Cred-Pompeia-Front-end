"use client";

import { ReactNode } from "react";
import Link from "next/link";
import styles from "./SimulacaoSection.module.css";

interface SimulacaoCard {
  title: string;
  description: string;
  icon: ReactNode;
  href: string;
  delay?: number;
}

interface SimulacaoSectionProps {
  cards: SimulacaoCard[];
}

export default function SimulacaoSection({ cards }: SimulacaoSectionProps) {
  return (
    <section id="simulacao" className={styles.section}>
      <div className={styles.container}>
        {/* Header com animação */}
        <div className={styles.header}>
          <span className={styles.badge}>Simule agora</span>
          <h2 className={styles.title}>
            Transforme seus <span className={styles.highlight}>sonhos</span> em realidade
          </h2>
          <p className={styles.subtitle}>
            Escolha a melhor opção para você e comece sua jornada financeira
          </p>
        </div>

        {/* Grid de Cards */}
        <div className={styles.grid}>
          {cards.map((card, idx) => (
            <Link
              key={idx}
              href={card.href}
              className={styles.card}
              style={{ animationDelay: `${(idx + 1) * 0.15}s` }}
            >
              <div className={styles.cardGlow} />
              <div className={styles.cardContent}>
                <div className={styles.iconWrapper}>
                  <div className={styles.iconBg} />
                  {card.icon}
                </div>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardDesc}>{card.description}</p>
                <div className={styles.cardArrow}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Elementos decorativos */}
        <div className={styles.decorCircle1} />
        <div className={styles.decorCircle2} />
      </div>
    </section>
  );
}