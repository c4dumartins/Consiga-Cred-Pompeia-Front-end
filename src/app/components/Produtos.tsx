"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Produtos.module.css";

interface Product {
  id: string;
  title: string;
  desc: string;
  image?: string;
  cta?: { label: string; href: string } | null;
  more?: {
    intro?: string[];
    vantagens?: string[];
    quem?: string[];
  };
}

const products: Product[] = [
  {
    id: "fgts",
    title: "Antecipação do FGTS",
    desc: "Antecipe seu FGTS sem comprometimento mensal, sem consulta ao SPC e Serasa, com atendimento ágil e 100% online.",
    image: "/antecipacao.jpg",
    more: {
      intro: [
        "Receba agora o valor do seu saque-aniversário do FGTS, sem parcelas mensais.",
        "O pagamento é feito automaticamente com o saldo do próprio FGTS.",
      ],
      vantagens: [
        "Sem consulta ao SPC e Serasa",
        "Sem comprometer sua renda mensal",
        "Liberação rápida",
        "Processo 100% online",
      ],
      quem: ["Trabalhadores com saldo no FGTS", "Quem aderiu ou deseja aderir ao saque-aniversário"],
    },
  },
  {
    id: "consignado",
    title: "Crédito Consignado",
    desc: "Linha de crédito exclusiva para aposentados e pensionistas, com as menores taxas do mercado e parcelas fixas descontadas diretamente do benefício.",
    image: "/consignado.png",
    more: {
      intro: [
        "O Crédito Consignado é uma modalidade com taxas reduzidas, pois as parcelas são descontadas diretamente do benefício do INSS.",
      ],
      vantagens: ["Taxas mais baixas que o crédito pessoal", "Parcelas fixas", "Prazos estendidos", "Maior facilidade de aprovação"],
      quem: ["Aposentados e pensionistas do INSS", "Beneficiários que possuam margem consignável disponível"],
    },
  },
  {
    id: "trabalhador",
    title: "Crédito do Trabalhador",
    desc: "Empréstimo exclusivo para trabalhadores com carteira assinada, com desconto direto na folha de pagamento.",
    image: "/trabalhador.png",
    more: {
      intro: [
        "Modalidade de empréstimo destinada a trabalhadores com carteira assinada. As parcelas são descontadas diretamente na folha de pagamento, o que reduz taxas e facilita a aprovação.",
      ],
      vantagens: ["Taxas reduzidas", "Desconto direto em folha", "Parcelas fixas", "Processo simplificado"],
      quem: ["Trabalhadores CLT", "Funcionários de empresas conveniadas"],
    },
  },
  {
    id: "energia",
    title: "Empréstimo com Débito na Conta de Energia",
    desc: "Crédito pessoal vinculado à sua conta de energia. Receba até R$ 4.000,00 e parcele em até 24 meses.",
    image: "/energia.png",
    more: {
      intro: [
        "Crédito pessoal vinculado à conta de energia elétrica. As parcelas são cobradas junto à fatura mensal, facilitando o pagamento.",
      ],
      vantagens: ["Não compromete o limite do cartão", "Pagamento junto à conta de luz", "Processo rápido", "Liberação facilitada"],
      quem: ["Titulares da conta de energia", "Clientes com conta ativa e regular"],
    },
  },
  {
    id: "cartao",
    title: "Empréstimo no Cartão de Crédito",
    desc: "Transforme o limite do seu cartão em dinheiro, em poucos minutos, para usar como quiser.",
    image: "/cartao.png",
    more: {
      intro: [
        "Converta o limite disponível do seu cartão em dinheiro, com depósito direto na conta.",
      ],
      vantagens: ["Liberação rápida", "Não exige garantia", "Pode ser usado para qualquer finalidade", "Processo simples e online"],
      quem: ["Quem possui limite disponível no cartão", "Quem precisa de dinheiro imediato"],
    },
  },
  {
    id: "veiculos",
    title: "Financiamento de Veículos",
    desc: "Vai comprar o seu tão sonhado carro? Essa é a opção ideal para você. Financiamos até 100% do valor da tabela.",
    image: "/veiculo.png",
    more: {
      intro: [
        "O financiamento de veículos permite que você adquira carro novo ou usado pagando em parcelas que cabem no seu orçamento.",
      ],
      vantagens: ["Financiamento de até 100% da tabela", "Prazos flexíveis", "Condições personalizadas", "Aprovação rápida"],
      quem: ["Compra de veículos novos ou usados", "Troca ou aquisição do primeiro veículo"],
    },
  },
  {
    id: "garantia",
    title: "Crédito com Garantia de Veículo",
    desc: "Seu veículo está quitado? Use-o como garantia, resgate dinheiro e aproveite como quiser.",
    image: "/garantia.png",
    more: {
      intro: [
        "Utilize seu veículo quitado como garantia e consiga valores mais altos com taxas reduzidas.",
      ],
      vantagens: ["Taxas menores", "Valores mais altos liberados", "Continue usando seu veículo normalmente", "Prazos maiores para pagamento"],
      quem: ["Proprietários de veículos quitados", "Veículos em bom estado e com documentação regular"],
    },
  },
];

