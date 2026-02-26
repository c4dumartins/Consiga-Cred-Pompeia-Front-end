"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./Simulacao.module.css";

/* ─────────────────────────────────────────
   TIPOS & CONFIG
───────────────────────────────────────── */
type Modalidade = "inss" | "servidor" | "clt";

const CONFIG: Record<Modalidade, {
  label: string;
  sub: string;
  taxaMensal: number;
  margemPerc: number;
  prazos: number[];
  rendaLabel: string;
}> = {
  inss: {
    label: "Consignado INSS",
    sub: "Aposentados e pensionistas",
    taxaMensal: 0.0184,
    margemPerc: 0.35,
    prazos: [24, 36, 48, 60, 72, 84],
    rendaLabel: "Benefício mensal líquido (R$)",
  },
  servidor: {
    label: "Consignado Servidor",
    sub: "Federal, estadual ou municipal",
    taxaMensal: 0.0179,
    margemPerc: 0.35,
    prazos: [24, 36, 48, 60, 72, 84, 96],
    rendaLabel: "Salário líquido (R$)",
  },
  clt: {
    label: "Crédito do Trabalhador",
    sub: "Trabalhadores com carteira assinada",
    taxaMensal: 0.021,
    margemPerc: 0.30,
    prazos: [12, 24, 36, 48],
    rendaLabel: "Salário líquido (R$)",
  },
};

