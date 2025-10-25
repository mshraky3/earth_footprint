import React, { useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Leaf, ArrowLeft, CheckCircle, Globe, Award } from 'lucide-react';
import styles from './Hero.module.css';
import logo from '../assets/logo_design_to_use.webp';
import { useLanguage } from '../contexts/LanguageContext';

const Hero = () => {
  const { t } = useLanguage();
  
  const scrollToContact = useCallback(() => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const stats = useMemo(() => [
    { 
      number: "20+", 
      label: t('hero.stats.experience'), 
      icon: <Award size={22} />,
      color: "#2d5a27",
      delay: 1.0
    },
    { 
      number: "400+", 
      label: t('hero.stats.projects'), 
      icon: <CheckCircle size={22} />,
      color: "#0369a1",
      delay: 1.1
    },
    { 
      number: "9", 
      label: t('hero.stats.regions'), 
      icon: <Globe size={22} />,
      color: "#0ea5e9",
      delay: 1.2
    }
  ], [t]);

  return (
    <section className={styles.hero} id="home" role="banner" aria-label="الصفحة الرئيسية">
      {/* Optimized Background */}
      <div className={styles.heroBackground}>
        <div className={styles.gradientWaves}>
          <motion.div 
            className={`${styles.wave} ${styles.wave1}`}
            animate={{ 
              rotate: [0, 360]
            }}
            transition={{ 
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ willChange: 'transform' }}
          />
        </div>
      </div>
      
      <div className={styles.heroContent}>
        {/* Main Content Card */}
        <motion.div
          className={styles.heroMainCard}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.div
            className={styles.heroBadge}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Leaf size={18} />
            <span>{t('hero.badge')}</span>
          </motion.div>

          <motion.h1 
            className={styles.heroTitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            itemProp="name"
          >
            <motion.span 
              className={`${styles.titleWord} ${styles.brandNameText}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {t('hero.brandName')}
            </motion.span>
            <motion.span 
              className={`${styles.titleWord} ${styles.gradientText} ${styles.environmentalText}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              
            </motion.span>
            <motion.span 
              className={`${styles.titleWord} ${styles.accentText}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {t('hero.subtitle')}
            </motion.span>
          </motion.h1>

          <motion.p 
            className={styles.heroSubtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            itemProp="description"
          >
            {t('hero.description')}
          </motion.p>

          <motion.div 
            className={styles.heroCtaSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <div className={styles.heroButtons}>
              <button 
                className={`${styles.btnPrimary} ${styles.btnCta}`}
                onClick={scrollToContact}
              >
                <span>{t('hero.cta')}</span>
                <ArrowLeft size={20} />
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* Floating Stats Cards */}
        <div className={styles.floatingStats}>
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className={`${styles.statCard} ${styles[`statCard${index + 1}`]}`}
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: stat.delay,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              whileHover={{ 
                y: -8,
                scale: 1.03,
                transition: { duration: 0.2, ease: "easeOut" }
              }}
            >
              <motion.div 
                className={styles.statIcon}
                animate={{ 
                  rotate: [0, 10, -10, 0],
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.3
                }}
                style={{ willChange: 'transform' }}
              >
                {stat.icon}
              </motion.div>
              <div className={styles.statContent}>
                <div className={styles.statNumber}>{stat.number}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
              <motion.div 
                className={styles.statGlow}
                animate={{ 
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{ 
                  background: `radial-gradient(circle, ${stat.color}40, transparent)`,
                  willChange: 'opacity'
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;

