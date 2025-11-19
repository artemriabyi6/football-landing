'use client';

import { useState } from 'react';
import { ContactFormData } from '../types';
import styles from '../styles/Home.module.css';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    course: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const courses = [
    'Фундаментальна техніка',
    'Просунута техніка',
    'Професійна підготовка',
    'Воротарська майстерність',
    'Фізична підготовка',
    'Тактичний інтелект'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Додамо лог для дебагу
    console.log('Form data being sent:', {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      courseName: formData.course,
      source: 'contact-form'
    });

    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          courseName: formData.course, // Змінимо на courseName
          source: 'contact-form'
        }),
      });

      const responseData = await response.json();
      console.log('API Response:', responseData);

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          course: ''
        });
      } else {
        console.error('Application error:', responseData);
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Network error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Записатися на тренування</h2>
        
        {submitStatus === 'success' && (
          <div className={styles.successMessage}>
            <h3>✅ Заявку успішно відправлено!</h3>
            <p>Ми зв&apos;яжемося з вами найближчим часом для підтвердження запису.</p>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className={styles.errorMessage}>
            <p>❌ Помилка при відправці заявки. Спробуйте ще раз або зв&apos;яжіться з нами безпосередньо.</p>
          </div>
        )}

        <div className={styles.contactContent}>
          {/* <button 
  type="button" 
  onClick={() => {
    setFormData({
      name: 'Тестовий Користувач',
      email: 'test@example.com',
      phone: '+380991234567',
      message: 'Тестове повідомлення',
      course: 'Фундаментальна техніка'
    })
  }}
  style={{ marginBottom: '1rem', background: '#6b7280' }}
>
  Заповнити тестові дані
</button> */}
          <form onSubmit={handleSubmit} className={styles.contactForm}>
            <div className={styles.formGroup}>
              <input
                type="text"
                name="name"
                placeholder="Ваше ім&apos;я *"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </div>

            <div className={styles.formGroup}>
              <input
                type="email"
                name="email"
                placeholder="Email *"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </div>

            <div className={styles.formGroup}>
              <input
                type="tel"
                name="phone"
                placeholder="Телефон *"
                value={formData.phone}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </div>

            <div className={styles.formGroup}>
              <select 
                name="course" 
                value={formData.course}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className={styles.courseSelect}
              >
                <option value="">Оберіть курс *</option>
                {courses.map((course, index) => (
                  <option key={index} value={course}>
                    {course}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <textarea
                name="message"
                placeholder="Ваше повідомлення (необов&apos;язково)"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>
          
            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Відправка...' : 'Надіслати заявку'}
            </button>
          </form>

          <div className={styles.contactInfo}>
            <h3>Контактна інформація</h3>
            <p>📞 +38 (099) 123-45-67</p>
            <p>📧 coach@footballpro.com</p>
            <p>📍 Київ, Україна</p>
            
            <div className={styles.contactHours}>
              <h4>Графік роботи</h4>
              <p>Пн-Пт: 9:00 - 20:00</p>
              <p>Сб-Нд: 10:00 - 18:00</p>
            </div>

            <div className={styles.contactNote}>
              <p>Або просто зателефонуйте нам - ми з радістю відповімо на всі ваші запитання!</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;