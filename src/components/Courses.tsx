'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from '../styles/Home.module.css';
import CourseCard from './CourseCard';

interface Course {
  id: number;
  title: string;
  description: string;
  level: string;
  duration: string;
  price: string;
  features: string[];
  icon: string;
}

const courses: Course[] = [
  {
    id: 1,
    title: 'Фундаментальна техніка',
    description: 'Основи контролю мʼяча, пасів та ударів для початківців',
    level: 'Початковий',
    duration: '8 тижнів',
    price: '₴3,200',
    features: [
      'Контроль мʼяча',
      'Техніка пасів',
      'Основи ударів',
      'Прості комбінації'
    ],
    icon: '🎯'
  },
  {
    id: 2,
    title: 'Просунута техніка',
    description: 'Складні технічні елементи та ігрова практика',
    level: 'Середній',
    duration: '12 тижнів',
    price: '₴4,800',
    features: [
      'Складні обвідки',
      'Точні удари',
      'Ігрова тактика',
      'Групова взаємодія'
    ],
    icon: '⚡'
  },
  {
    id: 3,
    title: 'Професійна підготовка',
    description: 'Інтенсивна програма для майбутніх професіоналів',
    level: 'Просунутий',
    duration: '16 тижнів',
    price: '₴6,400',
    features: [
      'Ігрова інтелект',
      'Тактична підготовка',
      'Фізична витривалість',
      'Ментальна стійкість'
    ],
    icon: '🔥'
  },
  {
    id: 4,
    title: 'Воротарська майстерність',
    description: 'Спеціалізована програма для воротарів усіх рівнів',
    level: 'Всі рівні',
    duration: '10 тижнів',
    price: '₴4,000',
    features: [
      'Техніка відбивання',
      'Позиціонування',
      'Ігри ногами',
      'Керування захистом'
    ],
    icon: '🧤'
  },
  {
    id: 5,
    title: 'Фізична підготовка',
    description: 'Розвиток швидкості, сили та витривалості',
    level: 'Всі рівні',
    duration: '6 тижнів',
    price: '₴2,400',
    features: [
      'Спринтерський тренінг',
      'Силові вправи',
      'Витривалість',
      'Гнучкість'
    ],
    icon: '💪'
  },
  {
    id: 6,
    title: 'Тактичний інтелект',
    description: 'Розвиток футбольного мислення та тактичної обізнаності',
    level: 'Середній+',
    duration: '8 тижнів',
    price: '₴3,600',
    features: [
      'Тактичний аналіз',
      'Позиційна гра',
      'Перехідні фази',
      'Стандартні положення'
    ],
    icon: '🧠'
  }
];

const Courses: React.FC = () => {
  return (
    <section id="courses" className={styles.courses}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>
          Наші Курси
        </h2>
        <p className={styles.sectionSubtitle}>
          Професійні програми тренувань для гравців будь-якого рівня
        </p>
        
        <div className={styles.coursesSwiperWrapper}>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              nextEl: '.courses-swiper-button-next',
              prevEl: '.courses-swiper-button-prev',
            }}
            pagination={{ 
              clickable: true,
              el: '.courses-swiper-pagination',
            }}
            autoplay={{ 
              delay: 5000, 
              disableOnInteraction: false 
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
              1280: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
            }}
            className={styles.coursesSwiper}
          >
            {courses.map((course, index) => (
              <SwiperSlide key={course.id}>
                <CourseCard course={course} index={index} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Кастомні стрілочки */}
          <div className={`${styles.coursesSwiperButton} ${styles.coursesSwiperButtonPrev} courses-swiper-button-prev`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className={`${styles.coursesSwiperButton} ${styles.coursesSwiperButtonNext} courses-swiper-button-next`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* Кастомна пагінація */}
          <div className={`${styles.coursesSwiperPagination} courses-swiper-pagination`}></div>
        </div>
      </div>
    </section>
  );
};

export default Courses;