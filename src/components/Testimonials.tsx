import { Testimonial } from '../types';
import styles from '../styles/Home.module.css';

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Андрій Коваленко',
    position: 'Гравець U-19',
    text: 'Завдяки індивідуальним тренуванням значно покращив свою техніку та отримав запрошення в молодіжну команду.',
    rating: 5
  },
  {
    id: 2,
    name: 'Марія Петренко',
    position: 'Батько гравця',
    text: 'Професійний підхід та увага до деталей. Сину дуже подобаються заняття, прогрес очевидний.',
    rating: 5
  },
  {
    id: 3,
    name: 'Олексій Шевченко',
    position: 'Аматор',
    text: 'Після місяця тренувань почуваюся впевненіше на полі, покращив контроль м"яча та точність ударів.',
    rating: 5
  }
];

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className={styles.testimonials}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Відгуки</h2>
        <div className={styles.testimonialsGrid}>
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className={styles.testimonialCard}>
              <div className={styles.rating}>
                {'★'.repeat(testimonial.rating)}
              </div>
              <p>&quot;{testimonial.text}&quot;</p>
              <div className={styles.testimonialAuthor}>
                <strong>{testimonial.name}</strong>
                <span>{testimonial.position}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;