"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { FaUserPlus, FaWhatsapp, FaFileContract, FaCalculator } from "react-icons/fa";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SimulacaoSection from "./components/SimulacaoSection";
import SobreSection from "./components/SobreSection";
import FeedbackSection from "./components/FeedbackSection";
import BancosParceiros from "./components/BancosParceiros";
import Footer from "./components/Footer";

import styles from "./page.module.css";

interface Feedback {
  id: number;
  name: string;
  email: string;
  message: string;
  user_id: string;
  created_at: string;
}

function ContratacaoModal({ onClose }: { onClose: () => void }) {
  const opcoes = [
    {
      titulo: "Antecipação do FGTS",
      descricao: "Antecipe seu saldo do FGTS sem comprometimento mensal e sem consulta ao SPC/Serasa.",
      href: "https://auto.v8sistema.com/ff8bb251-f3a7-48d7-af61-841b277421a2",
      icone: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 8v8M9 11l3-3 3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      titulo: "Crédito do Trabalhador",
      descricao: "Empréstimo com desconto direto em folha para trabalhadores com carteira assinada.",
      href: "https://v8-auto-clt-front.vercel.app/d0d9d203-26f5-4068-adce-d182239001fc",
      icone: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
          <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M12 12v4M10 14h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
    },
  ];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        background: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(8px)",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#0a0a0a",
          border: "1px solid rgba(227,6,19,0.25)",
          borderRadius: "24px",
          padding: "40px",
          maxWidth: "560px",
          width: "100%",
          position: "relative",
          boxShadow: "0 40px 80px rgba(0,0,0,0.7), 0 0 60px rgba(227,6,19,0.06)",
          animation: "modalIn 0.35s cubic-bezier(0.22,1,0.36,1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Linha topo */}
        <div style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: "2px",
          background: "linear-gradient(90deg, transparent, #e30613, transparent)",
          borderRadius: "24px 24px 0 0",
        }} />

        {/* Header */}
        <div style={{ marginBottom: "32px", paddingRight: "40px" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 16px",
            background: "rgba(227,6,19,0.08)",
            border: "1px solid rgba(227,6,19,0.22)",
            borderRadius: "100px",
            marginBottom: "16px",
          }}>
            <span style={{
              width: "6px", height: "6px",
              background: "#e30613",
              borderRadius: "50%",
              animation: "pulse 2s ease-in-out infinite",
              display: "inline-block",
            }} />
            <span style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", color: "#e30613" }}>
              Autocontratação
            </span>
          </div>
          <h2 style={{ color: "#fff", fontWeight: 800, fontSize: "1.6rem", letterSpacing: "-0.02em", margin: "0 0 8px" }}>
            Escolha o produto
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", margin: 0, lineHeight: 1.6 }}>
            Selecione a modalidade para prosseguir com a contratação online
          </p>
        </div>

        {/* Botão fechar */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "20px", right: "20px",
            width: "36px", height: "36px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "10px",
            color: "rgba(255,255,255,0.5)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
            lineHeight: 1,
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(227,6,19,0.15)";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(227,6,19,0.4)";
            (e.currentTarget as HTMLButtonElement).style.color = "#e30613";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.05)";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.1)";
            (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.5)";
          }}
        >
          ×
        </button>

        {/* Opções */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {opcoes.map((op) => (
            <a
              key={op.href}
              href={op.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                padding: "22px 24px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "16px",
                textDecoration: "none",
                color: "#fff",
                transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = "rgba(227,6,19,0.4)";
                el.style.background = "rgba(227,6,19,0.07)";
                el.style.transform = "translateY(-2px)";
                el.style.boxShadow = "0 12px 32px rgba(0,0,0,0.4)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = "rgba(255,255,255,0.08)";
                el.style.background = "rgba(255,255,255,0.03)";
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "none";
              }}
            >
              {/* Ícone */}
              <div style={{
                width: "56px", height: "56px",
                flexShrink: 0,
                background: "rgba(227,6,19,0.1)",
                border: "1px solid rgba(227,6,19,0.25)",
                borderRadius: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#e30613",
              }}>
                {op.icone}
              </div>

              {/* Texto */}
              <div style={{ flex: 1 }}>
                <p style={{ margin: "0 0 4px", fontWeight: 700, fontSize: "1rem", color: "#fff" }}>
                  {op.titulo}
                </p>
                <p style={{ margin: 0, fontSize: "0.82rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>
                  {op.descricao}
                </p>
              </div>

              {/* Seta */}
              <div style={{ color: "#e30613", flexShrink: 0 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </a>
          ))}
        </div>

        <p style={{
          textAlign: "center",
          fontSize: "12px",
          color: "rgba(255,255,255,0.25)",
          marginTop: "20px",
          marginBottom: 0,
        }}>
          Você será redirecionado para a plataforma de contratação segura
        </p>
      </div>

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.94) translateY(16px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes pulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(227,6,19,0.5); }
          60% { box-shadow: 0 0 0 6px rgba(227,6,19,0); }
        }
      `}</style>
    </div>
  );
}

export default function Home() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [userId, setUserId] = useState<string>("1");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showContratacaoModal, setShowContratacaoModal] = useState(false);

  const API_URL = "http://localhost:3001/feedbacks";

  useEffect(() => {
    let savedId = Cookies.get("userId");
    if (!savedId) {
      savedId = "1";
      Cookies.set("userId", savedId, { expires: 365 });
    }
    setUserId(savedId);
  }, []);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setFeedbacks(data);
      })
      .catch((err) => console.error("Erro ao buscar feedbacks:", err));
  }, []);

  const handleSubmitFeedback = async (name: string, email: string, message: string) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, user_id: userId }),
      });
      if (res.ok) {
        const newFb = await res.json();
        setFeedbacks((prev) => [newFb, ...prev]);
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000);
      }
    } catch (err) {
      console.error("Erro ao enviar:", err);
    }
  };

  const handleDeleteFeedback = async (id: number) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId }),
      });
      if (res.ok) setFeedbacks((prev) => prev.filter((fb) => fb.id !== id));
    } catch (err) {
      console.error("Erro ao deletar:", err);
    }
  };

  const heroSlides = [
    { image: "/Banner1.jpeg" },
    { image: "/Banner2.jpeg" },
    { image: "/Banner3.jpeg" },
    { image: "/Banner4.jpeg" },
  ];

  const simulacaoCards = [
    { title: "Pré-Cadastro", description: "Comece seu cadastro rapidamente.", icon: <FaUserPlus size={40} />, href: "/precadastro" },
    { title: "Simulação", description: "Simule seu crédito agora.", icon: <FaCalculator size={40} />, href: "/simulacao" },
    { title: "WhatsApp", description: "Fale conosco.", icon: <FaWhatsapp size={40} />, href: "https://wa.me/5514998471839" },
    { title: "Contratação", description: "Contrate online.", icon: <FaFileContract size={40} />, href: "#contratacao" },
  ];

  return (
    <div className={styles.page}>
      <Navbar />

      {/* Modal de Contratação */}
      {showContratacaoModal && (
        <ContratacaoModal onClose={() => setShowContratacaoModal(false)} />
      )}

      {/* Toast de Sucesso */}
      {showSuccessMessage && (
        <div style={{
          position: "fixed",
          top: "32px",
          right: "32px",
          zIndex: 9998,
          animation: "toastSlideIn 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards",
          maxWidth: "380px",
          width: "calc(100vw - 48px)",
        }}>
          <div style={{
            background: "rgba(10, 10, 10, 0.95)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(227, 6, 19, 0.35)",
            borderRadius: "20px",
            padding: "22px 24px 20px",
            boxShadow: "0 24px 64px rgba(0,0,0,0.7)",
            overflow: "hidden",
            position: "relative",
          }}>
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: "2px",
              background: "linear-gradient(90deg, transparent 0%, #e30613 30%, #ff4757 60%, transparent 100%)",
            }} />
            <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
              <div style={{
                width: "48px", height: "48px", flexShrink: 0,
                borderRadius: "14px",
                background: "rgba(227,6,19,0.15)",
                border: "1px solid rgba(227,6,19,0.45)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M7.5 12.5L10.5 15.5L16.5 9" stroke="#e30613" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ color: "#fff", fontWeight: 700, fontSize: "1rem", margin: "0 0 5px" }}>
                  Feedback enviado com sucesso!
                </p>
                <p style={{ color: "rgba(255,255,255,0.52)", fontSize: "0.84rem", margin: 0, lineHeight: 1.55 }}>
                  Sua opinião é muito importante para nós. Obrigado!
                </p>
              </div>
              <button
                onClick={() => setShowSuccessMessage(false)}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "8px",
                  color: "rgba(255,255,255,0.35)",
                  width: "28px", height: "28px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", flexShrink: 0, fontSize: "18px", lineHeight: 1, padding: 0,
                }}
              >×</button>
            </div>
            <div style={{
              position: "absolute", bottom: 0, left: 0, height: "3px",
              background: "linear-gradient(90deg, #e30613, #ff4757)",
              borderRadius: "0 3px 0 20px",
              animation: "progressDrain 3s linear forwards",
            }} />
          </div>
        </div>
      )}

      <main className={styles.main}>
        <Hero slides={heroSlides} autoplayInterval={5000} />
        <SimulacaoSection
          cards={simulacaoCards}
          onContratacaoClick={() => setShowContratacaoModal(true)}
        />
        <SobreSection />
        <BancosParceiros />
        <FeedbackSection
          feedbacks={feedbacks}
          currentUserId={userId}
          onSubmit={handleSubmitFeedback}
          onDelete={handleDeleteFeedback}
        />
      </main>
      <Footer />

      <style jsx global>{`
        @keyframes toastSlideIn {
          from { opacity: 0; transform: translateX(48px) scale(0.92); }
          to { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes progressDrain {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
}