/* ─────────────────────────────────────────
   HELPERS
───────────────────────────────────────── */
function maskMoney(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (!digits) return "";
  return (parseInt(digits) / 100).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function parseMoney(str: string): number {
  return parseFloat(str.replace(/\./g, "").replace(",", ".")) || 0;
}

function fmt(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// Fórmula Price — valor máximo dado margem, taxa, prazo
function calcValorMax(margem: number, taxa: number, n: number): number {
  return margem * (Math.pow(1 + taxa, n) - 1) / (taxa * Math.pow(1 + taxa, n));
}

// Fórmula Price — parcela dado PV, taxa, prazo
function calcParcela(pv: number, taxa: number, n: number): number {
  return (pv * taxa * Math.pow(1 + taxa, n)) / (Math.pow(1 + taxa, n) - 1);
}

/* ─────────────────────────────────────────
   ÍCONES
───────────────────────────────────────── */
const icons: Record<Modalidade, React.ReactNode> = {
  inss: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path d="M17 21V19C17 16.791 15.209 15 13 15H5C2.791 15 1 16.791 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
      <path d="M23 21V19C23 17.343 21.657 16 20 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M16 3.13C17.766 3.557 19 5.153 19 7C19 8.847 17.766 10.443 16 10.87" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  servidor: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path d="M3 9L12 2L21 9V20C21 21.105 20.105 22 19 22H5C3.895 22 3 21.105 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  clt: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
      <path d="M16 7V5C16 3.895 15.105 3 14 3H10C8.895 3 8 3.895 8 5V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M12 12V16M10 14H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
};

/* ─────────────────────────────────────────
   COMPONENTE
───────────────────────────────────────── */
export default function Simulacao() {
  const [modalidade, setModalidade] = useState<Modalidade | null>(null);
  const [renda, setRenda] = useState("");
  const [prazo, setPrazo] = useState<number | null>(null);
  const [idade, setIdade] = useState("");
  const [erros, setErros] = useState<Record<string, string>>({});
  const [resultado, setResultado] = useState<{ valorMax: number; parcela: number } | null>(null);
  const [calculando, setCalculando] = useState(false);

  const cfg = modalidade ? CONFIG[modalidade] : null;

  const handleModalidade = (m: Modalidade) => {
    setModalidade(m);
    setPrazo(null);
    setResultado(null);
    setErros({});
  };

  const handleRenda = (v: string) => {
    setRenda(maskMoney(v));
    setResultado(null);
    setErros(e => ({ ...e, renda: "" }));
  };

  const validar = () => {
    const e: Record<string, string> = {};
    if (!modalidade) e.modalidade = "Selecione uma modalidade.";
    if (!renda || parseMoney(renda) < 100) e.renda = "Informe um valor válido.";
    if (!prazo) e.prazo = "Selecione um prazo.";
    if (modalidade === "inss") {
      const id = parseInt(idade);
      if (!idade || id < 18 || id > 100) e.idade = "Informe uma idade válida (18–100).";
    }
    setErros(e);
    return Object.keys(e).length === 0;
  };

  const simular = async () => {
    if (!validar() || !modalidade || !prazo) return;
    setCalculando(true);
    await new Promise(r => setTimeout(r, 800));

    const { taxaMensal, margemPerc } = CONFIG[modalidade];
    const rendaNum = parseMoney(renda);
    const margem = rendaNum * margemPerc;

    // INSS: prazo limitado para não passar dos 80 anos
    let prazoEfetivo = prazo;
    if (modalidade === "inss" && idade) {
      const mesesAte80 = Math.max(0, (80 - parseInt(idade)) * 12);
      prazoEfetivo = mesesAte80 > 0 ? Math.min(prazo, mesesAte80) : prazo;
    }

    const valorMax = calcValorMax(margem, taxaMensal, prazoEfetivo);
    const parcela = calcParcela(valorMax, taxaMensal, prazoEfetivo);

    setResultado({ valorMax, parcela });
    setCalculando(false);
  };

  const whatsMsg = resultado && modalidade
    ? encodeURIComponent(
        `Olá! Simulei um crédito no site e gostaria de saber mais.\n\n` +
        `*Modalidade:* ${CONFIG[modalidade].label}\n` +
        `*Valor estimado:* ${fmt(resultado.valorMax)}\n` +
        `*Parcela mensal:* ${fmt(resultado.parcela)}\n` +
        `*Prazo:* ${prazo} meses`
      )
    : "";

  return (
    <div className={styles.page}>
      <div className={styles.bgGlow} aria-hidden />
      <div className={styles.bgGrid} aria-hidden />

      <div className={styles.container}>

        {/* HEADER */}
        <div className={styles.header}>
          <div className={styles.badgeRow}>
            <span className={styles.badgePulse} />
            <span className={styles.badgeText}>Simulador de Crédito</span>
          </div>
          <h1 className={styles.title}>
            Descubra quanto você pode <span className={styles.highlight}>receber</span>
          </h1>
          <p className={styles.subtitle}>
            Simule gratuitamente em segundos e veja o valor estimado do seu crédito
          </p>
        </div>

        <div className={styles.layout}>

          {/* ── FORMULÁRIO ── */}
          <div className={styles.formCard}>

            {/* PASSO 1 — Modalidade */}
            <div className={styles.stepHeader}>
              <span className={styles.stepNum}>1</span>
              <h3 className={styles.stepLabel}>Escolha a modalidade</h3>
            </div>

            <div className={styles.modalidadeGrid}>
              {(Object.keys(CONFIG) as Modalidade[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => handleModalidade(m)}
                  className={`${styles.modBtn} ${modalidade === m ? styles.modBtnActive : ""}`}
                >
                  <span className={styles.modIcon}>{icons[m]}</span>
                  <span className={styles.modTexts}>
                    <span className={styles.modLabel}>{CONFIG[m].label}</span>
                    <span className={styles.modSub}>{CONFIG[m].sub}</span>
                  </span>
                  <span className={styles.modCheck}>
                    {modalidade === m && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </span>
                </button>
              ))}
            </div>
            {erros.modalidade && <p className={styles.erro}>{erros.modalidade}</p>}

            {/* PASSO 2 — Dados */}
            <div className={styles.stepHeader} style={{ marginTop: 32 }}>
              <span className={styles.stepNum}>2</span>
              <h3 className={styles.stepLabel}>Informe seus dados</h3>
            </div>

            <div className={styles.fieldsGrid}>
              {/* Renda */}
              <div className={styles.fieldGroup}>
                <label className={styles.label}>
                  {cfg ? cfg.rendaLabel : "Renda mensal líquida (R$)"} *
                </label>
                <input
                  className={`${styles.input} ${erros.renda ? styles.inputErr : ""}`}
                  type="text"
                  inputMode="numeric"
                  placeholder="Ex: 2.500,00"
                  value={renda}
                  onChange={e => handleRenda(e.target.value)}
                />
                {erros.renda && <p className={styles.erro}>{erros.renda}</p>}
              </div>

              {/* Idade — só INSS */}
              {modalidade === "inss" && (
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Sua idade *</label>
                  <input
                    className={`${styles.input} ${erros.idade ? styles.inputErr : ""}`}
                    type="number"
                    min={18}
                    max={100}
                    placeholder="Ex: 65"
                    value={idade}
                    onChange={e => {
                      setIdade(e.target.value);
                      setResultado(null);
                      setErros(v => ({ ...v, idade: "" }));
                    }}
                  />
                  {erros.idade && <p className={styles.erro}>{erros.idade}</p>}
                </div>
              )}
            </div>

            {/* PASSO 3 — Prazo */}
            <div className={styles.stepHeader} style={{ marginTop: 8 }}>
              <span className={styles.stepNum}>3</span>
              <h3 className={styles.stepLabel}>Escolha o prazo</h3>
            </div>

            {cfg ? (
              <div className={styles.prazoGrid}>
                {cfg.prazos.map(p => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => { setPrazo(p); setResultado(null); setErros(e => ({ ...e, prazo: "" })); }}
                    className={`${styles.prazoBtn} ${prazo === p ? styles.prazoBtnActive : ""}`}
                  >
                    {p}x
                  </button>
                ))}
              </div>
            ) : (
              <p className={styles.prazoHint}>Selecione uma modalidade primeiro</p>
            )}
            {erros.prazo && <p className={styles.erro}>{erros.prazo}</p>}

            {/* Botão simular */}
            <button
              className={styles.btnSimular}
              onClick={simular}
              disabled={calculando}
            >
              {calculando ? (
                <><span className={styles.spinner} /> Calculando...</>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <rect x="4" y="2" width="16" height="20" rx="2" stroke="currentColor" strokeWidth="2"/>
                    <path d="M8 6H10M14 6H16M8 10H10M14 10H16M8 14H16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                  Simular agora
                </>
              )}
            </button>

            <p className={styles.disclaimer}>
              * Simulação estimativa. Valores sujeitos a análise de crédito.
            </p>
          </div>

          {/* ── RESULTADO ── */}
          <div className={`${styles.resultCard} ${resultado ? styles.resultVisible : ""}`}>
            {!resultado ? (
              <div className={styles.placeholder}>
                <div className={styles.placeholderIcon}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                    <rect x="4" y="2" width="16" height="20" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M8 7H16M8 11H16M8 15H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <p>Preencha o formulário ao lado e clique em <strong>Simular agora</strong></p>
              </div>
            ) : (
              <div className={styles.resultContent}>

                <span className={styles.resultTag}>
                  {modalidade && CONFIG[modalidade].label}
                </span>

                {/* Bloco valor máximo */}
                <div className={styles.valorBloco}>
                  <p className={styles.valorLabel}>Você pode receber até</p>
                  <p className={styles.valorNum}>{fmt(resultado.valorMax)}</p>
                  <p className={styles.valorHint}>Valor estimado com base na sua margem</p>
                </div>

                {/* Bloco parcela */}
                <div className={styles.parcelaBloco}>
                  <div className={styles.parcelaLeft}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                      <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <div>
                      <p className={styles.parcelaLabelTxt}>Parcela mensal</p>
                      <p className={styles.parcelaSubTxt}>{prazo} parcelas</p>
                    </div>
                  </div>
                  <p className={styles.parcelaValor}>{fmt(resultado.parcela)}</p>
                </div>

                {/* CTA */}
                <div className={styles.ctas}>
                  <a
                    href={`https://api.whatsapp.com/send?phone=5514998471839&text=${whatsMsg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.btnWpp}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Falar com consultor
                  </a>
                  <Link href="/precadastro" className={styles.btnCadastro}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                      <path d="M19 8v6M22 11h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    Fazer pré-cadastro
                  </Link>
                </div>

                <button
                  className={styles.btnReset}
                  onClick={() => { setResultado(null); setPrazo(null); setRenda(""); setIdade(""); setModalidade(null); }}
                >
                  Nova simulação
                </button>

              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}