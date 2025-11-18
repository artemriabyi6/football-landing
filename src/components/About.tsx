import styles from '../styles/Home.module.css';

const About: React.FC = () => {
  return (
    <section id="about" className={styles.about}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Про мене</h2>
        <div className={styles.aboutContent}>
          <div className={styles.aboutText}>
            <p>
              Маю понад 10 років досвіду в професійному футболі. 
              Спеціалізуюсь на індивідуальній підготовці гравців, 
              розвитку технічних навичок та футбольного інтелекту.
            </p>
            <ul className={styles.aboutList}>
              <li>📚 Ліцензія UEFA Pro</li>
              <li>⚽ Досвід роботи з молоддю та професіоналами</li>
              <li>🏆 Переможець національних чемпіонатів</li>
              <li>🎯 Індивідуальний підхід до кожного гравця</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;