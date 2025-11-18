'use client';

import { useState } from 'react';
import { ContactFormData } from '../types';
import styles from '../styles/Home.module.css';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Тут буде логіка відправки форми
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Записатися на тренування</h2>
        <div className={styles.contactContent}>
          <form onSubmit={handleSubmit} className={styles.contactForm}>
            <input
              type="text"
              name="name"
              placeholder="Ваше ім'я"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Телефон"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Ваше повідомлення"
              rows={4}
              value={formData.message}
              onChange={handleChange}
            />
            <button type="submit" className={styles.submitButton}>
              Надіслати
            </button>
          </form>
          <div className={styles.contactInfo}>
            <h3>Контактна інформація</h3>
            <p>📞 +38 (099) 123-45-67</p>
            <p>📧 coach@footballpro.com</p>
            <p>📍 Київ, Україна</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;