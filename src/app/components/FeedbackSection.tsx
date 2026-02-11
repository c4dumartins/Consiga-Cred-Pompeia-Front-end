"use client";

import { useState, FormEvent } from "react";
import styles from "./FeedbackSection.module.css";

interface Feedback {
  id: number;
  name: string;
  email: string;
  message: string;
  user_id: string;
  created_at: string;
}

interface FeedbackSectionProps {
  feedbacks: Feedback[];
  currentUserId: string;
  onSubmit: (name: string, email: string, message: string) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

export default function FeedbackSection({
  feedbacks,
  currentUserId,
  onSubmit,
  onDelete,
}: FeedbackSectionProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onSubmit(name, email, message);
      setName("");
      setEmail("");
      setMessage("");
    } finally {
      setIsSubmitting(false);
    }
  };

  const loadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <section id="feedback" className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.badge}>Feedbacks</span>
          <h2 className={styles.title}>
            O que nossos <span className={styles.highlight}>clientes</span> dizem
          </h2>
          <p className={styles.subtitle}>
            Compartilhe sua experiência e ajude outros a transformar suas vidas
          </p>
        </div>

        {/* Formulário */}
        <div className={styles.formWrapper}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGrid}>
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  placeholder="Seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className={styles.input}
                />
              </div>
              <div className={styles.inputGroup}>
                <input
                  type="email"
                  placeholder="Seu e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={styles.input}
                />
              </div>
            </div>
            <div className={styles.inputGroup}>
              <textarea
                placeholder="Compartilhe sua experiência..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className={styles.textarea}
                rows={4}
              />
            </div>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className={styles.spinner} />
                  Enviando...
                </>
              ) : (
                <>
                  Enviar feedback
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Grid de Feedbacks */}
        {feedbacks.length > 0 && (
          <div className={styles.feedbackGrid}>
            {feedbacks.slice(0, visibleCount).map((fb, idx) => (
              <div
                key={fb.id}
                className={styles.card}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className={styles.cardHeader}>
                  <div className={styles.avatar}>
                    {fb.name.charAt(0).toUpperCase()}
                  </div>
                  <div className={styles.cardInfo}>
                    <h4 className={styles.cardName}>{fb.name}</h4>
                    <span className={styles.cardDate}>
                      {new Date(fb.created_at).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
                <p className={styles.cardMessage}>{fb.message}</p>
                {fb.user_id === currentUserId && (
                  <button
                    className={styles.deleteBtn}
                    onClick={() => onDelete(fb.id)}
                    aria-label="Excluir feedback"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M19 7L18.133 19.142C18.057 20.167 17.187 21 16.16 21H7.84C6.813 21 5.943 20.167 5.867 19.142L5 7M10 11V17M14 11V17M15 7V4C15 3.448 14.552 3 14 3H10C9.448 3 9 3.448 9 4V7M4 7H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Botão Carregar Mais */}
        {visibleCount < feedbacks.length && (
          <div className={styles.loadMoreWrapper}>
            <button onClick={loadMore} className={styles.loadMoreBtn}>
              Carregar mais feedbacks
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M19 9L12 16L5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        )}

        {/* Mensagem quando não há feedbacks */}
        {feedbacks.length === 0 && (
          <div className={styles.emptyState}>
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
              <path d="M8 10H8.01M12 10H12.01M16 10H16.01M9 16H5C3.895 16 3 15.105 3 14V6C3 4.895 3.895 4 5 4H19C20.105 4 21 4.895 21 6V14C21 15.105 20.105 16 19 16H14L9 21V16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p>Seja o primeiro a compartilhar sua experiência!</p>
          </div>
        )}
      </div>
    </section>
  );
}