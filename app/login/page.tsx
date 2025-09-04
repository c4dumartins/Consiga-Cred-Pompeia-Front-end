"use client";
import React, { useState } from "react";
import styles from "./login.module.css";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    setMessage(data.message || data.error);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <img src="/logo.png" alt="Consiga Cred" className={styles.logo} />
      </header>

      <div className={styles.card}>
        <h2 className={styles.title}>Login</h2>

        <form className={styles.form} onSubmit={handleLogin}>
          <label className={styles.label}>Nome:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.input}
          />

          <label className={styles.label}>Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />

          <button type="submit" className={styles.button}>LOGIN</button>
        </form>

        {message && <p style={{ marginTop: "10px" }}>{message}</p>}

        <a href="#" className={styles.link}>Não tenho cadastro</a>
      </div>
    </div>
  );
}
