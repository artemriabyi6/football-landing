'use client';

import { useRef } from 'react';
import styles from '../styles/Home.module.css';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  const scrollToCourses = () => {
    const coursesSection = document.getElementById('courses');
    coursesSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={styles.hero} ref={heroRef}>
      {/* Background Elements */}
      <div className={styles.heroBackground}>
        <div className={styles.heroShape1}></div>
        <div className={styles.heroShape2}></div>
        <div className={styles.heroShape3}></div>
        <div className={styles.heroGrid}></div>
      </div>

      <div className={styles.container}>
        <div className={styles.heroContent}>
          {/* Badge */}
          <div className={styles.heroBadge}>
            <span>⚽ Професійний підхід</span>
          </div>

          {/* Main Title */}
          <h1 className={styles.heroTitle}>
            Розкрий свій
            <span className={styles.heroTitleAccent}> потенціал</span>
            <br />
            у футболі
          </h1>

          {/* Subtitle */}
          <p className={styles.heroSubtitle}>
            Індивідуальні тренування з професійним тренером для гравців будь-якого рівня. 
            Від початківця до професіонала - ми допоможемо досягти ваших цілей.
          </p>

          {/* Stats */}
          <div className={styles.heroStats}>
            <div className={styles.heroStat}>
              <span className={styles.statNumber}>10+</span>
              <span className={styles.statLabel}>років досвіду</span>
            </div>
            <div className={styles.heroStat}>
              <span className={styles.statNumber}>200+</span>
              <span className={styles.statLabel}>учнів</span>
            </div>
            <div className={styles.heroStat}>
              <span className={styles.statNumber}>6</span>
              <span className={styles.statLabel}>напрямків</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className={styles.heroButtons}>
            <button 
              className={styles.ctaButtonPrimary}
              onClick={scrollToCourses}
            >
              <span>Переглянути курси</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button 
              className={styles.ctaButtonSecondary}
              onClick={scrollToContact}
            >
              Безкоштовна консультація
            </button>
          </div>

          {/* Trust Indicators */}
          <div className={styles.trustIndicators}>
            <div className={styles.trustItem}>
              <div className={styles.trustIcon}>🎯</div>
              <span>Індивідуальний підхід</span>
            </div>
            <div className={styles.trustItem}>
              <div className={styles.trustIcon}>📈</div>
              <span>Гарантія результату</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;