import styles from "./page.module.css";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className={styles.container}>
        {/* Hero com 3 blocos */}
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
            <button className={styles.btnRed}>Entre em contato</button>
          </div>
        </section>

        {/* Sobre Nós */}
        <section id="sobre" className={styles.sobre}>
          <h2>
            Sobre <span className={styles.nos}>Nós</span>
          </h2>
          <div className={styles.boxGrande}></div>
        </section>
      </main>
    </>
  );
}
