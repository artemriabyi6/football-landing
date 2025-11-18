import styles from '../styles/Home.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>&copy; 2024 FootballPro. Всі права захищені.</p>
      </div>
    </footer>
  );
};

export default Footer;