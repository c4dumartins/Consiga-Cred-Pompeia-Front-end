"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";
import { FaUserPlus, FaWhatsapp, FaFileContract } from "react-icons/fa";

// Componentes
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SimulacaoSection from "./components/SimulacaoSection";
import SobreSection from "./components/SobreSection";
import FeedbackSection from "./components/FeedbackSection";
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

  // Gera ou pega UserID
  let userId = Cookies.get("userId");
  if (!userId) {
    userId = uuidv4();
    Cookies.set("userId", userId, { expires: 365 });
  }

  const API_URL = "http://localhost:3001/feedbacks";

  // Busca feedbacks do backend
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setFeedbacks(data);
        } else {
          console.error("Resposta da API não é um array:", data);
          setFeedbacks([]);
        }
      })
      .catch((err) => {
        console.error("Erro ao buscar feedbacks:", err);
        setFeedbacks([]);
      });
  }, []);

  // Handler para enviar feedback
  const handleSubmitFeedback = async (
    name: string,
    email: string,
    message: string
  ) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, user_id: userId }),
      });

      if (res.ok) {
        const newFb = await res.json();
        setFeedbacks([newFb, ...feedbacks]);
      } else {
        console.error("Erro ao enviar feedback");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Handler para deletar feedback
  const handleDeleteFeedback = async (id: number) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId }),
      });

      if (res.ok) {
        setFeedbacks(feedbacks.filter((fb) => fb.id !== id));
      } else {
        console.error("Erro ao deletar feedback");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Slides do Hero
  const heroSlides = [
    { image: "/Banner1.webp" },
    { image: "/Banner2.webp" },
    { image: "/Banner3.webp" },
    { image: "/Banner4.webp" },
  ];

  // Cards de Simulação
  const simulacaoCards = [
    {
      title: "Pré-Cadastro",
      description: "Comece seu cadastro rapidamente e garanta sua análise inicial.",
      icon: <FaUserPlus size={40} />,
      href: "#",
    },
    {
      title: "Entre em contato",
      description: "Fale conosco via WhatsApp e tire todas as suas dúvidas.",
      icon: <FaWhatsapp size={40} />,
      href: "https://api.whatsapp.com/send?phone=5514998471839&text=Ol%C3%A1,%20gostaria%20de%20saber%20mais%20informa%C3%A7%C3%B5es!",
    },
    {
      title: "Autocontratação",
      description: "Contrate seu empréstimo online de forma rápida e segura.",
      icon: <FaFileContract size={40} />,
      href: "https://auto-contratacao.nossafintech.com.br/home/RVFrUXY1cXozaHM1V1R0ZEF4M1FPbS9pNExYU3Bocm5LWHBCZmVORndMbVgxYW8vbHhTN0VLbW1ycTR3eFFGWmk2eXN0TUlxTXlqTjM1VTBPR21Zb1E9PQ==",
    },
  ];

  return (
    <div className={styles.page}>
      <Navbar />
      
      <main className={styles.main}>
        {/* Hero Section */}
        <Hero slides={heroSlides} autoplayInterval={5000} />

        {/* Simulação Section */}
        <SimulacaoSection cards={simulacaoCards} />

        {/* Sobre Nós Section */}
        <SobreSection />

        {/* Feedback Section */}
        <FeedbackSection
          feedbacks={feedbacks}
          currentUserId={userId || ""}
          onSubmit={handleSubmitFeedback}
          onDelete={handleDeleteFeedback}
        />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}