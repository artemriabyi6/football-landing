'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Course } from '../types';
import styles from '../styles/CourseDetail.module.css';

interface CourseDetailProps {
  course: Course;
}

const CourseDetail: React.FC<CourseDetailProps> = ({ course }) => {
  const [activeTab, setActiveTab] = useState('about');

  // Додайте перевірку на наявність курсу
  if (!course) {
    return (
      <div className={styles.container}>
        <div className={styles.errorState}>
          <h2>Курс не знайдено</h2>
          <p>На жаль, запрошений курс не існує або був видалений.</p>
          <Link href="/#courses" className={styles.backLink}>
            Повернутися до всіх курсів
          </Link>
        </div>
      </div>
    );
  }

  const getLevelColor = (level: string) => {
    const colors = {
      'Початковий': '#10b981',
      'Середній': '#3b82f6',
      'Просунутий': '#8b5cf6',
      'Всі рівні': '#6b7280',
      'Середній+': '#f59e0b'
    };
    return colors[level as keyof typeof colors] || '#6b7280';
  };

  return (
    <div className={styles.container}>
      {/* Header Navigation */}
      <nav className={styles.nav}>
        <Link href="/#courses" className={styles.backLink}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Назад до курсів
        </Link>
      </nav>

      {/* Course Header */}
      <header className={styles.courseHeader}>
        <div className={styles.courseIconContainer}>
          <div className={styles.courseIcon}>{course.icon || '⚽'}</div>
        </div>
        <div className={styles.courseInfo}>
          <div className={styles.courseMeta}>
            <span 
              className={styles.courseLevel}
              style={{ backgroundColor: getLevelColor(course.level) }}
            >
              {course.level}
            </span>
            <span className={styles.courseDuration}>⏱️ {course.duration}</span>
          </div>
          <h1 className={styles.courseTitle}>{course.title}</h1>
          <p className={styles.courseDescription}>{course.description}</p>
        </div>
      </header>

      {/* Main Content */}
      <div className={styles.content}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.enrollmentCard}>
            <div className={styles.priceSection}>
              <span className={styles.price}>{course.price}</span>
              <span className={styles.priceNote}>за курс</span>
            </div>
            
            <div className={styles.detailsList}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Інструктор:</span>
                <span className={styles.detailValue}>{course.instructor || 'Не вказано'}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Розклад:</span>
                <span className={styles.detailValue}>{course.schedule || 'Не вказано'}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Макс. студентів:</span>
                <span className={styles.detailValue}>{course.maxStudents || 'Не вказано'}</span>
              </div>
            </div>

            <button className={styles.enrollButton}>
              Записатися на курс
            </button>
            
            <Link href="/#contact" className={styles.contactLink}>
              Маєте питання? Напишіть нам
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className={styles.main}>
          {/* Tabs */}
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${activeTab === 'about' ? styles.tabActive : ''}`}
              onClick={() => setActiveTab('about')}
            >
              Про курс
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'curriculum' ? styles.tabActive : ''}`}
              onClick={() => setActiveTab('curriculum')}
            >
              Програма
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'requirements' ? styles.tabActive : ''}`}
              onClick={() => setActiveTab('requirements')}
            >
              Вимоги
            </button>
          </div>

          {/* Tab Content */}
          <div className={styles.tabContent}>
            {activeTab === 'about' && (
              <div className={styles.tabPanel}>
                <h3>Опис курсу</h3>
                <p>{course.fullDescription || course.description}</p>
                
                <div className={styles.featuresGrid}>
                  {course.features.map((feature, index) => (
                    <div key={index} className={styles.featureCard}>
                      <div className={styles.featureIcon}>✓</div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'curriculum' && (
              <div className={styles.tabPanel}>
                <h3>Навчальна програма</h3>
                <div className={styles.curriculumList}>
                  {(course.curriculum || ['Програма ще формується']).map((item, index) => (
                    <div key={index} className={styles.curriculumItem}>
                      <span className={styles.lessonNumber}>{index + 1}</span>
                      <span className={styles.lessonTitle}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'requirements' && (
              <div className={styles.tabPanel}>
                <h3>Вимоги до студентів</h3>
                <div className={styles.requirementsList}>
                  {(course.requirements || ['Вимоги не вказані']).map((requirement, index) => (
                    <div key={index} className={styles.requirementItem}>
                      <div className={styles.requirementDot}></div>
                      <span>{requirement}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CourseDetail;