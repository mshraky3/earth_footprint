import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Users, Award, Globe, Leaf, CheckCircle } from 'lucide-react';
import styles from './About.module.css';
import logo from '../assets/logo_design_to_use.png';

const About = () => {
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
    <section id="about" className={styles.about}>
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
               <h2 className={styles.sectionTitle}>من نحن</h2>
               <motion.p 
                 className={styles.aboutDescription}
                 initial={{ opacity: 0, y: 15 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
                 viewport={{ once: true, margin: "-100px" }}
               >
                 نحن مكتب بصمة الأرض للاستشارات البيئية، شريكك البيئي الأول لجميع القطاعات في المملكة. نقدم حلول واستشارات بيئية متكاملة تمكّن جميع المنشآت من النمو بوعي ومسؤولية.
               </motion.p>
               
               <div className={styles.statsGrid}>
                 <div className={styles.statItem}>
                   <Award className={styles.statIcon} />
                   <div>
                     <h4>5+ سنوات خبرة</h4>
                     <p>في الاستشارات البيئية</p>
                   </div>
                 </div>
                 <div className={styles.statItem}>
                   <CheckCircle className={styles.statIcon} />
                   <div>
                     <h4>250+ مشروع ناجح</h4>
                     <p>بأعلى المعايير</p>
                   </div>
                 </div>
                 <div className={styles.statItem}>
                   <Globe className={styles.statIcon} />
                   <div>
                     <h4>9 مناطق خدمة</h4>
                     <p>في جميع أنحاء المملكة</p>
                   </div>
                 </div>
                 <div className={styles.statItem}>
                   <Users className={styles.statIcon} />
                   <div>
                     <h4>8+ قطاعات</h4>
                     <p>صناعة، أغذية، صحية، عقارية</p>
                   </div>
                 </div>
               </div>
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
                   {/* Floating Logo */}
                   <motion.div
                     className={styles.floatingLogo}
                     initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                     animate={{ opacity: 0.1, scale: 1, rotate: 0 }}
                     transition={{ 
                       duration: 2, 
                       delay: 0.5,
                       ease: [0.25, 0.1, 0.25, 1]
                     }}
                     whileHover={{ 
                       scale: 1.1,
                       opacity: 0.18,
                       transition: { duration: 0.3 }
                     }}
                   >
                     <img src={logo} alt="بصمة الأرض" className={styles.aboutFloatingLogo} />
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
                       <h3>بصمة الأرض</h3>
                       <p>للاستشارات البيئية</p>
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

                   <motion.div
                     className={`${styles.floatingElement} ${styles.element4}`}
                     animate={{ 
                       y: [0, -18, 0],
                       rotate: [0, -2, 0]
                     }}
                     transition={{ 
                       duration: 3.8, 
                       repeat: Infinity, 
                       ease: "easeInOut",
                       delay: 1.5
                     }}
                   >
                     <CheckCircle size={32} />
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
           
           {/* Bottom Full Width: Impact Statement */}
           <motion.div 
             className={styles.impactStatement}
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
             viewport={{ once: true, margin: "-100px" }}
           >
             <h3 className={styles.impactTitle}>صنعنا الأثر.. ونمضي لنضاعفه</h3>
             <p className={styles.impactText}>
               في أكثر من 8 قطاعات تقود التحول البيئي في المملكة
             </p>
           </motion.div>
         </div>
      </div>
    </section>
  );
};

export default About;

