"use client";

import styles from './ProdutosPage.module.css';

const productsData = [
  {
    title: 'FGTS',
    description: [
      'Antecipe seu saque-aniversário do FGTS.',
      'Crédito rápido, fácil e sem burocracia.',
      'Disponível para negativados.'
    ],
    selected: true
  },
  {
    title: 'Empréstimo Consignado',
    description: [
      'As melhores taxas para você.',
      'Desconto direto na folha de pagamento.',
      'Segurança e praticidade.'
    ],
    selected: false
  },
  {
    title: 'INSS',
    description: [
      'Crédito para aposentados e pensionistas.',
      'Liberação rápida do dinheiro na sua conta.',
      'Contrate online com total segurança.'
    ],
    selected: false
  }
];

function ProdutosPage() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>
        NOSSOS <span className={styles.titleHighlight}>Produtos</span>
      </h1>

      <div className={styles.cardsContainer}>
        {productsData.map((product, index) => (
          <div 
            key={index} 
            className={`${styles.card} ${product.selected ? styles.selected : ''}`}
          >
            <h2 className={styles.cardTitle}>{product.title}</h2>
            {product.description.map((line, lineIndex) => (
              <p key={lineIndex} className={styles.cardText}>
                {line}
              </p>
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}

export default ProdutosPage;
