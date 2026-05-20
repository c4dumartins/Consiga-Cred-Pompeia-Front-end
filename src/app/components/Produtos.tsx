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
    image: "/antecipacaxo.png",
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
    image: "/credixtoconsig.png",
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
    image: "/creditodotrabx.png",
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
    image: "/contadeenergiax.png",
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
    image: "/cartaodecredx.png",
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
    image: "/financiamentoveicx.png",
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
    image: "/garantiadeveicx.png",
    more: {
      intro: [
        "Utilize seu veículo quitado como garantia e consiga valores mais altos com taxas reduzidas.",
      ],
      vantagens: ["Taxas menores", "Valores mais altos liberados", "Continue usando seu veículo normalmente", "Prazos maiores para pagamento"],
      quem: ["Proprietários de veículos quitados", "Veículos em bom estado e com documentação regular"],
    },
  },
];

// ── Máscaras ──────────────────────────────────────────────────
function maskCPF(v: string) {
  return v.replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    .slice(0, 14);
}

function maskMoney(v: string) {
  const digits = v.replace(/\D/g, "");
  if (!digits) return "";
  return (parseInt(digits) / 100).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function maskSaldo(v: string) {
  const digits = v.replace(/\D/g, "");
  if (!digits) return "";
  return (parseInt(digits) / 100).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

// ── Número WhatsApp da ConsigaCred ────────────────────────────
const WPP_NUMBER = "5514998471839";

function buildFgtsLink(saldo: string) {
  const msg = encodeURIComponent(
    `Olá! Tenho interesse na *Antecipação do FGTS*.\n\n` +
    `💰 *Saldo no FGTS:* R$ ${saldo}\n\n` +
    `Gostaria de saber mais informações!`
  );
  return `https://api.whatsapp.com/send?phone=${WPP_NUMBER}&text=${msg}`;
}

function buildDefaultLink(productTitle: string, cpf: string, renda: string) {
  const msg = encodeURIComponent(
    `Olá! Tenho interesse no produto *${productTitle}*.\n\n` +
    `📋 *CPF:* ${cpf}\n` +
    `💵 *Renda Mensal:* R$ ${renda}\n\n` +
    `Gostaria de saber mais informações!`
  );
  return `https://api.whatsapp.com/send?phone=${WPP_NUMBER}&text=${msg}`;
}

// ── Formulário FGTS ───────────────────────────────────────────
function FgtsSimuladorForm() {
  const [saldo, setSaldo] = useState("");
  const [erro, setErro] = useState("");

  const handleSaldo = (v: string) => {
    setSaldo(maskSaldo(v));
    setErro("");
  };

  const handleClick = () => {
    if (!saldo) {
      setErro("Informe o saldo do seu FGTS.");
      return;
    }
    window.open(buildFgtsLink(saldo), "_blank");
  };

  return (
    <div className={styles.simForm}>
      {/* Imagem do celular com app FGTS */}
      <div className={styles.fgtsPhoneWrapper}>
        <div className={styles.fgtsPhoneMockup}>
          <div className={styles.fgtsPhoneScreen}>
            {/* Tenta carregar imagem real, senão usa o mockup ilustrado */}
            <div className={styles.fgtsAppIllustration}>
              <div className={styles.fgtsAppHeader}>
                <div className={styles.fgtsAppLogo}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="3" width="18" height="18" rx="3" fill="#0066B3"/>
                    <path d="M7 12h10M12 7l5 5-5 5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className={styles.fgtsAppName}>FGTS</span>
                </div>
                <div className={styles.fgtsAppSignal}>
                  <span/><span/><span/>
                </div>
              </div>
              <div className={styles.fgtsAppBalance}>
                <p className={styles.fgtsBalanceLabel}>Saldo disponível</p>
                <p className={styles.fgtsBalanceValue}>R$ 4.872,50</p>
                <div className={styles.fgtsBalanceBar}>
                  <div className={styles.fgtsBalanceFill}/>
                </div>
              </div>
              <div className={styles.fgtsAppActions}>
                <div className={styles.fgtsAction}>
                  <div className={styles.fgtsActionIcon} style={{ background: "rgba(0,102,179,0.15)" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2v20M17 7H9.5C8.12 7 7 8.12 7 9.5S8.12 12 9.5 12H14.5C15.88 12 17 13.12 17 14.5S15.88 17 14.5 17H7" stroke="#0066B3" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <span>Saque</span>
                </div>
                <div className={styles.fgtsAction}>
                  <div className={styles.fgtsActionIcon} style={{ background: "rgba(0,179,102,0.15)" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12H19M12 5l7 7-7 7" stroke="#00b366" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>Antecipação</span>
                </div>
                <div className={styles.fgtsAction}>
                  <div className={styles.fgtsActionIcon} style={{ background: "rgba(227,6,19,0.12)" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="9" stroke="#e30613" strokeWidth="2"/>
                      <path d="M12 8v4l3 3" stroke="#e30613" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <span>Extrato</span>
                </div>
              </div>
              <div className={styles.fgtsAppHint}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="#0066B3" strokeWidth="2"/>
                  <path d="M12 8v4M12 16h.01" stroke="#0066B3" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span>Confira seu saldo no app do FGTS</span>
              </div>
            </div>
          </div>
          {/* Notch do celular */}
          <div className={styles.phoneNotch}/>
          {/* Botão home */}
          <div className={styles.phoneHome}/>
        </div>
        {/* Glow atrás do celular */}
        <div className={styles.fgtsPhoneGlow}/>
      </div>

      <div className={styles.simFormFields}>
        <p className={styles.simFormTitle}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M12 2v20M17 7H9.5C8.12 7 7 8.12 7 9.5S8.12 12 9.5 12H14.5C15.88 12 17 13.12 17 14.5S15.88 17 14.5 17H7" stroke="#e30613" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Qual é o seu saldo no FGTS?
        </p>
        <p className={styles.simFormHint}>
          Consulte no <strong>app do FGTS</strong> e informe abaixo para simular
        </p>
        <div className={styles.simFieldGroup}>
          <label className={styles.simLabel}>Saldo do FGTS (R$)</label>
          <input
            className={`${styles.simInput} ${erro ? styles.simInputErr : ""}`}
            type="text"
            inputMode="numeric"
            placeholder="Ex: 5.000,00"
            value={saldo}
            onChange={e => handleSaldo(e.target.value)}
          />
          {erro && <p className={styles.simErro}>{erro}</p>}
        </div>
        <button className={styles.simBtn} onClick={handleClick}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Simule Agora pelo WhatsApp
        </button>
      </div>
    </div>
  );
}

// ── Formulário padrão (CPF + Renda) ──────────────────────────
function DefaultSimuladorForm({ productTitle }: { productTitle: string }) {
  const [cpf, setCpf] = useState("");
  const [renda, setRenda] = useState("");
  const [erros, setErros] = useState<{ cpf?: string; renda?: string }>({});

  const handleCpf = (v: string) => {
    setCpf(maskCPF(v));
    setErros(e => ({ ...e, cpf: "" }));
  };

  const handleRenda = (v: string) => {
    setRenda(maskMoney(v));
    setErros(e => ({ ...e, renda: "" }));
  };

  const handleClick = () => {
    const newErros: { cpf?: string; renda?: string } = {};
    if (cpf.replace(/\D/g, "").length < 11) newErros.cpf = "Informe um CPF válido.";
    if (!renda) newErros.renda = "Informe sua renda mensal.";
    if (Object.keys(newErros).length > 0) {
      setErros(newErros);
      return;
    }
    window.open(buildDefaultLink(productTitle, cpf, renda), "_blank");
  };

  return (
    <div className={styles.simFormDefault}>
      <p className={styles.simFormTitle}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M9 11l3 3L22 4" stroke="#e30613" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="#e30613" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Simule agora — é rápido e gratuito!
      </p>
      <div className={styles.simDefaultGrid}>
        <div className={styles.simFieldGroup}>
          <label className={styles.simLabel}>CPF</label>
          <input
            className={`${styles.simInput} ${erros.cpf ? styles.simInputErr : ""}`}
            type="text"
            inputMode="numeric"
            placeholder="000.000.000-00"
            value={cpf}
            onChange={e => handleCpf(e.target.value)}
            maxLength={14}
          />
          {erros.cpf && <p className={styles.simErro}>{erros.cpf}</p>}
        </div>
        <div className={styles.simFieldGroup}>
          <label className={styles.simLabel}>Renda Mensal (R$)</label>
          <input
            className={`${styles.simInput} ${erros.renda ? styles.simInputErr : ""}`}
            type="text"
            inputMode="numeric"
            placeholder="Ex: 2.500,00"
            value={renda}
            onChange={e => handleRenda(e.target.value)}
          />
          {erros.renda && <p className={styles.simErro}>{erros.renda}</p>}
        </div>
      </div>
      <button className={styles.simBtn} onClick={handleClick}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        Simule Agora pelo WhatsApp
      </button>
    </div>
  );
}

export default function Produtos() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [simOpenId, setSimOpenId] = useState<string | null>(null);

  const toggleOpen = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const toggleSim = (id: string) => {
    setSimOpenId((prev) => (prev === id ? null : id));
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
              const isSimOpen = simOpenId === p.id;
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
                      {/* Botão Saiba mais */}
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

                      {/* ── BOTÃO SIMULE AGORA ── */}
                      <button
                        type="button"
                        onClick={() => toggleSim(p.id)}
                        className={`${styles.btnSimuleAgora} ${isSimOpen ? styles.btnSimuleAgoraActive : ""}`}
                      >
                        {isSimOpen ? (
                          <>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
                            </svg>
                            Fechar
                          </>
                        ) : (
                          <>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                            </svg>
                            Simule Agora
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* ── PAINEL SIMULAÇÃO ── */}
                  <div className={`${styles.simPanel} ${isSimOpen ? styles.simPanelOpen : ""}`}>
                    <div className={styles.simPanelContent}>
                      {p.id === "fgts" ? (
                        <FgtsSimuladorForm />
                      ) : (
                        <DefaultSimuladorForm productTitle={p.title} />
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