"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { FaUserPlus, FaWhatsapp, FaFileContract, FaCalculator } from "react-icons/fa";

// Componentes
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

export default function Home() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [userId, setUserId] = useState<string>("1");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

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
        if (Array.isArray(data)) {
          setFeedbacks(data);
        }
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
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000);
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

      if (res.ok) {
        setFeedbacks((prev) => prev.filter((fb) => fb.id !== id));
      }
    } catch (err) {
      console.error("Erro ao deletar:", err);
    }
  };

  const heroSlides = [
    { image: "/Banner1.webp" },
    { image: "/Banner2.webp" },
    { image: "/Banner3.webp" },
    { image: "/Banner4.webp" },
  ];

  const simulacaoCards = [
    { title: "Pré-Cadastro", description: "Comece seu cadastro rapidamente.", icon: <FaUserPlus size={40} />, href: "/precadastro" },
    { title: "Simulação", description: "Simule seu crédito agora.", icon: <FaCalculator size={40} />, href: "/simulacao" },
    { title: "WhatsApp", description: "Fale conosco.", icon: <FaWhatsapp size={40} />, href: "https://wa.me/5514998471839" },
    { title: "Contratação", description: "Contrate online.", icon: <FaFileContract size={40} />, href: "#" },
  ];

  return (
    <div className={styles.page}>
      <Navbar />

      {/* ── TOAST DE SUCESSO ── */}
      {showSuccessMessage && (
        <div style={{
          position: 'fixed',
          top: '32px',
          right: '32px',
          zIndex: 9999,
          animation: 'toastSlideIn 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards',
          maxWidth: '380px',
          width: 'calc(100vw - 48px)',
        }}>
          {/* Card */}
          <div style={{
            background: 'rgba(10, 10, 10, 0.95)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(227, 6, 19, 0.35)',
            borderRadius: '20px',
            padding: '22px 24px 20px',
            boxShadow: '0 24px 64px rgba(0,0,0,0.7), 0 0 0 1px rgba(227,6,19,0.08), 0 0 50px rgba(227,6,19,0.07)',
            overflow: 'hidden',
            position: 'relative',
          }}>

            {/* Glow radial de fundo */}
            <div style={{
              position: 'absolute',
              top: '-40px',
              left: '-40px',
              width: '200px',
              height: '200px',
              background: 'radial-gradient(circle, rgba(227,6,19,0.15) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />

            {/* Linha animada no topo */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '2px',
              background: 'linear-gradient(90deg, transparent 0%, #e30613 30%, #ff4757 60%, transparent 100%)',
              animation: 'shimmerLine 2s ease-in-out infinite',
            }} />

            {/* Conteúdo principal */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px',
              position: 'relative',
              zIndex: 1,
            }}>

              {/* Ícone */}
              <div style={{
                width: '48px',
                height: '48px',
                flexShrink: 0,
                borderRadius: '14px',
                background: 'linear-gradient(135deg, rgba(227,6,19,0.25), rgba(227,6,19,0.08))',
                border: '1px solid rgba(227,6,19,0.45)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'iconPop 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.15s both',
                boxShadow: '0 8px 24px rgba(227,6,19,0.25)',
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9.5" stroke="rgba(227,6,19,0.4)" strokeWidth="1.5"/>
                  <path
                    d="M7.5 12.5L10.5 15.5L16.5 9"
                    stroke="#e30613"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      strokeDasharray: '16',
                      strokeDashoffset: '0',
                      animation: 'drawCheck 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.35s both',
                    }}
                  />
                </svg>
              </div>

              {/* Textos */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '1rem',
                  margin: '0 0 5px',
                  letterSpacing: '-0.01em',
                  animation: 'fadeSlideUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both',
                }}>
                  Feedback enviado com sucesso!
                </p>
                <p style={{
                  color: 'rgba(255,255,255,0.52)',
                  fontSize: '0.84rem',
                  margin: 0,
                  lineHeight: 1.55,
                  animation: 'fadeSlideUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.3s both',
                }}>
                  Sua opinião é muito importante para nós. Obrigado! 
                </p>
              </div>

              {/* Botão fechar */}
              <button
                onClick={() => setShowSuccessMessage(false)}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '8px',
                  color: 'rgba(255,255,255,0.35)',
                  width: '28px',
                  height: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  flexShrink: 0,
                  transition: 'all 0.2s ease',
                  fontSize: '18px',
                  lineHeight: 1,
                  padding: 0,
                }}
                onMouseEnter={e => {
                  const btn = e.currentTarget as HTMLButtonElement;
                  btn.style.background = 'rgba(227,6,19,0.15)';
                  btn.style.borderColor = 'rgba(227,6,19,0.35)';
                  btn.style.color = '#e30613';
                }}
                onMouseLeave={e => {
                  const btn = e.currentTarget as HTMLButtonElement;
                  btn.style.background = 'rgba(255,255,255,0.05)';
                  btn.style.borderColor = 'rgba(255,255,255,0.08)';
                  btn.style.color = 'rgba(255,255,255,0.35)';
                }}
                aria-label="Fechar notificação"
              >
                ×
              </button>
            </div>

            {/* Barra de progresso drenando */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              height: '3px',
              background: 'linear-gradient(90deg, #e30613, #ff4757)',
              borderRadius: '0 3px 0 20px',
              animation: 'progressDrain 3s linear forwards',
              boxShadow: '0 0 10px rgba(227,6,19,0.6)',
            }} />
          </div>
        </div>
      )}

      <main className={styles.main}>
        <Hero slides={heroSlides} autoplayInterval={5000} />
        <SimulacaoSection cards={simulacaoCards} />
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

      {/* Keyframes globais para o toast */}
      <style jsx global>{`
        @keyframes toastSlideIn {
          from {
            opacity: 0;
            transform: translateX(48px) scale(0.92);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        @keyframes shimmerLine {
          0%   { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }

        @keyframes iconPop {
          from {
            opacity: 0;
            transform: scale(0.5) rotate(-10deg);
          }
          to {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }

        @keyframes drawCheck {
          from { stroke-dashoffset: 16; }
          to   { stroke-dashoffset: 0; }
        }

        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes progressDrain {
          from { width: 100%; }
          to   { width: 0%; }
        }

        /* Mobile: toast no topo centralizado */
        @media (max-width: 480px) {
          [data-toast] {
            top: 16px !important;
            right: 16px !important;
          }
        }
      `}</style>
    </div>
  );
}