export default function Produtos() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleOpen = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className={styles.page}>
      {/* ── Hero / Header ── */}
      <section className={styles.hero}>
        <div className={styles.bgGlow1} aria-hidden />
        <div className={styles.bgGlow2} aria-hidden />
        <div className={styles.bgGrid} aria-hidden />

        <div className={styles.heroContainer}>
          <div className={styles.badgeRow}>
            <span className={styles.badgePulse} />
            <span className={styles.badgeText}>Soluções Financeiras</span>
          </div>

          <h1 className={styles.heroTitle}>
            Nossos <span className={styles.highlight}>Produtos</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Escolha a solução financeira ideal para o seu momento e realize seus objetivos com as melhores condições do mercado.
          </p>
        </div>
      </section>

      {/* ── Grid de Produtos ── */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {products.map((p, idx) => {
              const isOpen = openId === p.id;
              return (
                <article
                  key={p.id}
                  className={styles.card}
                  style={{ '--delay': `${idx * 0.07}s` } as React.CSSProperties}
                >
                  <div className={styles.cardTopBar} />
                  <div className={styles.cardGlow} />

                  {/* Imagem */}
                  {p.image && (
                    <div className={styles.media}>
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        style={{ objectFit: "cover", objectPosition: "center top" }}
                      />
                    </div>
                  )}

                  {/* Conteúdo */}
                  <div className={styles.content}>
                    <h3 className={styles.cardTitle}>{p.title}</h3>
                    <p className={styles.cardDesc}>{p.desc}</p>

                    <div className={styles.actions}>
                      {p.cta ? (
                        <Link href={p.cta.href} className={styles.btnPrimary}>
                          {p.cta.label}
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </Link>
                      ) : (
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          onClick={() => toggleOpen(p.id)}
                          className={styles.btnSecondary}
                        >
                          {isOpen ? (
                            <>
                              Fechar
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
                              </svg>
                            </>
                          ) : (
                            <>
                              Saiba mais
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                <path d="M19 9L12 16L5 9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Detalhes expansíveis */}
                  <div className={`${styles.details} ${isOpen ? styles.detailsOpen : ""}`}>
                    <div className={styles.detailsContent}>
                      {p.more?.intro?.map((t, i) => (
                        <p key={i}>{t}</p>
                      ))}
                      {p.more?.vantagens && (
                        <>
                          <h4>Vantagens</h4>
                          <ul>
                            {p.more.vantagens.map((v, i) => (
                              <li key={i}>{v}</li>
                            ))}
                          </ul>
                        </>
                      )}
                      {p.more?.quem && (
                        <>
                          <h4>Quem pode contratar</h4>
                          <ul>
                            {p.more.quem.map((q, i) => (
                              <li key={i}>{q}</li>
                            ))}
                          </ul>
                        </>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* ── CTA Final ── */}
          <div className={styles.ctaSection}>
            <div className={styles.ctaText}>
              <h3>Não encontrou o que procura?</h3>
              <p>
                Nossa equipe está pronta para encontrar a melhor solução financeira para o seu perfil. Fale conosco agora!
              </p>
            </div>
            <div className={styles.ctaButtons}>
              <a
                href="https://api.whatsapp.com/send?phone=5514998471839&text=Ol%C3%A1,%20gostaria%20de%20saber%20mais%20informa%C3%A7%C3%B5es!"
                className={styles.btnPrimary}
                target="_blank"
                rel="noopener noreferrer"
              >
                Falar no WhatsApp
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <Link href="/precadastro" className={styles.btnSecondary}>
                Fazer Pré-Cadastro
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}