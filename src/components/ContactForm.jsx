import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { emailService } from '../services/emailService';
import styles from './ContactForm.module.css';

const ContactForm = () => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    jobTitle: '',
    officeName: '',
    service: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success', 'error', null

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus(null);

    try {
      await emailService.sendContactEmail({
        ...formData,
        language
      });
      
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', jobTitle: '', officeName: '', service: '', message: '' });
    } catch (error) {
      setStatus('error');
      console.error('Form submission error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className={styles.contactForm}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            {t('contactForm.name')} *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={styles.input}
            placeholder={t('contactForm.namePlaceholder')}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            {t('contactForm.email')} *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={styles.input}
            placeholder={t('contactForm.emailPlaceholder')}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="phone" className={styles.label}>
            {t('contactForm.phone')}
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={styles.input}
            placeholder={t('contactForm.phonePlaceholder')}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="jobTitle" className={styles.label}>
            {t('contactForm.jobTitle')} *
          </label>
          <input
            type="text"
            id="jobTitle"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            required
            className={styles.input}
            placeholder={t('contactForm.jobTitlePlaceholder')}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="officeName" className={styles.label}>
            {t('contactForm.officeName')} *
          </label>
          <input
            type="text"
            id="officeName"
            name="officeName"
            value={formData.officeName}
            onChange={handleChange}
            required
            className={styles.input}
            placeholder={t('contactForm.officeNamePlaceholder')}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="service" className={styles.label}>
            {t('contactForm.service')}
          </label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="">{t('contactForm.servicePlaceholder')}</option>
            <option value="permits">{t('services.permits.title')}</option>
            <option value="reports">{t('services.reports.title')}</option>
            <option value="assessment">{t('services.assessment.title')}</option>
            <option value="audit">{t('services.audit.title')}</option>
            <option value="management">{t('services.management.title')}</option>
            <option value="rehabilitation">{t('services.rehabilitation.title')}</option>
            <option value="consulting">{t('services.consulting.title')}</option>
            <option value="mawan">{t('services.mawan.title')}</option>
            <option value="other">{t('contactForm.otherService')}</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="message" className={styles.label}>
            {t('contactForm.message')} *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className={styles.textarea}
            placeholder={t('contactForm.messagePlaceholder')}
          />
        </div>

        <motion.button
          type="submit"
          disabled={isLoading}
          className={`${styles.submitButton} ${isLoading ? styles.loading : ''}`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          {isLoading ? (
            <>
              <Loader size={20} className={styles.spinner} />
              {t('contactForm.sending')}
            </>
          ) : (
            <>
              <Send size={20} />
              {t('contactForm.send')}
            </>
          )}
        </motion.button>

        {status === 'success' && (
          <motion.div
            className={styles.statusMessage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            <CheckCircle size={20} />
            <span>{t('contactForm.successMessage')}</span>
          </motion.div>
        )}

        {status === 'error' && (
          <motion.div
            className={`${styles.statusMessage} ${styles.error}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            <AlertCircle size={20} />
            <span>{t('contactForm.errorMessage')}</span>
          </motion.div>
        )}
      </form>
    </motion.div>
  );
};

export default ContactForm;
