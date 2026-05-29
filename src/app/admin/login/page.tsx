"use client";

import { useState, Suspense } from "react"; // 🟢 Importado o Suspense
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./login.module.css";
import Image from "next/image";

function EyeOpenIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.42012 12.7132C2.28394 12.4975 2.21584 12.3897 2.17772 12.2234C2.14909 12.0985 2.14909 11.9015 2.17772 11.7766C2.21584 11.6103 2.28394 11.5025 2.42012 11.2868C3.54553 9.50484 6.8954 5 12.0004 5C17.1054 5 20.4553 9.50484 21.5807 11.2868C21.7169 11.5025 21.785 11.6103 21.8231 11.7766C21.8517 11.9015 21.8517 12.0985 21.8231 12.2234C21.785 12.3897 21.7169 12.4975 21.5807 12.7132C20.4553 14.4952 17.1054 19 12.0004 19C6.8954 19 3.54553 14.4952 2.42012 12.7132Z"
        stroke="#e30613"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.0004 15C13.6572 15 15.0004 13.6569 15.0004 12C15.0004 10.3431 13.6572 9 12.0004 9C10.3435 9 9.00037 10.3431 9.00037 12C9.00037 13.6569 10.3435 15 12.0004 15Z"
        stroke="#e30613"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.7429 5.09232C11.1494 5.03223 11.5686 5 12.0004 5C17.1054 5 20.4553 9.50484 21.5807 11.2868C21.7169 11.5025 21.785 11.6103 21.8231 11.7767C21.8517 11.9016 21.8517 12.0987 21.8231 12.2236C21.7489 12.3899 21.7164 12.4985 21.5792 12.7156C21.2793 13.1901 20.8222 13.8571 20.2165 14.5805M6.72432 6.71504C4.56225 8.1817 3.09445 10.2194 2.42012 11.2868C2.28428 11.5025 2.21584 11.6103 2.17772 11.7767C2.14909 11.9016 2.14909 12.0987 2.17772 12.2236C2.21584 12.3899 2.28394 12.4977 2.42012 12.7134C3.54553 14.4954 6.89541 19 12.0004 19C14.0588 19 15.8319 18.2676 17.2888 17.2772M3.00042 3L21.0004 21M9.8791 9.87868C9.3362 10.4216 9.00042 11.1716 9.00042 12C9.00042 13.6569 10.3436 15 12.0004 15C12.8288 15 13.5788 14.6642 14.1217 14.1213"
        stroke="#e30613"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// 🟢 O TEU COMPONENTE ORIGINAL IDENTICO (Nenhuma classe ou estrutura alterada)
function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
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

      sessionStorage.setItem("adminToken", data.token);
      sessionStorage.setItem("adminData", JSON.stringify(data.admin));

      document.cookie = `adminToken=${data.token}; path=/; SameSite=Strict`;
      localStorage.setItem("token_admin", data.token);

      const redirectTo = searchParams.get("redirect") || "/";
      window.location.href = redirectTo;
    } catch {
      setError("Não foi possível conectar ao servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.page}>
      <div className={styles.bg}>
        <div className={styles.bgGlow} />
        <div className={styles.bgGrid} />
      </div>

      <div className={styles.card}>
        <div className={styles.logoWrap}>
          <Image
            src="/MenuLogo.webp"
            alt="ConsigaCred"
            width={140}
            height={48}
            style={{ objectFit: "contain" }}
          />
        </div>

        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          Área restrita — somente administradores
        </div>

        <h1 className={styles.title}>Acesso Admin</h1>
        <p className={styles.subtitle}>
          Entre com suas credenciais para acessar o painel.
        </p>

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
                {showPass ? <EyeOffIcon /> : <EyeOpenIcon />}
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
            {loading ? <span className={styles.spinner} /> : "Entrar no painel"}
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

// 🟢 O EXPORT PRINCIPAL QUE RESOLVE O BUG DA VERCEL SEM ALTERAR O TEU LAYOUT
export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginContent />
    </Suspense>
  );
}