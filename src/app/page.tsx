"use client";
import styles from "./page.module.css";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";

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
  const [visibleCount, setVisibleCount] = useState(5); // número inicial de feedbacks visíveis
  const increment = 5; // quantidade que aumenta ao clicar "Ler mais"

  // Gerar ou ler userId no cookie
  let userId = Cookies.get("userId");
  if (!userId) {
    userId = uuidv4();
    Cookies.set("userId", userId, { expires: 365 });
  }

  const API_URL = "http://localhost:3001/feedbacks";

  // Carregar feedbacks da API
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setFeedbacks(data))
      .catch((err) => console.error(err));
  }, []);

  // Adicionar novo feedback
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

  // Deletar feedback
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

  return (
    <>
      <Navbar />

      <main className={styles.container}>
        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.box}></div>
          <div className={styles.box}></div>
          <div className={styles.box}></div>
        </section>

        {/* Simulação */}
        <section id="simulacao" className={styles.simulacao}>
          <p>Simule aqui o seu empréstimo online</p>
          <div>
            <button className={styles.btnBlack}>Pré-Cadastro</button>
            <a href="https://api.whatsapp.com/send?phone=5514998471839&text=Ol%C3%A1,%20gostaria%20de%20saber%20mais%20informa%C3%A7%C3%B5es!" className={styles.btnRed}>Entre em contato</a>
          </div>
        </section>

        {/* Sobre Nós */}
        <section id="sobre" className={styles.sobre}>
          <h2>
            Sobre <span className={styles.nos}>Nós</span>
          </h2>
          <div className={styles.boxGrande}></div>
        </section>

        <section id="feedback" className={styles.feedbacks}>
  <h2>Feedback</h2>

     {/* Formulário */}
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
  
  {/* Cards */}
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

  {/* Botão Ler mais */}
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

        {/* Rodapé */}
        <footer className={styles.footer}>
          <div>
            <h4>Fale com a gente</h4>
            <p>bla blabla blablabla</p>
            <p>bla bla bla bla</p>
          </div>
          <div>
            <h4>Endereço</h4>
            <p>Rua blablabla</p>
            <p>Tal blablabla</p>
          </div>
          <div>
            <h4>E-mail</h4>
            <p>consigacred@gmail.com</p>
          </div>
          <div>
            <h4>Redes Sociais</h4>
            <div className={styles.socials}>
              <a href="#">📷</a>
              <a href="#">📘</a>
              <a href="#">💬</a>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
