import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import styles from './Navigation.module.css';
import logo from '../assets/logo_design_to_use.png';

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

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
    setMobileMenuOpen(false);
  }, [isScrolling]);

  const handleNavClick = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  return (
    <nav className={styles.nav}>
      {/* Subtle Floating Logo */}
      <motion.div
        className={styles.navFloatingLogo}
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: 0.05, scale: 1 }}
        transition={{ 
          duration: 3, 
          delay: 1,
          ease: [0.25, 0.1, 0.25, 1]
        }}
        whileHover={{ 
          scale: 1.1,
          opacity: 0.08,
          transition: { duration: 0.3 }
        }}
      >
        <img src={logo} alt="بصمة الأرض" className={styles.navFloatingLogoImage} />
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
          <a href="#services" onClick={(e) => scrollToSection('services', e)}>الخدمات</a>
          <a href="#projects" onClick={(e) => scrollToSection('projects', e)}>لماذا نحن</a>
          <a href="#about" onClick={(e) => scrollToSection('about', e)}>من نحن</a>
          <a href="#contact" onClick={(e) => scrollToSection('contact', e)}>تواصل معنا</a>
        </div>

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
              <a href="#services" onClick={(e) => scrollToSection('services', e)}>الخدمات</a>
              <a href="#projects" onClick={(e) => scrollToSection('projects', e)}>لماذا نحن</a>
              <a href="#about" onClick={(e) => scrollToSection('about', e)}>من نحن</a>
              <a href="#contact" onClick={(e) => scrollToSection('contact', e)}>تواصل معنا</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;

