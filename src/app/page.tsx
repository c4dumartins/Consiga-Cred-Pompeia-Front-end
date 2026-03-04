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
  user_id: string; // Mantido como string para evitar conflitos no Front
  created_at: string;
}

export default function Home() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [userId, setUserId] = useState<string>("1"); // Estado inicial como string

  // Endpoint correto do seu backend
  const API_URL = "http://localhost:3001/feedbacks";

  // 1. Gerenciamento de Identidade do Usuário
  useEffect(() => {
    let savedId = Cookies.get("userId");
    if (!savedId) {
      savedId = "1"; 
      Cookies.set("userId", savedId, { expires: 365 });
    }
    // CORREÇÃO: Removido o parseInt para manter como string
    setUserId(savedId);
  }, []);

  // 2. Busca feedbacks do backend (GET)
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

  // 3. Enviar feedback (POST)
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
        alert("Feedback enviado com sucesso!");
      }
    } catch (err) {
      console.error("Erro ao enviar:", err);
    }
  };

  // 4. Deletar feedback (DELETE)
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

  // Configurações visuais (Mantidas)
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
      <main className={styles.main}>
        <Hero slides={heroSlides} autoplayInterval={5000} />
        <SimulacaoSection cards={simulacaoCards} />
        <SobreSection />
        <BancosParceiros />
        <FeedbackSection
          feedbacks={feedbacks}
          currentUserId={userId} // Agora passa a string diretamente
          onSubmit={handleSubmitFeedback}
          onDelete={handleDeleteFeedback}
        />
      </main>
      <Footer />
    </div>
  );
}