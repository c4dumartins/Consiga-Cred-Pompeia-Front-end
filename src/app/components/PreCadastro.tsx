"use client";

import { useState } from "react";
import styles from "./PreCadastro.module.css";
import { FaUserPlus, FaCheckCircle, FaArrowRight, FaArrowLeft } from "react-icons/fa";

interface FormData {
  // Step 1 - Dados Pessoais
  nome: string;
  cpf: string;
  dataNascimento: string;
  telefone: string;
  email: string;
  // Step 2 - Endereço
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  // Step 3 - Interesse
  tipoConsorcio: string;
  valorDesejado: string;
  prazo: string;
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
  tipoConsorcio: "",
  valorDesejado: "",
  prazo: "",
  comoConheceu: "",
  mensagem: "",
};

const steps = [
  { label: "Dados Pessoais", number: 1 },
  { label: "Endereço", number: 2 },
  { label: "Interesse", number: 3 },
];

function maskCPF(value: string) {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    .slice(0, 14);
}

function maskPhone(value: string) {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .slice(0, 15);
}

function maskCEP(value: string) {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .slice(0, 9);
}

export default function PreCadastro() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    let masked = value;
    if (name === "cpf") masked = maskCPF(value);
    if (name === "telefone") masked = maskPhone(value);
    if (name === "cep") masked = maskCEP(value);
    setForm((prev) => ({ ...prev, [name]: masked }));
  };

  const handleNext = () => {
    if (step < 3) setStep((s) => s + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep((s) => s - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className={styles.page}>
        <div className={styles.successContainer}>
          <div className={styles.successIcon}>
            <FaCheckCircle />
          </div>
          <h2 className={styles.successTitle}>Pré-Cadastro Enviado!</h2>
          <p className={styles.successText}>
            Recebemos suas informações com sucesso. Nossa equipe entrará em
            contato em breve pelo telefone ou e-mail informado.
          </p>
          <button
            className={styles.btnPrimary}
            onClick={() => {
              setSubmitted(false);
              setStep(1);
              setForm(initialForm);
            }}
          >
            Novo Cadastro
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* Background effects */}
      <div className={styles.bgGlow} />
      <div className={styles.bgGrid} />

      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.iconWrapper}>
            <FaUserPlus />
          </div>
          <h1 className={styles.title}>Pré-Cadastro</h1>
          <p className={styles.subtitle}>
            Preencha o formulário abaixo e nossa equipe entrará em contato com
            as melhores condições para você.
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
          <form onSubmit={handleSubmit}>
            {/* STEP 1 - Dados Pessoais */}
            {step === 1 && (
              <div className={styles.formStep}>
                <h3 className={styles.stepTitle}>Dados Pessoais</h3>
                <div className={styles.grid2}>
                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>Nome Completo *</label>
                    <input
                      className={styles.input}
                      type="text"
                      name="nome"
                      value={form.nome}
                      onChange={handleChange}
                      placeholder="Seu nome completo"
                      required
                    />
                  </div>
                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>CPF *</label>
                    <input
                      className={styles.input}
                      type="text"
                      name="cpf"
                      value={form.cpf}
                      onChange={handleChange}
                      placeholder="000.000.000-00"
                      required
                    />
                  </div>
                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>Data de Nascimento *</label>
                    <input
                      className={styles.input}
                      type="date"
                      name="dataNascimento"
                      value={form.dataNascimento}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>Telefone / WhatsApp *</label>
                    <input
                      className={styles.input}
                      type="text"
                      name="telefone"
                      value={form.telefone}
                      onChange={handleChange}
                      placeholder="(00) 00000-0000"
                      required
                    />
                  </div>
                  <div className={`${styles.fieldGroup} ${styles.colSpan2}`}>
                    <label className={styles.label}>E-mail *</label>
                    <input
                      className={styles.input}
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2 - Endereço */}
            {step === 2 && (
              <div className={styles.formStep}>
                <h3 className={styles.stepTitle}>Endereço</h3>
                <div className={styles.grid2}>
                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>CEP *</label>
                    <input
                      className={styles.input}
                      type="text"
                      name="cep"
                      value={form.cep}
                      onChange={handleChange}
                      placeholder="00000-000"
                      required
                    />
                  </div>
                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>Estado *</label>
                    <select
                      className={styles.input}
                      name="estado"
                      value={form.estado}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Selecione</option>
                      {["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"].map((uf) => (
                        <option key={uf} value={uf}>{uf}</option>
                      ))}
                    </select>
                  </div>
                  <div className={`${styles.fieldGroup} ${styles.colSpan2}`}>
                    <label className={styles.label}>Logradouro *</label>
                    <input
                      className={styles.input}
                      type="text"
                      name="logradouro"
                      value={form.logradouro}
                      onChange={handleChange}
                      placeholder="Rua, Avenida..."
                      required
                    />
                  </div>
                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>Número *</label>
                    <input
                      className={styles.input}
                      type="text"
                      name="numero"
                      value={form.numero}
                      onChange={handleChange}
                      placeholder="Nº"
                      required
                    />
                  </div>
                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>Complemento</label>
                    <input
                      className={styles.input}
                      type="text"
                      name="complemento"
                      value={form.complemento}
                      onChange={handleChange}
                      placeholder="Apto, Bloco..."
                    />
                  </div>
                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>Bairro *</label>
                    <input
                      className={styles.input}
                      type="text"
                      name="bairro"
                      value={form.bairro}
                      onChange={handleChange}
                      placeholder="Bairro"
                      required
                    />
                  </div>
                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>Cidade *</label>
                    <input
                      className={styles.input}
                      type="text"
                      name="cidade"
                      value={form.cidade}
                      onChange={handleChange}
                      placeholder="Cidade"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3 - Interesse */}
            {step === 3 && (
              <div className={styles.formStep}>
                <h3 className={styles.stepTitle}>Seu Interesse</h3>
                <div className={styles.grid2}>
                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>Tipo de Consórcio *</label>
                    <select
                      className={styles.input}
                      name="tipoConsorcio"
                      value={form.tipoConsorcio}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Selecione</option>
                      <option value="imovel">Imóvel</option>
                      <option value="veiculo">Veículo</option>
                      <option value="moto">Moto</option>
                      <option value="servicos">Serviços</option>
                      <option value="outro">Outro</option>
                    </select>
                  </div>
                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>Valor Desejado *</label>
                    <select
                      className={styles.input}
                      name="valorDesejado"
                      value={form.valorDesejado}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Selecione</option>
                      <option value="ate50k">Até R$ 50.000</option>
                      <option value="50k100k">R$ 50.000 – R$ 100.000</option>
                      <option value="100k200k">R$ 100.000 – R$ 200.000</option>
                      <option value="200k500k">R$ 200.000 – R$ 500.000</option>
                      <option value="acima500k">Acima de R$ 500.000</option>
                    </select>
                  </div>
                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>Prazo Desejado *</label>
                    <select
                      className={styles.input}
                      name="prazo"
                      value={form.prazo}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Selecione</option>
                      <option value="24">24 meses</option>
                      <option value="36">36 meses</option>
                      <option value="48">48 meses</option>
                      <option value="60">60 meses</option>
                      <option value="72">72 meses</option>
                      <option value="84">84 meses</option>
                    </select>
                  </div>
                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>Como nos conheceu?</label>
                    <select
                      className={styles.input}
                      name="comoConheceu"
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
                  </div>
                  <div className={`${styles.fieldGroup} ${styles.colSpan2}`}>
                    <label className={styles.label}>Mensagem / Observações</label>
                    <textarea
                      className={`${styles.input} ${styles.textarea}`}
                      name="mensagem"
                      value={form.mensagem}
                      onChange={handleChange}
                      placeholder="Conte-nos mais sobre o que você está buscando..."
                      rows={4}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
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
                    <span className={styles.spinner} />
                  ) : (
                    <>
                      Enviar Cadastro <FaArrowRight />
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