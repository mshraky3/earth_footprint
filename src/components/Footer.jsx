import React, { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Footer.module.css';
import logo from '../assets/logo_design_to_use.png';

const Footer = () => {
  const [isScrolling, setIsScrolling] = useState(false);
  
  const scrollToSection = useCallback((sectionId, e) => {
    e.preventDefault();
    
    // Prevent multiple scroll animations
    if (isScrolling) return;
    
    const element = document.getElementById(sectionId);
    if (element) {
      setIsScrolling(true);
      const navHeight = 100; // Account for fixed navigation height
      const targetPosition = element.offsetTop - navHeight;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 1200; // Slower duration (1.2 seconds)
      let start = null;

      // Easing function for smooth animation
      const easeInOutCubic = (t) => {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
      };

      const animation = (currentTime) => {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);
        const easedProgress = easeInOutCubic(progress);
        
        window.scrollTo(0, startPosition + distance * easedProgress);
        
        if (progress < 1) {
          requestAnimationFrame(animation);
        } else {
          setIsScrolling(false);
        }
      };

      requestAnimationFrame(animation);
    }
  }, [isScrolling]);

  return (
    <footer className={styles.footer}>
      <div className="container">
        {/* Floating Logo */}
        <motion.div
          className={styles.footerFloatingLogo}
          initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
          whileInView={{ opacity: 0.08, scale: 1, rotate: 0 }}
          transition={{ 
            duration: 2, 
            delay: 0.3,
            ease: [0.25, 0.1, 0.25, 1]
          }}
          viewport={{ once: true }}
          whileHover={{ 
            scale: 1.1,
            opacity: 0.15,
            transition: { duration: 0.3 }
          }}
        >
          <img src={logo} alt="بصمة الأرض" className={styles.footerFloatingLogoImage} />
        </motion.div>

        <div className={styles.footerContent}>
          <div className={styles.footerLogo}>
            <img src={logo} alt="بصمة الأرض" className={styles.logoImage} />
            <span className={styles.logoText}>بصمة الأرض</span>
          </div>
          <p className={styles.footerText}>
            شريكك البيئي الأول لجميع القطاعات في المملكة
          </p>
          <div className={styles.footerLinks}>
            <a href="#services" onClick={(e) => scrollToSection('services', e)}>الخدمات</a>
            <a href="#projects" onClick={(e) => scrollToSection('projects', e)}>لماذا نحن</a>
            <a href="#about" onClick={(e) => scrollToSection('about', e)}>من نحن</a>
            <a href="#contact" onClick={(e) => scrollToSection('contact', e)}>تواصل معنا</a>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>&copy; {new Date().getFullYear()} بصمة الأرض. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

