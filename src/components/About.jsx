import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Globe, Award } from 'lucide-react';
import styles from './About.module.css';
import logo from '../assets/logo_design_to_use.webp';
import { useLanguage } from '../contexts/LanguageContext';

const About = () => {
  const { t } = useLanguage();
  
  const fadeInLeft = useMemo(() => ({
    hidden: { opacity: 0, x: -60, rotate: -5 },
    visible: { 
      opacity: 1, 
      x: 0,
      rotate: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }), []);

  const fadeInRight = useMemo(() => ({
    hidden: { opacity: 0, x: 60, rotate: 5 },
    visible: { 
      opacity: 1, 
      x: 0,
      rotate: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }), []);

  return (
    <section id="about" className={styles.about} role="complementary" aria-label="من نحن">
      <div className="container">
         <div className={styles.aboutContent}>
           {/* Top Row: Text Content + Logo */}
           <div className={styles.topRow}>
             <motion.div
               className={styles.aboutText}
               variants={fadeInLeft}
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true, margin: "-100px" }}
             >
               <h2 className={styles.sectionTitle}>{t('about.title')}</h2>
               <motion.p 
                 className={styles.aboutDescription}
                 initial={{ opacity: 0, y: 15 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
                 viewport={{ once: true, margin: "-100px" }}
               >
                 {t('about.description')}
               </motion.p>
             </motion.div>
             
             <motion.div
               className={styles.aboutVisual}
               variants={fadeInRight}
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true, margin: "-100px" }}
             >
               <div className={styles.visualContainer}>
                 <div className={styles.modernShowcase}>
                   {/* Optimized Floating Logo */}
                   <motion.div
                     className={styles.floatingLogo}
                     initial={{ opacity: 0, scale: 0.5 }}
                     animate={{ opacity: 0.08, scale: 1 }}
                     transition={{ 
                       duration: 1.5, 
                       delay: 0.3,
                       ease: [0.25, 0.1, 0.25, 1]
                     }}
                   >
                     <img src={logo} alt="بصمة الأرض" className={styles.aboutFloatingLogo} loading="lazy" />
                   </motion.div>

                   {/* Main Logo Card */}
                   <motion.div
                     className={styles.logoCard}
                     initial={{ scale: 0.8, opacity: 0, y: 50 }}
                     whileInView={{ scale: 1, opacity: 1, y: 0 }}
                     transition={{ duration: 0.8, ease: "easeOut" }}
                     viewport={{ once: true }}
                     whileHover={{ 
                       y: -10,
                       transition: { duration: 0.3 }
                     }}
                   >
                     <div className={styles.logoContainer}>
                       <img src={logo} alt="بصمة الأرض" className={styles.mainLogo} />
                       <div className={styles.logoOverlay}></div>
                     </div>
                     <div className={styles.logoText}>
                       <h3>{t('common.brandName')}</h3>
                       <p>{t('common.brandSubtitle')}</p>
                     </div>
                   </motion.div>

                   {/* Floating Elements */}
                   <motion.div
                     className={`${styles.floatingElement} ${styles.element1}`}
                     animate={{ 
                       y: [0, -20, 0],
                       rotate: [0, 5, 0]
                     }}
                     transition={{ 
                       duration: 4, 
                       repeat: Infinity, 
                       ease: "easeInOut",
                       delay: 0
                     }}
                   >
                     <Leaf size={40} />
                   </motion.div>

                   <motion.div
                     className={`${styles.floatingElement} ${styles.element2}`}
                     animate={{ 
                       y: [0, -15, 0],
                       rotate: [0, -3, 0]
                     }}
                     transition={{ 
                       duration: 3.5, 
                       repeat: Infinity, 
                       ease: "easeInOut",
                       delay: 0.5
                     }}
                   >
                     <Globe size={35} />
                   </motion.div>

                   <motion.div
                     className={`${styles.floatingElement} ${styles.element3}`}
                     animate={{ 
                       y: [0, -25, 0],
                       rotate: [0, 4, 0]
                     }}
                     transition={{ 
                       duration: 4.5, 
                       repeat: Infinity, 
                       ease: "easeInOut",
                       delay: 1
                     }}
                   >
                     <Award size={30} />
                   </motion.div>


                   {/* Background Pattern */}
                   <div className={styles.backgroundPattern}>
                     <div className={`${styles.patternCircle} ${styles.circle1}`}></div>
                     <div className={`${styles.patternCircle} ${styles.circle2}`}></div>
                     <div className={`${styles.patternCircle} ${styles.circle3}`}></div>
                   </div>
                 </div>
               </div>
             </motion.div>
           </div>
         </div>
      </div>
    </section>
  );
};

export default About;

