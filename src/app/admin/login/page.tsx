"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";
import Image from "next/image";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Preencha e-mail e senha.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Credenciais inválidas.");
        return;
      }

      // Salva apenas na sessionStorage (apagado ao fechar a aba)
      sessionStorage.setItem("adminToken", data.token);
      sessionStorage.setItem("adminData", JSON.stringify(data.admin));

      router.push("/admin");
    } catch {
      setError("Não foi possível conectar ao servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.page}>
      {/* Fundo decorativo */}
      <div className={styles.bg}>
        <div className={styles.bgGlow} />
        <div className={styles.bgGrid} />
      </div>

      <div className={styles.card}>
        {/* Logo */}
        <div className={styles.logoWrap}>
          <Image
            src="/MenuLogo.webp"
            alt="ConsigaCred"
            width={140}
            height={48}
            style={{ objectFit: "contain" }}
          />
        </div>

        {/* Badge restrito */}
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          Área restrita — somente administradores
        </div>

        <h1 className={styles.title}>Acesso Admin</h1>
        <p className={styles.subtitle}>
          Entre com suas credenciais para acessar o painel.
        </p>

        {/* Formulário */}
        <div className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="email">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              className={styles.input}
              placeholder="admin@consigacred.com.br"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="password">
              Senha
            </label>
            <div className={styles.inputWrap}>
              <input
                id="password"
                type={showPass ? "text" : "password"}
                className={`${styles.input} ${styles.inputWithIcon}`}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowPass((v) => !v)}
                aria-label={showPass ? "Ocultar senha" : "Mostrar senha"}
              >
                {showPass ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {error && (
            <div className={styles.errorBox}>
              <span>⚠️</span> {error}
            </div>
          )}

          <button
            className={`${styles.btn} ${loading ? styles.btnLoading : ""}`}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <span className={styles.spinner} />
            ) : (
              "Entrar no painel"
            )}
          </button>
        </div>

        <p className={styles.footer}>
          Não é administrador?{" "}
          <a href="/" className={styles.footerLink}>
            Voltar ao site
          </a>
        </p>
      </div>
    </main>
  );
}