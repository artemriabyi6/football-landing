'use client';


import { useState } from 'react';
import styles from '../styles/Home.module.css';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <h2>FootballPro</h2>
        </div>
        <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
          <a href="#about">Про мене</a>
          <a href="#courses">Курси</a>
          <a href="#testimonials">Відгуки</a>
          <a href="#contact">Контакти</a>
        </nav>
        <button 
          className={styles.menuButton}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
      </div>
    </header>
  );
};

export default Header;