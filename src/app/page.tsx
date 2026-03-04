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
  // NOVO: Estado para controlar a mensagem de agradecimento
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

  // Handler para enviar feedback atualizado
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
        
        // 1. Ativa a mensagem de sucesso
        setShowSuccessMessage(true);
        
        // 2. Remove a mensagem automaticamente após 3 segundos
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

  const heroSlides = [{ image: "/Banner1.webp" }, { image: "/Banner2.webp" }, { image: "/Banner3.webp" }, { image: "/Banner4.webp" }];
  const simulacaoCards = [
    { title: "Pré-Cadastro", description: "Comece seu cadastro rapidamente.", icon: <FaUserPlus size={40} />, href: "/precadastro" },
    { title: "Simulação", description: "Simule seu crédito agora.", icon: <FaCalculator size={40} />, href: "/simulacao" },
    { title: "WhatsApp", description: "Fale conosco.", icon: <FaWhatsapp size={40} />, href: "https://wa.me/5514998471839" },
    { title: "Contratação", description: "Contrate online.", icon: <FaFileContract size={40} />, href: "#" },
  ];

  return (
    <div className={styles.page}>
      <Navbar />
      
      {/* MENSAGEM DE SUCESSO FLUTUANTE */}
      {showSuccessMessage && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#e30613', // Vermelho da sua marca
          color: 'white',
          padding: '20px 40px',
          borderRadius: '12px',
          zIndex: 9999,
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          textAlign: 'center',
          fontWeight: 'bold',
          border: '2px solid rgba(255,255,255,0.2)',
          fontSize: '1.2rem',
          animation: 'fadeIn 0.2s ease-out'
        }}>
          <p>Obrigado pelo seu feedback! ❤️</p>
          <small style={{ fontSize: '0.8rem', opacity: 0.8 }}>Sua opinião é muito importante para nós.</small>
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

      {/* Estilo simples para a animação de entrada */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translate(-50%, -60%); }
          to { opacity: 1; transform: translate(-50%, -50%); }
        }
      `}</style>
    </div>
  );
}