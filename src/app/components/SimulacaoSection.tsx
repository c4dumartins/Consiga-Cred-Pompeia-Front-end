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
  onContratacaoClick?: () => void;
}

export default function SimulacaoSection({ cards, onContratacaoClick }: SimulacaoSectionProps) {
  return (
    <section id="simulacao" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>Simule agora</span>
          <h2 className={styles.title}>
            Transforme seus <span className={styles.highlight}>sonhos</span> em realidade
          </h2>
          <p className={styles.subtitle}>
            Escolha a melhor opção para você e comece sua jornada financeira
          </p>
        </div>

        <div className={styles.grid}>
          {cards.map((card, idx) => {
            const isContratacao = card.href === "#contratacao";
            if (isContratacao) {
              return (
                <div
                  key={idx}
                  className={styles.card}
                  style={{ animationDelay: `${(idx + 1) * 0.15}s`, cursor: "pointer" }}
                  onClick={onContratacaoClick}
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
                </div>
              );
            }
            return (
              <Link
                key={idx}
                href={card.href}
                className={styles.card}
                style={{ animationDelay: `${(idx + 1) * 0.15}s` }}
                target={card.href.startsWith("http") ? "_blank" : undefined}
                rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
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
            );
          })}
        </div>

        <div className={styles.decorCircle1} />
        <div className={styles.decorCircle2} />
      </div>
    </section>
  );
}