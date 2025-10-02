"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import { FaUserPlus, FaWhatsapp, FaFileContract, FaCheckCircle } from "react-icons/fa";

import Navbar from "./components/Navbar";
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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [visibleCount, setVisibleCount] = useState(5);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const increment = 5;
  const API_URL = "http://localhost:3001/feedbacks";

  // Gera ou recupera UserID
  let userId = Cookies.get("userId");
  if (!userId) {
    userId = uuidv4();
    Cookies.set("userId", userId, { expires: 365 });
  }

  // Animação de entrada
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Slides do Hero
  const slides = [
    { image: "/Banner1.webp" },
    { image: "/Banner2.webp" },
    { image: "/Banner3.webp" },
    { image: "/Banner4.webp" },
  ];

  // Cards de simulação
  const simulacaoCardsData = [
    {
      title: "Pré-Cadastro",
      desc: "Comece seu cadastro rapidamente e garanta sua análise inicial.",
      icon: <FaUserPlus size={40} />,
      href: "#",
    },
    {
      title: "Simular Empréstimo",
      desc: "Simule seu empréstimo e veja as melhores condições para você.",
      icon: <FaFileContract size={40} />,
      href: "#simulador",
    },
    {
      title: "Entre em contato",
      desc: "Fale conosco via WhatsApp e tire todas as suas dúvidas.",
      icon: <FaWhatsapp size={40} />,
      href: "https://api.whatsapp.com/send?phone=5514998471839&text=Ol%C3%A1,%20gostaria%20de%20saber%20mais%20informa%C3%A7%C3%B5es!",
    },
  ];

  // Diferenciais
  const diferenciais = [
    { text: "Aprovação rápida em até 24h", delay: "0.1s" },
    { text: "Taxas competitivas do mercado", delay: "0.2s" },
    { text: "Atendimento humanizado", delay: "0.3s" },
    { text: "Processo 100% digital", delay: "0.4s" },
  ];

  // Busca feedbacks
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setFeedbacks(data))
      .catch((err) => console.error(err));
  }, []);

  // Envia feedback
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, user_id: userId }),
      });

      if (res.ok) {
        const newFb = await res.json();
        setFeedbacks([newFb, ...feedbacks]);
        setName("");
        setEmail("");
        setMessage("");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Deleta feedback
  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId }),
      });

      if (res.ok) {
        setFeedbacks(feedbacks.filter((fb) => fb.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Controles do carrossel
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  // Autoplay do carrossel
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <Navbar />
      <main className={styles.container}>
        {/* Hero / Carrossel */}
        <section className={styles.hero}>
          {slides.map((slide, idx) => (
            <div
              key={idx}
              className={`${styles.heroSlide} ${
                idx === currentSlide ? styles.active : ""
              }`}
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className={styles.heroOverlay}></div>
            </div>
          ))}
          
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Realize seus sonhos com <span>crédito facilitado</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Empréstimos consignados com as melhores condições do mercado
            </p>
            <div className={styles.heroButtons}>
              <Link href="#simulacao" className={styles.heroCta}>
                Simular Agora
              </Link>
              <a
                href="https://api.whatsapp.com/send?phone=5514998471839&text=Ol%C3%A1,%20gostaria%20de%20saber%20mais%20informa%C3%A7%C3%B5es!"
                className={styles.heroCtaSecondary}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp /> Falar no WhatsApp
              </a>
            </div>
          </div>

          <div className={styles.heroControls}>
            <button 
              className={styles.heroBtn} 
              onClick={prevSlide}
              aria-label="Slide anterior"
            >
              ◀
            </button>
            <div className={styles.heroIndicators}>
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  className={`${styles.indicator} ${
                    idx === currentSlide ? styles.indicatorActive : ""
                  }`}
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Ir para slide ${idx + 1}`}
                />
              ))}
            </div>
            <button 
              className={styles.heroBtn} 
              onClick={nextSlide}
              aria-label="Próximo slide"
            >
              ▶
            </button>
          </div>
        </section>

        {/* Diferenciais em destaque */}
        <section className={styles.diferenciais}>
          <div className={styles.diferenciaisContainer}>
            {diferenciais.map((item, idx) => (
              <div
                key={idx}
                className={styles.diferencialItem}
                style={{ animationDelay: item.delay }}
              >
                <FaCheckCircle className={styles.diferencialIcon} />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Simulação */}
        <section id="simulacao" className={styles.simulacao}>
          <div className={styles.simulacaoHeader}>
            <h2 className={styles.sectionTitle}>
              Como podemos <span>te ajudar?</span>
            </h2>
            <p className={styles.sectionSubtitle}>
              Escolha a melhor opção para iniciar seu empréstimo
            </p>
          </div>
          
          <div className={styles.simulacaoCards}>
            {simulacaoCardsData.map((card, idx) => (
              <Link 
                key={idx} 
                href={card.href} 
                className={styles.simulacaoCard}
                style={{ animationDelay: `${idx * 0.1}s` }}
                target={card.href.startsWith("http") ? "_blank" : "_self"}
                rel={card.href.startsWith("http") ? "noopener noreferrer" : ""}
              >
                <div className={styles.cardIconWrapper}>
                  <div className={styles.icon}>{card.icon}</div>
                </div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
                <span className={styles.cardArrow}>→</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Sobre Nós */}
        <section id="sobre" className={styles.sobre}>
          <div className={styles.sobreContent}>
            <h2 className={styles.sectionTitle}>
              Sobre <span>Nós</span>
            </h2>
            <div className={styles.sobreGrid}>
              <div className={styles.sobreText}>
                <p>
                  A <strong>ConsigaCred Pompeia</strong> é uma empresa especializada em empréstimos consignados, 
                  oferecendo as melhores soluções financeiras para realizar seus sonhos.
                </p>
                <p>
                  Com anos de experiência no mercado, nossa missão é proporcionar crédito rápido, 
                  seguro e com as melhores taxas, sempre com um atendimento humanizado e personalizado.
                </p>
                <div className={styles.sobreStats}>
                  <div className={styles.statItem}>
                    <h3>5000+</h3>
                    <p>Clientes Atendidos</p>
                  </div>
                  <div className={styles.statItem}>
                    <h3>10+</h3>
                    <p>Anos de Experiência</p>
                  </div>
                  <div className={styles.statItem}>
                    <h3>98%</h3>
                    <p>Satisfação</p>
                  </div>
                </div>
              </div>
              <div className={styles.sobreImage}>
                <div className={styles.imagePlaceholder}>
                  {/* Aqui você pode adicionar uma imagem da empresa */}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feedback */}
        <section id="feedback" className={styles.feedbacks}>
          <h2 className={styles.sectionTitle}>
            O que dizem <span>nossos clientes</span>
          </h2>
          <p className={styles.sectionSubtitle}>
            Compartilhe sua experiência conosco
          </p>

          <form onSubmit={handleSubmit} className={styles.feedbackForm}>
            <div className={styles.formRow}>
              <input
                type="text"
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <textarea
              placeholder="Compartilhe sua experiência..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={4}
            />
            <button type="submit" className={styles.submitBtn}>
              Enviar Feedback
            </button>
          </form>

          <div className={styles.feedbackGrid}>
            {feedbacks.slice(0, visibleCount).map((fb) => (
              <div key={fb.id} className={styles.feedbackCard}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardName}>{fb.name}</span>
                  <span className={styles.cardDate}>
                    {new Date(fb.created_at).toLocaleDateString("pt-BR")}
                  </span>
                </div>
                <p className={styles.cardMessage}>{fb.message}</p>
                {fb.user_id === userId && (
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDelete(fb.id)}
                  >
                    Excluir
                  </button>
                )}
              </div>
            ))}
          </div>

          {visibleCount < feedbacks.length && (
            <button
              className={styles.loadMoreBtn}
              onClick={() => setVisibleCount(visibleCount + increment)}
            >
              Carregar Mais
            </button>
          )}
        </section>

        {/* Bancos Parceiros */}
        <section id="parceiros" className={styles.parceiros}>
          <h2 className={styles.sectionTitle}>
            Nossos <span>Parceiros</span>
          </h2>
          <p className={styles.sectionSubtitle}>
            Trabalhamos com as melhores instituições financeiras
          </p>
          <div className={styles.parceirosGrid}>
            <div className={styles.parceiroBox}></div>
            <div className={styles.parceiroBox}></div>
            <div className={styles.parceiroBox}></div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}