"use client";

import { useState, useEffect } from "react";
import styles from "./Hero.module.css";

interface Slide {
  image: string;
  title?: string;
}

interface HeroProps {
  slides: Slide[];
  autoplayInterval?: number;
}

export default function Hero({ slides, autoplayInterval = 5000 }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsTransitioning(false), 800);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsTransitioning(false), 800);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 800);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, autoplayInterval);
    return () => clearInterval(timer);
  }, [currentSlide, autoplayInterval]);

  return (
    <section className={styles.hero}>
      <div className={styles.slidesContainer}>
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`${styles.slide} ${idx === currentSlide ? styles.active : ""}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className={styles.overlay} />
          </div>
        ))}
      </div>

      {/* Navegação */}
      <div className={styles.navigation}>
        <button
          className={styles.navBtn}
          onClick={prevSlide}
          aria-label="Slide anterior"
          disabled={isTransitioning}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button
          className={styles.navBtn}
          onClick={nextSlide}
          aria-label="Próximo slide"
          disabled={isTransitioning}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Indicadores */}
      <div className={styles.indicators}>
        {slides.map((_, idx) => (
          <button
            key={idx}
            className={`${styles.indicator} ${idx === currentSlide ? styles.indicatorActive : ""}`}
            onClick={() => goToSlide(idx)}
            aria-label={`Ir para slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className={styles.scrollIndicator}>
        <div className={styles.mouse}>
          <div className={styles.wheel} />
        </div>
        <span>Role para explorar</span>
      </div>
    </section>
  );
}