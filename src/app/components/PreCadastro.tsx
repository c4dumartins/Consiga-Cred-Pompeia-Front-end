"use client";

import { useState, useRef } from "react";
import styles from "./PreCadastro.module.css";
import {
  FaCalculator,
  FaCheckCircle,
  FaArrowRight,
  FaArrowLeft,
  FaExclamationCircle,
} from "react-icons/fa";

interface FormData {
  nome: string;
  cpf: string;
  dataNascimento: string;
  telefone: string;
  email: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  modalidade: string;
  renda: string;
  contaEnergiaPropria: string;
  comoConheceu: string;
  mensagem: string;
}

const initialForm: FormData = {
  nome: "",
  cpf: "",
  dataNascimento: "",
  telefone: "",
  email: "",
  cep: "",
  logradouro: "",
  numero: "",
  complemento: "",
  bairro: "",
  cidade: "",
  estado: "",
  modalidade: "",
  renda: "",
  contaEnergiaPropria: "",
  comoConheceu: "",
  mensagem: "",
};

const steps = [
  { label: "Dados Pessoais", number: 1 },
  { label: "Endereço", number: 2 },
  { label: "Simulação", number: 3 },
];

const REQUIRED_BY_STEP: Record<number, (keyof FormData)[]> = {
  1: ["nome", "cpf", "dataNascimento", "telefone", "email"],
  2: ["logradouro", "numero", "bairro", "cidade", "estado"],
  3: ["modalidade", "comoConheceu"],
};

const FIELD_LABELS: Partial<Record<keyof FormData, string>> = {
  nome: "Nome Completo",
  cpf: "CPF",
  dataNascimento: "Data de Nascimento",
  telefone: "Telefone / WhatsApp",
  email: "E-mail",
  logradouro: "Logradouro",
  numero: "Número",
  bairro: "Bairro",
  cidade: "Cidade",
  estado: "Estado",
  modalidade: "Modalidade",
  renda: "Renda Líquida",
  contaEnergiaPropria: "Conta de energia em seu nome",
  comoConheceu: "Como nos conheceu",
};

// ── Tipo Modalidade ──────────────────────────────────────────
type Modalidade = {
  id: string;
  label: string;
  sub: string;
  descricao: string; // ← breve resumo exibido no hover/active
  icon: React.ReactNode;
};

