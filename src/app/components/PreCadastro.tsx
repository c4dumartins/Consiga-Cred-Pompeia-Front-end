"use client";

import { useState } from "react";
import styles from "./PreCadastro.module.css";
import { FaCalculator, FaCheckCircle, FaArrowRight, FaArrowLeft, FaExclamationCircle } from "react-icons/fa";

interface FormData {
  nome: string; cpf: string; dataNascimento: string; telefone: string; email: string;
  cep: string; logradouro: string; numero: string; complemento: string;
  bairro: string; cidade: string; estado: string;
  modalidade: string; renda: string;
  comoConheceu: string; mensagem: string;
}

const initialForm: FormData = {
  nome: "", cpf: "", dataNascimento: "", telefone: "", email: "",
  cep: "", logradouro: "", numero: "", complemento: "", bairro: "", cidade: "", estado: "",
  modalidade: "", renda: "",
  comoConheceu: "", mensagem: "",
};

const steps = [
  { label: "Dados Pessoais", number: 1 },
  { label: "Endereço", number: 2 },
  { label: "Simulação", number: 3 },
];

// ── Modalidades (mesmas do simulador + novas) ─────────────────
type Modalidade = {
  id: string;
  label: string;
  sub: string;
  icon: React.ReactNode;
};

const MODALIDADES: Modalidade[] = [
  {
    id: "inss",
    label: "Consignado INSS",
    sub: "Aposentados e pensionistas",
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
  return v.replace(/\D/g,"").replace(/(\d{3})(\d)/,"$1.$2")
    .replace(/(\d{3})(\d)/,"$1.$2").replace(/(\d{3})(\d{1,2})$/,"$1-$2").slice(0,14);
}
function maskPhone(v: string) {
  return v.replace(/\D/g,"").replace(/(\d{2})(\d)/,"($1) $2")
    .replace(/(\d{5})(\d)/,"$1-$2").slice(0,15);
}
function maskCEP(v: string) {
  return v.replace(/\D/g,"").replace(/(\d{5})(\d)/,"$1-$2").slice(0,9);
}
function maskMoney(v: string) {
  const digits = v.replace(/\D/g, "");
  if (!digits) return "";
  return (parseInt(digits) / 100).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

// ── Busca endereço pelo CEP (ViaCEP) ─────────────────────────
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
  } catch { return null; }
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export default function PreCadastro() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cepLoading, setCepLoading] = useState(false);

  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    let masked = value;
    if (name === "cpf")      masked = maskCPF(value);
    if (name === "telefone") masked = maskPhone(value);
    if (name === "renda")    masked = maskMoney(value);
    if (name === "cep") {
      masked = maskCEP(value);
      if (masked.replace(/\D/g, "").length === 8) {
        setCepLoading(true);
        const endereco = await buscarCEP(masked);
        setCepLoading(false);
        if (endereco) {
          setForm((prev) => ({ ...prev, cep: masked, ...endereco }));
          return;
        }
      }
    }
    setForm((prev) => ({ ...prev, [name]: masked }));
  };

  const handleModalidadeSelect = (id: string) => {
    setForm((prev) => ({ ...prev, modalidade: id }));
  };

  const handleNext = () => { if (step < 3) setStep((s) => s + 1); };
  const handleBack = () => { if (step > 1) setStep((s) => s - 1); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

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
      const message = err instanceof Error
        ? err.message
        : "Erro inesperado. Por favor, tente novamente.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // ── Tela de Sucesso ──────────────────────────────────────────
  if (submitted) {
    return (
      <div className={styles.page}>
        <div className={styles.successContainer}>
          <div className={styles.successIcon}><FaCheckCircle /></div>
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
          <br/>
          <button
            className={styles.btnSecondary}
            style={{ marginTop: "12px" }}
            onClick={() => { setSubmitted(false); setStep(1); setForm(initialForm); }}
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
          <div className={styles.iconWrapper}><FaCalculator /></div>
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
                  step === s.number ? styles.stepActive : step > s.number ? styles.stepDone : ""
                }`}
              >
                {step > s.number ? <FaCheckCircle /> : s.number}
              </div>
              <span className={`${styles.stepLabel} ${step === s.number ? styles.stepLabelActive : ""}`}>
                {s.label}
              </span>
              {i < steps.length - 1 && (
                <div className={`${styles.stepLine} ${step > s.number ? styles.stepLineDone : ""}`} />
              )}
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div className={styles.card}>
          <form onSubmit={handleSubmit}>

            {/* STEP 1 — Dados Pessoais */}
            {step === 1 && (
              <div className={styles.formStep}>
                <h3 className={styles.stepTitle}>Dados Pessoais</h3>
                <div className={styles.grid2}>
                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>Nome Completo *</label>
                    <input className={styles.input} type="text" name="nome" value={form.nome}
                      onChange={handleChange} placeholder="Seu nome completo" required />
                  </div>
                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>CPF *</label>
                    <input className={styles.input} type="text" name="cpf" value={form.cpf}
                      onChange={handleChange} placeholder="000.000.000-00" required />
                  </div>
                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>Data de Nascimento *</label>
                    <input className={styles.input} type="date" name="dataNascimento"
                      value={form.dataNascimento} onChange={handleChange} required />
                  </div>
                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>Telefone / WhatsApp *</label>
                    <input className={styles.input} type="text" name="telefone" value={form.telefone}
                      onChange={handleChange} placeholder="(00) 00000-0000" required />
                  </div>
                  <div className={`${styles.fieldGroup} ${styles.colSpan2}`}>
                    <label className={styles.label}>E-mail *</label>
                    <input className={styles.input} type="email" name="email" value={form.email}
                      onChange={handleChange} placeholder="seu@email.com" required />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2 — Endereço */}
            {step === 2 && (
              <div className={styles.formStep}>
                <h3 className={styles.stepTitle}>Endereço</h3>
                <div className={styles.grid2}>
                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>
                      CEP {cepLoading && <span style={{ color: "#e30613", fontSize: "11px" }}>buscando...</span>}
                    </label>
                    <input className={styles.input} type="text" name="cep" value={form.cep}
                      onChange={handleChange} placeholder="00000-000" />
                  </div>
                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>Estado *</label>
                    <select className={styles.input} name="estado" value={form.estado}
                      onChange={handleChange} required>
                      <option value="">Selecione</option>
                      {["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA",
                        "PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"].map((uf) => (
                        <option key={uf} value={uf}>{uf}</option>
                      ))}
                    </select>
                  </div>
                  <div className={`${styles.fieldGroup} ${styles.colSpan2}`}>
                    <label className={styles.label}>Logradouro *</label>
                    <input className={styles.input} type="text" name="logradouro" value={form.logradouro}
                      onChange={handleChange} placeholder="Rua, Avenida..." required />
                  </div>
                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>Número *</label>
                    <input className={styles.input} type="text" name="numero" value={form.numero}
                      onChange={handleChange} placeholder="Nº" required />
                  </div>
                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>Complemento</label>
                    <input className={styles.input} type="text" name="complemento" value={form.complemento}
                      onChange={handleChange} placeholder="Apto, Bloco..." />
                  </div>
                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>Bairro *</label>
                    <input className={styles.input} type="text" name="bairro" value={form.bairro}
                      onChange={handleChange} placeholder="Bairro" required />
                  </div>
                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>Cidade *</label>
                    <input className={styles.input} type="text" name="cidade" value={form.cidade}
                      onChange={handleChange} placeholder="Cidade" required />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3 — Simulação */}
            {step === 3 && (
              <div className={styles.formStep}>
                <h3 className={styles.stepTitle}>Simulação</h3>

                {/* Escolha a Modalidade */}
                <div className={styles.fieldGroup} style={{ marginBottom: "24px" }}>
                  <label className={styles.label} style={{ marginBottom: "12px", display: "block" }}>
                    Escolha a Modalidade *
                  </label>
                  <div className={styles.modalidadeGrid}>
                    {MODALIDADES.map((mod) => {
                      const isActive = form.modalidade === mod.id;
                      return (
                        <button
                          key={mod.id}
                          type="button"
                          onClick={() => handleModalidadeSelect(mod.id)}
                          className={`${styles.modBtn} ${isActive ? styles.modBtnActive : ""}`}
                        >
                          <span className={styles.modIcon}>{mod.icon}</span>
                          <span className={styles.modTexts}>
                            <span className={styles.modLabel}>{mod.label}</span>
                            <span className={styles.modSub}>{mod.sub}</span>
                          </span>
                          <span className={styles.modCheck}>
                            {isActive && (
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  {/* Campo hidden para validação HTML5 */}
                  <input
                    type="text"
                    name="modalidade"
                    value={form.modalidade}
                    onChange={() => {}}
                    required
                    style={{ opacity: 0, height: 0, position: "absolute", pointerEvents: "none" }}
                    tabIndex={-1}
                  />
                </div>

                {/* Renda */}
                <div className={styles.grid2}>
                  <div className={`${styles.fieldGroup} ${styles.colSpan2}`}>
                    <label className={styles.label}>Informe a Renda Líquida *</label>
                    <input
                      className={styles.input}
                      type="text"
                      name="renda"
                      value={form.renda}
                      onChange={handleChange}
                      placeholder="Ex: 2.500,00"
                      required
                      inputMode="numeric"
                    />
                  </div>

                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>Como nos conheceu? *</label>
                    <select className={styles.input} name="comoConheceu" value={form.comoConheceu}
                      onChange={handleChange} required>
                      <option value="">Selecione</option>
                      <option value="google">Google</option>
                      <option value="instagram">Instagram</option>
                      <option value="facebook">Facebook</option>
                      <option value="indicacao">Indicação</option>
                      <option value="whatsapp">WhatsApp</option>
                      <option value="outro">Outro</option>
                    </select>
                  </div>

                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>Observações</label>
                    <textarea
                      className={`${styles.input} ${styles.textarea}`}
                      name="mensagem"
                      value={form.mensagem}
                      onChange={handleChange}
                      placeholder="Informações adicionais..."
                      rows={3}
                    />
                  </div>
                </div>

                {/* Mensagem de erro */}
                {error && (
                  <div style={{
                    display: "flex", alignItems: "center", gap: "10px",
                    background: "rgba(227,6,19,0.1)", border: "1px solid rgba(227,6,19,0.3)",
                    borderRadius: "12px", padding: "14px 18px", marginTop: "16px",
                  }}>
                    <FaExclamationCircle color="#e30613" />
                    <span style={{ color: "#ff6b6b", fontSize: "14px" }}>{error}</span>
                  </div>
                )}
              </div>
            )}

            {/* Botões de Navegação */}
            <div className={styles.navButtons}>
              {step > 1 && (
                <button type="button" className={styles.btnSecondary} onClick={handleBack}>
                  <FaArrowLeft /> Voltar
                </button>
              )}
              <div style={{ flex: 1 }} />
              {step < 3 ? (
                <button type="button" className={styles.btnPrimary} onClick={handleNext}>
                  Próximo <FaArrowRight />
                </button>
              ) : (
                <button type="submit" className={styles.btnPrimary} disabled={loading}>
                  {loading
                    ? <><span className={styles.spinner} /> Enviando...</>
                    : <>Solicitar Simulação <FaArrowRight /></>
                  }
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}