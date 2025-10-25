import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle, Globe, Users, TrendingUp, Leaf, Building2, Zap, Trash2 } from 'lucide-react';
import styles from './Numbers.module.css';
import logo from '../assets/logo_design_to_use.webp';
import { useLanguage } from '../contexts/LanguageContext';

const Numbers = () => {
  const { t } = useLanguage();
  
  const fadeInUp = useMemo(() => ({
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }), []);

  const staggerContainer = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }), []);

  const stats = [
    {
      icon: Award,
      number: "20+",
      label: t('numbers.stats.experience'),
      description: t('numbers.stats.experienceDesc')
    },
    {
      icon: CheckCircle,
      number: "400+",
      label: t('numbers.stats.projects'),
      description: t('numbers.stats.projectsDesc')
    },
    {
      icon: Globe,
      number: "9",
      label: t('numbers.stats.regions'),
      description: t('numbers.stats.regionsDesc')
    },
    {
      icon: Building2,
      number: "9+",
      label: t('numbers.stats.sectors'),
      description: t('numbers.stats.sectorsDesc')
    }
  ];

  const sectors = [
    { icon: Building2, name: t('numbers.sectors.industry') },
    { icon: Leaf, name: t('numbers.sectors.food') },
    { icon: Zap, name: t('numbers.sectors.advertising') },
    { icon: Users, name: t('numbers.sectors.health') },
    { icon: Globe, name: t('numbers.sectors.water') },
    { icon: Building2, name: t('numbers.sectors.realEstate') },
    { icon: Leaf, name: t('numbers.sectors.agriculture') },
    { icon: Zap, name: t('numbers.sectors.electronics') },
    { icon: Trash2, name: t('numbers.sectors.wasteManagement') }
  ];

  return (
    <section id="numbers" className={styles.numbers}>
      <div className="container">
        {/* Single Optimized Background Logo */}
        <motion.div
          className={styles.backgroundLogoPattern}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.03, scale: 1 }}
          transition={{ 
            duration: 2, 
            delay: 0.5,
            ease: [0.25, 0.1, 0.25, 1]
          }}
        >
          <img src={logo} alt="بصمة الأرض" className={styles.backgroundLogoImage} loading="lazy" />
        </motion.div>

        <motion.div
          className={styles.numbersContent}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Header */}
          <motion.div
            className={styles.header}
            variants={fadeInUp}
          >
            <h2 className={styles.sectionTitle}>{t('numbers.title')}</h2>
          </motion.div>

          {/* Impact Statement */}
          <motion.div
            className={styles.impactStatement}
            variants={fadeInUp}
          >
            <div className={styles.impactContent}>
              {/* Decorative Logo in Impact Statement */}
              <motion.div
                className={styles.impactLogo}
                initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                animate={{ opacity: 0.15, scale: 1, rotate: 0 }}
                transition={{ 
                  duration: 2, 
                  delay: 0.3,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                whileHover={{ 
                  scale: 1.1,
                  opacity: 0.2,
                  transition: { duration: 0.3 }
                }}
              >
                <img src={logo} alt="بصمة الأرض" className={styles.impactLogoImage} />
              </motion.div>
              
              <h3 className={styles.impactTitle}>{t('numbers.impactTitle')}</h3>
              <p className={styles.impactText}>
                {t('numbers.impactText')}
              </p>
            </div>
          </motion.div>

          {/* Statistics Grid */}
          <motion.div
            className={styles.statsGrid}
            variants={staggerContainer}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className={styles.statItem}
                variants={fadeInUp}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
              >
                <div className={styles.statIconContainer}>
                  <stat.icon className={styles.statIcon} />
                </div>
                <div className={styles.statContent}>
                  <div className={styles.statNumber}>{stat.number}</div>
                  <h3 className={styles.statLabel}>{stat.label}</h3>
                  <p className={styles.statDescription}>{stat.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Sectors Section */}
          <motion.div
            className={styles.sectorsSection}
            variants={staggerContainer}
          >
            <motion.div
              className={styles.sectorsHeader}
              variants={fadeInUp}
            >
              <h3 className={styles.sectorsSectionTitle}>{t('numbers.sectors.title')}</h3>
              <p className={styles.sectorsSectionSubtitle}>
                {t('numbers.sectors.subtitle')}
              </p>
            </motion.div>
            
            <motion.div
              className={styles.sectorsIcons}
              variants={staggerContainer}
            >
              {sectors.map((sector, index) => (
                <motion.div
                  key={index}
                  className={styles.sectorItem}
                  variants={fadeInUp}
                  whileHover={{ 
                    scale: 1.1,
                    transition: { duration: 0.2 }
                  }}
                >
                  <sector.icon className={styles.sectorIcon} />
                  <span className={styles.sectorName}>{sector.name}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Numbers;
