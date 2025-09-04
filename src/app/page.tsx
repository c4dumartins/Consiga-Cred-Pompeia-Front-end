"use client";
import styles from "./page.module.css";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import { FaUserPlus, FaWhatsapp, FaFileContract, FaFacebookF, FaInstagram } from "react-icons/fa";
import { GoLocation } from "react-icons/go";

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
  const increment = 5;
  const [currentSlide, setCurrentSlide] = useState(0);

  // Gera ou pega UserID
  let userId = Cookies.get("userId");
  if (!userId) {
    userId = uuidv4();
    Cookies.set("userId", userId, { expires: 365 });
  }

  const API_URL = "http://localhost:3001/feedbacks";

  // Pega feedbacks do backend
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
      } else {
        console.error("Erro ao enviar feedback");
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
      } else {
        console.error("Erro ao deletar feedback");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Slides do Hero
  const slides: { image: string;}[] = [
    { image: "/Banner1.webp"},
    { image: "/Banner2.webp"},
    { image: "/Banner3.webp"},
    { image: "/Banner4.webp"},
  ];

  // Avança e volta slides
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  // Autoplay do carrossel
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Cards de simulação
  const simulacaoCardsData = [
    {
      title: "Pré-Cadastro",
      desc: "Comece seu cadastro rapidamente e garanta sua análise inicial.",
      icon: <FaUserPlus size={40} />,
      href: "#",
    },
    {
      title: "Entre em contato",
      desc: "Fale conosco via WhatsApp e tire todas as suas dúvidas.",
      icon: <FaWhatsapp size={40} />,
      href: "https://api.whatsapp.com/send?phone=5514998471839&text=Ol%C3%A1,%20gostaria%20de%20saber%20mais%20informa%C3%A7%C3%B5es!",
    },
    {
      title: "Autocontratação",
      desc: "Contrate seu empréstimo online de forma rápida e segura.",
      icon: <FaFileContract size={40} />,
      href: "https://auto-contratacao.nossafintech.com.br/home/RVFrUXY1cXozaHM1V1R0ZEF4M1FPbS9pNExYU3Bocm5LWHBCZmVORndMbVgxYW8vbHhTN0VLbW1ycTR3eFFGWmk2eXN0TUlxTXlqTjM1VTBPR21Zb1E9PQ==",
    },
  ];

  return (
    <>
      <Navbar />
      <main className={styles.container}>
        {/* Hero / Carrossel */}
        <section className={styles.hero}>
  {slides.map((slide, idx) => (
    <div
      key={idx}
      className={`${styles.heroSlide} ${idx === currentSlide ? styles.active : ""}`}
      style={{ backgroundImage: `url(${slide.image})` }}
    />
  ))}
  <div className={styles.heroControls}>
    <button className={styles.heroBtn} onClick={prevSlide}>
      ◀
    </button>
    <button className={styles.heroBtn} onClick={nextSlide}>
      ▶
    </button>
  </div>
</section>


        {/* Simulação */}
        <section id="simulacao" className={styles.simulacao}>
          <p className={styles.simulacaoTitulo}>
            Simule aqui o seu empréstimo online
          </p>
          <div className={styles.simulacaoCards}>
            {simulacaoCardsData.map((card, idx) => (
              <Link key={idx} href={card.href} className={styles.simulacaoCard}>
                <div className={styles.icon}>{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Sobre Nós */}
        <section id="sobre" className={styles.sobre}>
          <h2>
            Sobre <span className={styles.nos}>Nós</span>
          </h2>
          <div className={styles.boxGrande}></div>
        </section>

        {/* Feedback */}
        <section id="feedback" className={styles.feedbacks}>
          <h2>Feedback</h2>
          <form onSubmit={handleSubmit} className={styles.feedbackForm}>
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
            <textarea
              placeholder="Digite seu feedback..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <button type="submit">Enviar</button>
          </form>

          <div className={styles.feedbackGrid}>
            {feedbacks.slice(0, visibleCount).map((fb) => (
              <div key={fb.id} className={styles.feedbackCard}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardName}>{fb.name}</span>
                  <span className={styles.cardDate}>
                    {new Date(fb.created_at).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
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
              className={styles.btnRed}
              onClick={() => setVisibleCount(visibleCount + increment)}
            >
              Ler mais
            </button>
          )}
        </section>

        {/* Bancos Parceiros */}
        <section id="parceiros" className={styles.parceiros}>
          <h2>Bancos Parceiros</h2>
          <div className={styles.parceirosGrid}>
            <div className={styles.parceiroBox}></div>
            <div className={styles.parceiroBox}></div>
            <div className={styles.parceiroBox}></div>
          </div>
        </section>




{/* Footer Premium */}
<footer className={styles.footer}>
  <div className={styles.footerContent}>
    {/* Logo Section */}
    <div className={styles.footerLogo}>
      <img src="/FooterLogo.webp" alt="ConsigaCred - Empréstimos Consignados" />
      <p className={styles.footerTagline}>
        Soluções financeiras que transformam vidas
      </p>
    </div>

    {/* Fale com a gente */}
    <div className={styles.footerSection}>
      <h4>Fale com a gente</h4>
      <a href="tel:+5514998471839">📞 (14) 99847-1839</a>
      <a href="mailto:consigapompeia@hotmail.com">consigapompeia@hotmail.com</a>
      <a href="https://api.whatsapp.com/send?phone=5514998471839&text=Ol%C3%A1,%20gostaria%20de%20saber%20mais%20informa%C3%A7%C3%B5es!">
        💬 WhatsApp
      </a>
    </div>

    {/* Endereço */}
    <div className={styles.footerSection}>
      <h4>Localização</h4>
      <p>📍Rua Senador Rodolfo Miranda - 284 Centro</p>
      <p>🏙️ Pompeia - SP</p>
      <a href="https://www.instagram.com/consigacredpompeia/" target="_blank" rel="noopener noreferrer">
        🗺️ Ver no mapa
      </a>
    </div>

    {/* Links Rápidos */}
    <div className={styles.footerSection}>
      <h4>Links Rápidos</h4>
      <a href="#simulacao">💰 Simulação</a>
      <a href="#sobre">👥 Sobre Nós</a>
      <a href="#feedback">💬 Feedback</a>
      <a href="#parceiros">🤝 Parceiros</a>
      <a href="https://auto-contratacao.nossafintech.com.br/home/RVFrUXY1cXozaHM1V1R0ZEF4M1FPbS9pNExYU3Bocm5LWHBCZmVORndMbVgxYW8vbHhTN0VLbW1ycTR3eFFGWmk2eXN0TUlxTXlqTjM1VTBPR21Zb1E9PQ==">📋 Autocontratação</a>
    </div>

    {/* Redes Sociais e Citação */}
    <div className={`${styles.footerSection} ${styles.footerSpecial}`}>
      <div className={styles.socialMedia}>

        <a 
          href="https://api.whatsapp.com/send?phone=5514998471839&text=Ol%C3%A1,%20gostaria%20de%20saber%20mais%20informa%C3%A7%C3%B5es!"
          className={styles.socialLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          title="Fale conosco no WhatsApp"
        >
          <FaWhatsapp size={24} />
        </a>
  
        <a
          href="https://www.facebook.com/consiga.credpompeia"
          className={styles.socialLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          title="Siga-nos no Facebook"
        >
          <FaFacebookF size={24} />
        </a>
  
        <a
          href="https://www.instagram.com/consigacredpompeia/"
          className={styles.socialLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          title="Siga-nos no Instagram"
        >
          <FaInstagram size={24} />
        </a>
  
        <a
          href="https://maps.app.goo.gl/J8P8znB27nohmm5FA"
          className={styles.socialLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Google Maps"
          title="Encontre-nos no Google Maps"
        >
          <GoLocation size={24} />
        </a>
      </div>
      
      
      <p className={styles.footerCitation}>
        Transformando sonhos em conquistas financeiras com a ConsigaCred de Pompeia!
      </p>
    </div>
  </div>

  {/* Rodapé inferior */}
  <div className={styles.footerBottom}>
    <p>© 2025 ConsigaCred Pompeia. Todos os direitos reservados.</p>
  </div>
</footer>
      </main>
    </>
  );
}
