import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import styles from './Navigation.module.css';
import logo from '../assets/logo_design_to_use.png';
import { scrollToSection } from '../utils/scrollUtils';
import { useLanguage } from '../contexts/LanguageContext';

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const handleScrollToSection = useCallback((sectionId) => {
    return scrollToSection(sectionId, () => isScrolling, setIsScrolling);
  }, [isScrolling]);

  const handleNavClick = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  return (
    <nav className={styles.nav}>
      {/* Optimized Floating Logo */}
      <motion.div
        className={styles.navFloatingLogo}
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: 0.03, scale: 1 }}
        transition={{ 
          duration: 2, 
          delay: 0.5,
          ease: [0.25, 0.1, 0.25, 1]
        }}
      >
        <img src={logo} alt="بصمة الأرض" className={styles.navFloatingLogoImage} loading="lazy" />
      </motion.div>

      <motion.div 
        className={styles.navContainer}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <motion.div 
          className={styles.navLogo}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
        >
          <img src={logo} alt="بصمة الأرض" className={styles.logoImage} loading="eager" />
          <span className={styles.logoText}>بصمة الأرض</span>
        </motion.div>

        {/* Desktop Navigation */}
        <div className={`${styles.navLinks} ${styles.desktopNav}`}>
          <a href="#services" onClick={handleScrollToSection('services')}>{t('nav.services')}</a>
          <a href="#projects" onClick={handleScrollToSection('projects')}>{t('nav.whyUs')}</a>
          <a href="#about" onClick={handleScrollToSection('about')}>{t('nav.about')}</a>
          <a href="#numbers" onClick={handleScrollToSection('numbers')}>{t('nav.numbers')}</a>
          <a href="#clients" onClick={handleScrollToSection('clients')}>{t('nav.clients')}</a>
          <a href="#contact" onClick={handleScrollToSection('contact')}>{t('nav.contact')}</a>
        </div>

        {/* Language Toggle Button */}
        <motion.button
          className={styles.languageToggle}
          onClick={toggleLanguage}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title={language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
        >
          <Globe size={20} />
          <span>{language === 'ar' ? 'EN' : 'عربي'}</span>
        </motion.button>

        {/* Mobile Menu Button */}
        <button 
          className={styles.mobileMenuButton}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className={styles.mobileMenuLinks}>
              <a href="#services" onClick={handleScrollToSection('services')}>{t('nav.services')}</a>
              <a href="#projects" onClick={handleScrollToSection('projects')}>{t('nav.whyUs')}</a>
              <a href="#about" onClick={handleScrollToSection('about')}>{t('nav.about')}</a>
              <a href="#numbers" onClick={handleScrollToSection('numbers')}>{t('nav.numbers')}</a>
              <a href="#clients" onClick={handleScrollToSection('clients')}>{t('nav.clients')}</a>
              <a href="#contact" onClick={handleScrollToSection('contact')}>{t('nav.contact')}</a>
              
              {/* Language Toggle in Mobile Menu */}
              <button
                className={styles.mobileLanguageToggle}
                onClick={toggleLanguage}
              >
                <Globe size={18} />
                <span>{language === 'ar' ? 'English' : 'العربية'}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;