const MODALIDADES: Modalidade[] = [
  {
    id: "inss",
    label: "Consignado INSS",
    sub: "Aposentados e pensionistas",
    descricao:
      "Linha de crédito exclusiva para aposentados e pensionistas, com as menores taxas do mercado e parcelas fixas descontadas diretamente do benefício.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M17 21V19C17 16.791 15.209 15 13 15H5C2.791 15 1 16.791 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
        <path d="M23 21V19C23 17.343 21.657 16 20 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M16 3.13C17.766 3.557 19 5.153 19 7C19 8.847 17.766 10.443 16 10.87" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "servidor",
    label: "Consignado Servidor Público",
    sub: "Federal, estadual ou municipal",
    descricao:
      "Empréstimo com desconto direto em folha para servidores públicos, com taxas diferenciadas e prazos mais longos de pagamento.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M3 9L12 2L21 9V20C21 21.105 20.105 22 19 22H5C3.895 22 3 21.105 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "clt",
    label: "Crédito do Trabalhador",
    sub: "Trabalhadores com carteira assinada",
    descricao:
      "Empréstimo exclusivo para trabalhadores com carteira assinada, com desconto direto na folha de pagamento e processo simplificado.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M16 7V5C16 3.895 15.105 3 14 3H10C8.895 3 8 3.895 8 5V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M12 12V16M10 14H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "fgts",
    label: "Antecipação do FGTS",
    sub: "Sem consulta ao SPC/Serasa",
    descricao:
      "Antecipe seu FGTS sem comprometimento mensal e sem consulta ao SPC e Serasa. O desconto é feito diretamente no saldo do FGTS.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 8v8M9 11l3-3 3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "energia",
    label: "Empréstimo — Conta de Energia",
    sub: "Desconto na fatura de energia elétrica",
    descricao:
      "Crédito pessoal vinculado à sua conta de energia. Receba até R$ 4.000,00 e parcele em até 24 meses, com o desconto na própria fatura mensal.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "cartao",
    label: "Empréstimo no Cartão",
    sub: "Converta seu limite em dinheiro",
    descricao:
      "Transforme o limite disponível do seu cartão de crédito em dinheiro na hora, sem burocracia, para usar como quiser.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <rect x="1" y="4" width="22" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M1 10H23" stroke="currentColor" strokeWidth="2"/>
        <path d="M5 15H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "veiculos",
    label: "Financiamento de Veículos",
    sub: "Financiamento de até 100% da tabela",
    descricao:
      "Financiamos até 100% do valor da tabela para carros novos ou usados, com prazos flexíveis e condições personalizadas para o seu perfil.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M5 17H3a2 2 0 01-2-2V9l3-6h14l3 6v6a2 2 0 01-2 2h-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="7.5" cy="17.5" r="2.5" stroke="currentColor" strokeWidth="2"/>
        <circle cx="16.5" cy="17.5" r="2.5" stroke="currentColor" strokeWidth="2"/>
        <path d="M10 17H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "garantia",
    label: "Crédito com Garantia de Veículo",
    sub: "Use seu veículo quitado como garantia",
    descricao:
      "Use seu veículo quitado como garantia e acesse valores mais altos com taxas reduzidas. Você continua usando o carro normalmente.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

// ── Máscaras ──────────────────────────────────────────────────
function maskCPF(v: string) {
  return v
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    .slice(0, 14);
}
function maskPhone(v: string) {
  return v
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .slice(0, 15);
}
function maskCEP(v: string) {
  return v
    .replace(/\D/g, "")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .slice(0, 9);
}
function maskMoney(v: string) {
  const digits = v.replace(/\D/g, "");
  if (!digits) return "";
  return (parseInt(digits) / 100).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

async function buscarCEP(cep: string): Promise<Partial<FormData> | null> {
  const clean = cep.replace(/\D/g, "");
  if (clean.length !== 8) return null;
  try {
    const res = await fetch(`https://viacep.com.br/ws/${clean}/json/`);
    const data = await res.json();
    if (data.erro) return null;
    return {
      logradouro: data.logradouro || "",
      bairro: data.bairro || "",
      cidade: data.localidade || "",
      estado: data.uf || "",
    };
  } catch {
    return null;
  }
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// ── Componente principal ──────────────────────────────────────
export default function PreCadastro() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(initialForm);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [cepLoading, setCepLoading] = useState(false);
  // Controla qual modalidade está com tooltip expandido (hover ou foco)
  const [hoveredMod, setHoveredMod] = useState<string | null>(null);

  const fieldRefs = useRef<Partial<Record<keyof FormData, HTMLElement | null>>>({});

  function validateStep(targetStep: number): Partial<Record<keyof FormData, string>> {
    const errors: Partial<Record<keyof FormData, string>> = {};

    if (targetStep === 3) {
      const baseFields: (keyof FormData)[] = ["modalidade", "comoConheceu"];
      for (const field of baseFields) {
        if (!form[field] || form[field].toString().trim() === "") {
          errors[field] = `${FIELD_LABELS[field] ?? field} é obrigatório`;
        }
      }
      if (form.modalidade === "energia") {
        if (!form.contaEnergiaPropria) {
          errors.contaEnergiaPropria = `${FIELD_LABELS.contaEnergiaPropria} é obrigatório`;
        }
      } else if (form.modalidade !== "") {
        if (!form.renda || form.renda.toString().trim() === "") {
          errors.renda = `${FIELD_LABELS.renda} é obrigatório`;
        }
      }
      return errors;
    }

    for (const field of REQUIRED_BY_STEP[targetStep]) {
      if (!form[field] || form[field].toString().trim() === "") {
        errors[field] = `${FIELD_LABELS[field] ?? field} é obrigatório`;
      }
    }
    return errors;
  }

  function focusFirstError(errors: Partial<Record<keyof FormData, string>>) {
    const firstKey = Object.keys(errors)[0] as keyof FormData | undefined;
    if (!firstKey) return;
    setTimeout(() => {
      const el = fieldRefs.current[firstKey];
      if (el) {
        el.focus();
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 80);
  }

  const handleNext = () => {
    const errors = validateStep(step);
    if (Object.keys(errors).length > 0) {
      setFieldErrors((prev) => ({ ...prev, ...errors }));
      focusFirstError(errors);
      return;
    }
    setFieldErrors({});
    setStep((s) => s + 1);
  };

  const handleBack = () => {
    setStep((s) => s - 1);
  };

  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const key = name as keyof FormData;
    let masked = value;

    if (name === "cpf") masked = maskCPF(value);
    if (name === "telefone") masked = maskPhone(value);
    if (name === "renda") masked = maskMoney(value);
    if (name === "cep") {
      masked = maskCEP(value);
      if (masked.replace(/\D/g, "").length === 8) {
        setCepLoading(true);
        const endereco = await buscarCEP(masked);
        setCepLoading(false);
        if (endereco) {
          setForm((prev) => ({ ...prev, cep: masked, ...endereco }));
          setFieldErrors((prev) => {
            const next = { ...prev };
            (Object.keys(endereco) as (keyof FormData)[]).forEach((k) => delete next[k]);
            return next;
          });
          return;
        }
      }
    }

    setForm((prev) => ({ ...prev, [key]: masked }));
    if (fieldErrors[key]) {
      setFieldErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  const handleModalidadeSelect = (id: string) => {
    setForm((prev) => ({
      ...prev,
      modalidade: id,
      renda: id === "energia" ? "" : prev.renda,
      contaEnergiaPropria: id !== "energia" ? "" : prev.contaEnergiaPropria,
    }));
    if (fieldErrors.modalidade) {
      setFieldErrors((prev) => ({ ...prev, modalidade: undefined }));
    }
    setFieldErrors((prev) => ({ ...prev, renda: undefined, contaEnergiaPropria: undefined }));
  };

  const handleContaEnergiaSelect = (value: string) => {
    setForm((prev) => ({ ...prev, contaEnergiaPropria: value }));
    if (fieldErrors.contaEnergiaPropria) {
      setFieldErrors((prev) => ({ ...prev, contaEnergiaPropria: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    let allErrors: Partial<Record<keyof FormData, string>> = {};
    let firstStepWithError = 0;

    for (let s = 1; s <= 3; s++) {
      const errs = validateStep(s);
      if (Object.keys(errs).length > 0) {
        allErrors = { ...allErrors, ...errs };
        if (firstStepWithError === 0) firstStepWithError = s;
      }
    }

    if (Object.keys(allErrors).length > 0) {
      setFieldErrors(allErrors);
      setStep(firstStepWithError);
      focusFirstError(
        Object.fromEntries(
          Object.entries(allErrors).filter(([k]) =>
            REQUIRED_BY_STEP[firstStepWithError].includes(k as keyof FormData)
          )
        ) as Partial<Record<keyof FormData, string>>
      );
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/precadastro`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro ao enviar cadastro.");
      setSubmitted(true);
    } catch (err: unknown) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Erro inesperado. Por favor, tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  function inputProps(name: keyof FormData) {
    return {
      name,
      ref: (el: HTMLInputElement | null) => {
        fieldRefs.current[name] = el;
      },
      className: `${styles.input} ${fieldErrors[name] ? styles.inputError : ""}`,
    };
  }

  function selectProps(name: keyof FormData) {
    return {
      name,
      ref: (el: HTMLSelectElement | null) => {
        fieldRefs.current[name] = el;
      },
      className: `${styles.input} ${fieldErrors[name] ? styles.inputError : ""}`,
    };
  }

  if (submitted) {
    return (
      <div className={styles.page}>
        <div className={styles.successContainer}>
          <div className={styles.successIcon}>
            <FaCheckCircle />
          </div>
          <h2 className={styles.successTitle}>Solicitação Enviada!</h2>
          <p className={styles.successText}>
            Em breve você receberá um retorno com a simulação em seu{" "}
            <strong>telefone cadastrado!</strong>
          </p>
          <a
            href="https://api.whatsapp.com/send?phone=5514998471839&text=Ol%C3%A1!%20Acabei%20de%20preencher%20o%20formul%C3%A1rio%20de%20simula%C3%A7%C3%A3o%20e%20gostaria%20de%20saber%20mais."
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnPrimary}
            style={{ textDecoration: "none", marginBottom: "12px", display: "inline-flex" }}
          >
            💬 Falar no WhatsApp <FaArrowRight />
          </a>
          <br />
          <button
            className={styles.btnSecondary}
            style={{ marginTop: "12px" }}
            onClick={() => {
              setSubmitted(false);
              setStep(1);
              setForm(initialForm);
              setFieldErrors({});
            }}
          >
            Nova Simulação
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.bgGlow} />
      <div className={styles.bgGrid} />

      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.iconWrapper}>
            <FaCalculator />
          </div>
          <h1 className={styles.title}>Simulação de Crédito</h1>
          <p className={styles.subtitle}>
            Preencha o formulário abaixo e nossa equipe entrará em contato com
            a simulação completa no seu telefone.
          </p>
        </div>

        {/* Step Indicator */}
        <div className={styles.stepIndicator}>
          {steps.map((s, i) => (
            <div key={s.number} className={styles.stepWrapper}>
              <div
                className={`${styles.stepDot} ${
                  step === s.number
                    ? styles.stepActive
                    : step > s.number
                    ? styles.stepDone
                    : ""
                }`}
              >
                {step > s.number ? <FaCheckCircle /> : s.number}
              </div>
              <span
                className={`${styles.stepLabel} ${
                  step === s.number ? styles.stepLabelActive : ""
                }`}
              >
                {s.label}
              </span>
              {i < steps.length - 1 && (
                <div
                  className={`${styles.stepLine} ${
                    step > s.number ? styles.stepLineDone : ""
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div className={styles.card}>
          <form onSubmit={handleSubmit} noValidate>

            {/* ── STEP 1 — Dados Pessoais ── */}
            {step === 1 && (
              <div className={styles.formStep}>
                <h3 className={styles.stepTitle}>Dados Pessoais</h3>
                <div className={styles.grid2}>

                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>Nome Completo *</label>
                    <input
                      {...inputProps("nome")}
                      type="text"
                      value={form.nome}
                      onChange={handleChange}
                      placeholder="Seu nome completo"
                    />
                    {fieldErrors.nome && (
                      <span className={styles.fieldError}>{fieldErrors.nome}</span>
                    )}
                  </div>

                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>CPF *</label>
                    <input
                      {...inputProps("cpf")}
                      type="text"
                      value={form.cpf}
                      onChange={handleChange}
                      placeholder="000.000.000-00"
                    />
                    {fieldErrors.cpf && (
                      <span className={styles.fieldError}>{fieldErrors.cpf}</span>
                    )}
                  </div>

                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>Data de Nascimento *</label>
                    <input
                      {...inputProps("dataNascimento")}
                      type="date"
                      value={form.dataNascimento}
                      onChange={handleChange}
                    />
                    {fieldErrors.dataNascimento && (
                      <span className={styles.fieldError}>{fieldErrors.dataNascimento}</span>
                    )}
                  </div>

                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>Telefone / WhatsApp *</label>
                    <input
                      {...inputProps("telefone")}
                      type="text"
                      value={form.telefone}
                      onChange={handleChange}
                      placeholder="(00) 00000-0000"
                    />
                    {fieldErrors.telefone && (
                      <span className={styles.fieldError}>{fieldErrors.telefone}</span>
                    )}
                  </div>

                  <div className={`${styles.fieldGroup} ${styles.colSpan2}`}>
                    <label className={styles.label}>E-mail *</label>
                    <input
                      {...inputProps("email")}
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="seu@email.com"
                    />
                    {fieldErrors.email && (
                      <span className={styles.fieldError}>{fieldErrors.email}</span>
                    )}
                  </div>

                </div>
              </div>
            )}

            {/* ── STEP 2 — Endereço ── */}
            {step === 2 && (
              <div className={styles.formStep}>
                <h3 className={styles.stepTitle}>Endereço</h3>
                <div className={styles.grid2}>

                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>
                      CEP{" "}
                      {cepLoading && (
                        <span style={{ color: "#e30613", fontSize: "11px" }}>
                          buscando…
                        </span>
                      )}
                    </label>
                    <input
                      name="cep"
                      ref={(el) => { fieldRefs.current.cep = el; }}
                      className={styles.input}
                      type="text"
                      value={form.cep}
                      onChange={handleChange}
                      placeholder="00000-000"
                    />
                  </div>

                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>Estado *</label>
                    <select
                      {...selectProps("estado")}
                      value={form.estado}
                      onChange={handleChange}
                    >
                      <option value="">Selecione</option>
                      {[
                        "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA",
                        "MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN",
                        "RS","RO","RR","SC","SP","SE","TO",
                      ].map((uf) => (
                        <option key={uf} value={uf}>{uf}</option>
                      ))}
                    </select>
                    {fieldErrors.estado && (
                      <span className={styles.fieldError}>{fieldErrors.estado}</span>
                    )}
                  </div>

                  <div className={`${styles.fieldGroup} ${styles.colSpan2}`}>
                    <label className={styles.label}>Logradouro *</label>
                    <input
                      {...inputProps("logradouro")}
                      type="text"
                      value={form.logradouro}
                      onChange={handleChange}
                      placeholder="Rua, Avenida…"
                    />
                    {fieldErrors.logradouro && (
                      <span className={styles.fieldError}>{fieldErrors.logradouro}</span>
                    )}
                  </div>

                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>Número *</label>
                    <input
                      {...inputProps("numero")}
                      type="text"
                      value={form.numero}
                      onChange={handleChange}
                      placeholder="Nº"
                    />
                    {fieldErrors.numero && (
                      <span className={styles.fieldError}>{fieldErrors.numero}</span>
                    )}
                  </div>

                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>Complemento</label>
                    <input
                      name="complemento"
                      ref={(el) => { fieldRefs.current.complemento = el; }}
                      className={styles.input}
                      type="text"
                      value={form.complemento}
                      onChange={handleChange}
                      placeholder="Apto, Bloco…"
                    />
                  </div>

                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>Bairro *</label>
                    <input
                      {...inputProps("bairro")}
                      type="text"
                      value={form.bairro}
                      onChange={handleChange}
                      placeholder="Bairro"
                    />
                    {fieldErrors.bairro && (
                      <span className={styles.fieldError}>{fieldErrors.bairro}</span>
                    )}
                  </div>

                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>Cidade *</label>
                    <input
                      {...inputProps("cidade")}
                      type="text"
                      value={form.cidade}
                      onChange={handleChange}
                      placeholder="Cidade"
                    />
                    {fieldErrors.cidade && (
                      <span className={styles.fieldError}>{fieldErrors.cidade}</span>
                    )}
                  </div>

                </div>
              </div>
            )}

            {/* ── STEP 3 — Simulação ── */}
            {step === 3 && (
              <div className={styles.formStep}>
                <h3 className={styles.stepTitle}>Simulação</h3>

                {/* Modalidade */}
                <div className={styles.fieldGroup} style={{ marginBottom: "24px" }}>
                  <label
                    className={styles.label}
                    style={{ marginBottom: "12px", display: "block" }}
                    ref={(el) => { fieldRefs.current.modalidade = el; }}
                  >
                    Escolha a Modalidade *
                  </label>

                  <div className={styles.modalidadeGrid}>
                    {MODALIDADES.map((mod) => {
                      const isActive = form.modalidade === mod.id;
                      // Descrição visível quando hovering OU quando o item está ativo/selecionado
                      const showDesc = hoveredMod === mod.id || isActive;

                      return (
                        <button
                          key={mod.id}
                          type="button"
                          onClick={() => handleModalidadeSelect(mod.id)}
                          onMouseEnter={() => setHoveredMod(mod.id)}
                          onMouseLeave={() => setHoveredMod(null)}
                          onFocus={() => setHoveredMod(mod.id)}
                          onBlur={() => setHoveredMod(null)}
                          className={`${styles.modBtn} ${isActive ? styles.modBtnActive : ""}`}
                        >
                          <span className={styles.modIcon}>{mod.icon}</span>

                          <span className={styles.modTexts}>
                            <span className={styles.modLabel}>{mod.label}</span>
                            <span className={styles.modSub}>{mod.sub}</span>
                            {/* Descrição — expande suavemente no hover/active */}
                            <span
                              className={`${styles.modDesc} ${
                                showDesc ? styles.modDescVisible : ""
                              }`}
                            >
                              {mod.descricao}
                            </span>
                          </span>

                          <span className={styles.modCheck}>
                            {isActive && (
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path
                                  d="M20 6L9 17L4 12"
                                  stroke="currentColor"
                                  strokeWidth="2.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {fieldErrors.modalidade && (
                    <span className={styles.fieldError} style={{ marginTop: "8px", display: "block" }}>
                      {fieldErrors.modalidade}
                    </span>
                  )}
                </div>

                <div className={styles.grid2}>

                  {form.modalidade === "energia" ? (
                    <div className={`${styles.fieldGroup} ${styles.colSpan2}`}>
                      <label
                        className={styles.label}
                        ref={(el) => { fieldRefs.current.contaEnergiaPropria = el; }}
                      >
                        Possui conta de energia em seu nome? *
                      </label>
                      <div style={{ display: "flex", gap: "12px", marginTop: "4px" }}>
                        {(["sim", "nao"] as const).map((opt) => {
                          const isActive = form.contaEnergiaPropria === opt;
                          return (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => handleContaEnergiaSelect(opt)}
                              className={`${styles.modBtn} ${isActive ? styles.modBtnActive : ""}`}
                              style={{ flex: 1, justifyContent: "center", padding: "13px 16px" }}
                            >
                              <span className={styles.modTexts} style={{ alignItems: "center" }}>
                                <span className={styles.modLabel} style={{ fontSize: "0.95rem" }}>
                                  {opt === "sim" ? "Sim" : "Não"}
                                </span>
                              </span>
                              {isActive && (
                                <span className={styles.modCheck}>
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                      {fieldErrors.contaEnergiaPropria && (
                        <span className={styles.fieldError}>{fieldErrors.contaEnergiaPropria}</span>
                      )}
                    </div>
                  ) : (
                    <div className={`${styles.fieldGroup} ${styles.colSpan2}`}>
                      <label className={styles.label}>Informe a Renda Líquida *</label>
                      <input
                        {...inputProps("renda")}
                        type="text"
                        value={form.renda}
                        onChange={handleChange}
                        placeholder="Ex: 2.500,00"
                        inputMode="numeric"
                      />
                      {fieldErrors.renda && (
                        <span className={styles.fieldError}>{fieldErrors.renda}</span>
                      )}
                    </div>
                  )}

                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>Como nos conheceu? *</label>
                    <select
                      {...selectProps("comoConheceu")}
                      value={form.comoConheceu}
                      onChange={handleChange}
                    >
                      <option value="">Selecione</option>
                      <option value="google">Google</option>
                      <option value="instagram">Instagram</option>
                      <option value="facebook">Facebook</option>
                      <option value="indicacao">Indicação</option>
                      <option value="whatsapp">WhatsApp</option>
                      <option value="outro">Outro</option>
                    </select>
                    {fieldErrors.comoConheceu && (
                      <span className={styles.fieldError}>{fieldErrors.comoConheceu}</span>
                    )}
                  </div>

                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>Observações</label>
                    <textarea
                      name="mensagem"
                      ref={(el) => { fieldRefs.current.mensagem = el; }}
                      className={`${styles.input} ${styles.textarea}`}
                      value={form.mensagem}
                      onChange={handleChange}
                      placeholder="Informações adicionais…"
                      rows={3}
                    />
                  </div>

                </div>

                {submitError && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      background: "rgba(227,6,19,0.1)",
                      border: "1px solid rgba(227,6,19,0.3)",
                      borderRadius: "12px",
                      padding: "14px 18px",
                      marginTop: "16px",
                    }}
                  >
                    <FaExclamationCircle color="#e30613" />
                    <span style={{ color: "#ff6b6b", fontSize: "14px" }}>
                      {submitError}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Botões de Navegação */}
            <div className={styles.navButtons}>
              {step > 1 && (
                <button
                  type="button"
                  className={styles.btnSecondary}
                  onClick={handleBack}
                >
                  <FaArrowLeft /> Voltar
                </button>
              )}
              <div style={{ flex: 1 }} />
              {step < 3 ? (
                <button
                  type="button"
                  className={styles.btnPrimary}
                  onClick={handleNext}
                >
                  Próximo <FaArrowRight />
                </button>
              ) : (
                <button
                  type="submit"
                  className={styles.btnPrimary}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className={styles.spinner} /> Enviando…
                    </>
                  ) : (
                    <>
                      Solicitar Simulação <FaArrowRight />
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}