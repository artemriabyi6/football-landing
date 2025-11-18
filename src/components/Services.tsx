import { Service } from '../types';
import styles from '../styles/Home.module.css';

const services: Service[] = [
  {
    id: 1,
    title: 'Індивідуальні тренування',
    description: 'Персональні заняття з урахуванням ваших цілей та рівня підготовки',
    icon: '⚽'
  },
  {
    id: 2,
    title: 'Групова підготовка',
    description: 'Тренування в малих групах для розвитку командних якостей',
    icon: '👥'
  },
  {
    id: 3,
    title: 'Технічна підготовка',
    description: 'Вдосконалення контролю м"яча, пасу та ударів',
    icon: '🎯'
  },
  {
    id: 4,
    title: 'Фізична підготовка',
    description: 'Розвиток швидкості, витривалості та сили',
    icon: '💪'
  }
];

const Services: React.FC = () => {
  return (
    <section id="services" className={styles.services}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Послуги</h2>
        <div className={styles.servicesGrid}>
          {services.map((service) => (
            <div key={service.id} className={styles.serviceCard}>
              <div className={styles.serviceIcon}>{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;