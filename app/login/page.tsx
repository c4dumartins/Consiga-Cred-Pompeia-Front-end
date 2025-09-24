import React, { useState } from 'react';
import styles from './login.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
      });
      const data = await response.json();
      setMensagem(data.message || 'Usuário registrado!');
    } catch (error) {
      setMensagem('Erro ao registrar usuário.');
    }
  };

  return (
    <div>
      <form onSubmit={handleRegister}>
        <input
          className={styles.input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          className={styles.input}
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          required
        />
        <button className={styles.button} type="submit">
          Registrar
        </button>
      </form>
      {mensagem && <div>{mensagem}</div>}
    </div>
  );
}