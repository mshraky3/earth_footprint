import React, { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Footer.module.css';
import logo from '../assets/logo_design_to_use.webp';
import { scrollToSection } from '../utils/scrollUtils';
import { useLanguage } from '../contexts/LanguageContext';

const Footer = () => {
  const [isScrolling, setIsScrolling] = useState(false);
  const { t } = useLanguage();
  
  const handleScrollToSection = useCallback((sectionId) => {
    return scrollToSection(sectionId, () => isScrolling, setIsScrolling);
  }, [isScrolling]);

  return (
    <footer className={styles.footer}>
      <div className="container">
        {/* Optimized Floating Logo */}
        <motion.div
          className={styles.footerFloatingLogo}
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 0.06, scale: 1 }}
          transition={{ 
            duration: 1.5, 
            delay: 0.2,
            ease: [0.25, 0.1, 0.25, 1]
          }}
          viewport={{ once: true }}
        >
          <img src={logo} alt="بصمة الأرض" className={styles.footerFloatingLogoImage} loading="lazy" />
        </motion.div>

        <div className={styles.footerContent}>
          <div className={styles.footerLogo}>
            <img src={logo} alt="بصمة الأرض" className={styles.logoImage} />
            <span className={styles.logoText}>{t('common.brandName')}</span>
          </div>
          <p className={styles.footerText}>
            {t('footer.description')}
          </p>
          <div className={styles.footerLinks}>
            <a href="#services" onClick={handleScrollToSection('services')}>{t('nav.services')}</a>
            <a href="#projects" onClick={handleScrollToSection('projects')}>{t('nav.whyUs')}</a>
            <a href="#about" onClick={handleScrollToSection('about')}>{t('nav.about')}</a>
            <a href="#numbers" onClick={handleScrollToSection('numbers')}>{t('nav.numbers')}</a>
            <a href="#clients" onClick={handleScrollToSection('clients')}>{t('nav.clients')}</a>
            <a href="#contact" onClick={handleScrollToSection('contact')}>{t('nav.contact')}</a>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>&copy; {new Date().getFullYear()} {t('common.brandName')}. {t('footer.copyright')}</p>
          <p className={styles.nationalNumber}>{t('footer.nationalNumber')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

