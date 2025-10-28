import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, CheckCircle, Globe, Leaf, Users, ChevronDown, ChevronUp } from 'lucide-react';
import styles from './Services.module.css';
import logo from '../assets/logo_design_to_use.webp';
import { useLanguage } from '../contexts/LanguageContext';

const Services = () => {
  const [expandedCards, setExpandedCards] = useState({});
  const { t } = useLanguage();

  const toggleCard = (index) => {
    setExpandedCards(prev => {
      const newState = {};
      
      // If clicking the same card that's already expanded, close it
      if (prev[index]) {
        // Just close the current card, don't open any other
        return {};
      } else {
        // Close all other cards and open the clicked one
        newState[index] = true;
      }
      
      return newState;
    });
    
    // Scroll to center the expanded content section after animation
    setTimeout(() => {
      const cardElement = document.querySelector(`[data-card-index="${index}"]`);
      if (cardElement) {
        const expandedContent = cardElement.querySelector(`.${styles.expandedContent}`);
        if (expandedContent) {
          // Calculate the position to center the expanded content
          const cardRect = cardElement.getBoundingClientRect();
          const expandedRect = expandedContent.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          
          // Calculate the scroll position to center the expanded content
          const scrollPosition = window.pageYOffset + expandedRect.top - (viewportHeight / 2) + (expandedRect.height / 2);
          
          window.scrollTo({
            top: Math.max(0, scrollPosition),
            behavior: 'smooth'
          });
        } else {
          // Fallback to card center if expanded content not found
          cardElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center',
            inline: 'nearest'
          });
        }
      }
    }, 500); // Increased delay to allow full animation
  };

  const fadeInUp = useMemo(() => ({
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }), []);

  const staggerContainer = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  }), []);

  const cardReveal = useMemo(() => ({
    hidden: { 
      opacity: 0, 
      y: 50, 
      scale: 0.9,
      rotateX: 30
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }), []);

  const services = [
    {
      icon: <Award className={styles.serviceIcon} />,
      title: t('services.permits.title'),
      description: t('services.permits.desc'),
      features: t('services.permits.features'),
      detailedContent: {
        title: t('services.permits.detailedTitle'),
        about: t('services.permits.detailedAbout')
      }
    },
    {
      icon: <CheckCircle className={styles.serviceIcon} />,
      title: t('services.reports.title'),
      description: t('services.reports.desc'),
      features: t('services.reports.features'),
      detailedContent: {
        title: t('services.reports.detailedTitle'),
        about: t('services.reports.detailedAbout')
      }
    },
    {
      icon: <Globe className={styles.serviceIcon} />,
      title: t('services.assessment.title'),
      description: t('services.assessment.desc'),
      features: t('services.assessment.features'),
      detailedContent: {
        title: t('services.assessment.detailedTitle'),
        about: t('services.assessment.detailedAbout')
      }
    },
    {
      icon: <Leaf className={styles.serviceIcon} />,
      title: t('services.audit.title'),
      description: t('services.audit.desc'),
      features: t('services.audit.features'),
      detailedContent: {
        title: t('services.audit.detailedTitle'),
        about: t('services.audit.detailedAbout')
      }
    },
    {
      icon: <Users className={styles.serviceIcon} />,
      title: t('services.management.title'),
      description: t('services.management.desc'),
      features: t('services.management.features'),
      detailedContent: {
        title: t('services.management.detailedTitle'),
        about: t('services.management.detailedAbout')
      }
    },
    {
      icon: <Leaf className={styles.serviceIcon} />,
      title: t('services.rehabilitation.title'),
      description: t('services.rehabilitation.desc'),
      features: t('services.rehabilitation.features'),
      detailedContent: {
        title: t('services.rehabilitation.detailedTitle'),
        about: t('services.rehabilitation.detailedAbout')
      }
    },
    {
      icon: <Globe className={styles.serviceIcon} />,
      title: t('services.consulting.title'),
      description: t('services.consulting.desc'),
      features: t('services.consulting.features'),
      detailedContent: {
        title: t('services.consulting.detailedTitle'),
        about: t('services.consulting.detailedAbout')
      }
    },
    {
      icon: <Award className={styles.serviceIcon} />,
      title: t('services.mawan.title'),
      description: t('services.mawan.desc'),
      features: t('services.mawan.features'),
      detailedContent: {
        title: t('services.mawan.detailedTitle'),
        about: t('services.mawan.detailedAbout')
      }
    }
  ];

  return (
    <section id="services" className={styles.services} role="main" aria-label="خدماتنا البيئية">
      <div className="container">
        <motion.div
          className={styles.sectionHeader}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className={styles.sectionTitle}>{t('services.title')}</h2>
          <p className={styles.sectionSubtitle}>
            {t('services.subtitle')}
          </p>
        </motion.div>

        <div className={styles.servicesLayout}>
          {/* Single Optimized Floating Logo */}
          <motion.div
            className={styles.floatingLogo1}
            initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
            animate={{ opacity: 0.15, scale: 1, rotate: 0 }}
            transition={{ 
              duration: 2, 
              delay: 0.5,
              ease: [0.25, 0.1, 0.25, 1]
            }}
          >
            <img src={logo} alt="بصمة الأرض للاستشارات البيئية - خدمات التصاريح والتقارير البيئية المعتمدة" className={styles.servicesLogo} loading="lazy" />
          </motion.div>


          <motion.div 
            className={styles.servicesGrid}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                data-card-index={index}
                className={`${styles.serviceCard} ${expandedCards[index] ? styles.expanded : ''}`}
                variants={cardReveal}
                whileHover={{ 
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
              >
                <div className={styles.serviceCardContent}>
                  <div className={styles.serviceIconContainer}>
                    {service.icon}
                  </div>
                  <h3 className={styles.serviceTitle}>{service.title}</h3>
                  <p className={styles.serviceDescription}>{service.description}</p>
                  <ul className={styles.serviceFeatures}>
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex}>
                        <CheckCircle size={16} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {service.detailedContent && (
                  <button 
                    className={styles.seeMoreButton}
                    onClick={() => toggleCard(index)}
                  >
                    {expandedCards[index] ? (
                      <>
                        <span>{t('common.seeLess')}</span>
                        <ChevronUp size={18} />
                      </>
                    ) : (
                      <>
                        <span>{t('common.seeMore')}</span>
                        <ChevronDown size={18} />
                      </>
                    )}
                  </button>
                )}

                <AnimatePresence>
                  {expandedCards[index] && service.detailedContent && (
                    <motion.div
                      className={styles.expandedContent}
                      initial={{ 
                        opacity: 0, 
                        height: 0,
                        y: -15,
                        scale: 0.98
                      }}
                      animate={{ 
                        opacity: 1, 
                        height: "auto",
                        y: 0,
                        scale: 1
                      }}
                      exit={{ 
                        opacity: 0, 
                        height: 0,
                        y: -8,
                        scale: 0.99
                      }}
                      transition={{ 
                        duration: 0.5, 
                        ease: [0.16, 1, 0.3, 1],
                        opacity: { duration: 0.4, ease: "easeOut" },
                        height: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                        y: { duration: 0.4, ease: "easeOut" },
                        scale: { duration: 0.3, ease: "easeOut" }
                      }}
                    >
                      <motion.div 
                        className={styles.detailedContent}
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ 
                          duration: 0.4, 
                          delay: 0.15, 
                          ease: [0.16, 1, 0.3, 1]
                        }}
                      >
                        <div className={styles.detailedAbout}>
                          <h5>{t('common.aboutService')}</h5>
                          <p>{service.detailedContent.about}</p>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Services;

