"use client";

import { useState } from "react";
import styles from "./admin.module.css"; // ajuste o nome caso tenha salvo como page.module.css
import Link from "next/link";

export default function CadastrarAdminPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Status: "idle" | "loading" | "success" | "error"
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [mensagem, setMensagem] = useState("");

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMensagem("");

    try {
      const token = localStorage.getItem("token_admin");

      if (!token) {
        setStatus("error");
        setMensagem("Acesso negado: Você não está autenticado como administrador.");
        return;
      }

      const res = await fetch("http://localhost:3001/admins", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        setStatus("success");
        setMensagem("Novo administrador criado com sucesso!");
        setName("");
        setEmail("");
        setPassword("");
      } else {
        const errorData = await res.json();
        setStatus("error");
        setMensagem(errorData.error || errorData.message || "Não foi possível criar o usuário.");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setMensagem("Erro de conexão com o servidor.");
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.bgGlow} />
      <Link href="/" className={styles.backBtn}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5" />
          <path d="M12 19l-7-7 7-7" />
        </svg>
        Voltar
      </Link>

      <div className={styles.header}>
        <h1 className={styles.title}>
          Gerenciar <span className={styles.highlight}>Acessos</span>
        </h1>
        <p className={styles.subtitle}>
          Adicione novos administradores ao painel de controle
        </p>
      </div>

      <div className={styles.card}>
        <form onSubmit={handleCreateAdmin}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Nome do Administrador</label>
            <input
              type="text"
              placeholder="Ex: João Silva"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>E-mail Corporativo</label>
            <input
              type="email"
              placeholder="admin@consigacred.com.br"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Senha de Acesso</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.input}
              minLength={6}
            />
          </div>

          <button type="submit" className={styles.btn} disabled={status === "loading"}>
            {status === "loading" ? (
              <>
                <span className={styles.spinner} />
                Processando...
              </>
            ) : (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <line x1="19" y1="8" x2="19" y2="14" />
                  <line x1="22" y1="11" x2="16" y2="11" />
                </svg>
                Cadastrar Administrador
              </>
            )}
          </button>
        </form>

        {/* Mensagens de Feedback */}
        {status === "success" && (
          <div className={`${styles.alertBox} ${styles.alertSuccess}`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <span>{mensagem}</span>
          </div>
        )}

        {status === "error" && (
          <div className={`${styles.alertBox} ${styles.alertError}`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{mensagem}</span>
          </div>
        )}
      </div>
    </div>
  );
}