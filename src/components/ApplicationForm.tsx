'use client';

import { useState } from 'react';
import { Course } from '../types';
import styles from '../styles/Home.module.css';

interface ApplicationFormProps {
  course?: Course;
  onClose: () => void;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({ 
  course, 
  onClose 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Використовуємо courseName замість courseTitle для сумісності з API
      const requestBody = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        message: formData.message?.trim() || null,
        courseName: course?.title || 'Невідомий курс' // Зміна тут
      };

      console.log('Відправляємо дані:', requestBody);

      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || `Помилка ${response.status}`);
      }

      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      
    } catch (error) {
      console.error('Error submitting application:', error);
      alert(`Сталася помилка при відправці форми: ${error instanceof Error ? error.message : 'Невідома помилка'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <div className={styles.successMessage}>
            <div className={styles.successIcon}>✓</div>
            <h3>Заявку успішно відправлено!</h3>
            <p>
              Дякуємо за вашу заявку на курс <strong>&quot;{course?.title || 'Невідомий курс'}&quot;</strong>. 
              Ми зв&apos;яжемося з вами найближчим часом для підтвердження.
            </p>
            <button 
              onClick={onClose}
              className={styles.successButton}
            >
              Зрозуміло
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.headerModal}>
          <h2>Заявка на курс</h2>
          <button 
            type="button"
            onClick={onClose} 
            className={styles.closeButton}
            disabled={isSubmitting}
          >
            ×
          </button>
        </div>

        {course && (
          <div className={styles.courseInfo}>
            <h3>{course.title}</h3>
            <div className={styles.courseDetails}>
              <span className={styles.courseLevel}>{course.level}</span>
              <span className={styles.courseDuration}>{course.duration}</span>
              <span className={styles.coursePrice}>{course.price}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formFields}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Повне ім&apos;я *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Введіть ваше повне ім'я"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">Email адреса *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="phone">Номер телефону *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="+380 (XX) XXX-XX-XX"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message">Додаткові питання або коментарі</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder="Розкажіть про ваш досвід або поставте питання..."
              />
            </div>
          </div>

          <div className={styles.formActions}>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelButton}
              disabled={isSubmitting}
            >
              Скасувати
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Відправка...' : 'Відправити заявку'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplicationForm;