import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import styles from './Projects.module.css';
import logo from '../assets/logo_design_to_use.png';

const Projects = () => {
  const scaleIn = useMemo(() => ({
    hidden: { opacity: 0, scale: 0.8, rotate: -3 },
    visible: { 
      opacity: 1, 
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.6,
        ease: [0.34, 1.56, 0.64, 1]
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

  const projects = [
    {
      title: "الخبرة الميدانية المتخصصة",
      company: "فريق عمل مؤهل ومتمرس",
      description: "نتميز بخبرة عملية واسعة في التعامل مع مختلف القطاعات والأنشطة وتقديم حلول واقعية وفعّالة.",
      results: ["فريق متخصص", "خبرة ميدانية", "حلول مبتكرة"],
      category: "الخبرة",
      year: ""
    },
    {
      title: "دعم التنمية المستدامة",
      company: "رؤية المملكة 2030",
      description: "نساهم في تحقيق أهداف التنمية المستدامة ودعم رؤية المملكة 2030 من خلال حلول بيئية متكاملة.",
      results: ["رؤية 2030", "التنمية المستدامة", "الأداء البيئي"],
      category: "الرؤية",
      year: ""
    },
    {
      title: "تغطية شاملة للمملكة",
      company: "من القصيم لكل المناطق",
      description: "مقرنا في القصيم ونقدم خدماتنا لكافة مناطق المملكة من خلال شبكة من الشراكات والتعاون.",
      results: ["تغطية واسعة", "شراكات قوية", "خدمة متميزة"],
      category: "التغطية",
      year: ""
    }
  ];

  return (
    <section id="projects" className={styles.projects}>
      <div className="container">
        <motion.div
          className={styles.sectionHeader}
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className={styles.sectionTitle}>لماذا تختار بصمة الأرض؟</h2>
          <p className={styles.sectionSubtitle}>
            نتميز بخبرة ميدانية متخصصة وفريق عمل مؤهل يقدم حلولًا مبتكرة تدعم أهداف التنمية المستدامة
          </p>
        </motion.div>

        <div className={styles.projectsLayout}>
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
            <img src={logo} alt="بصمة الأرض" className={styles.projectsFloatingLogo} />
          </motion.div>

          <motion.div 
            className={styles.projectsGrid}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {projects.map((project, index) => {
              const variant = index % 3 === 0 ? fadeInLeft : index % 3 === 1 ? fadeInUp : fadeInRight;
              return (
                <motion.div
                  key={index}
                  className={styles.projectCard}
                  variants={variant}
                  whileHover={{ 
                    y: -8,
                    scale: 1.02,
                    rotateY: 2,
                    transition: { duration: 0.2, ease: "easeOut" }
                  }}
                >
                  <div className={styles.projectHeader}>
                    <div className={styles.projectCategory}>{project.category}</div>
                    <div className={styles.projectYear}>{project.year}</div>
                  </div>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <p className={styles.projectCompany}>{project.company}</p>
                  <p className={styles.projectDescription}>{project.description}</p>
                  <div className={styles.projectResults}>
                    {project.results.map((result, resultIndex) => (
                      <div key={resultIndex} className={styles.resultItem}>
                        <CheckCircle size={16} />
                        {result}
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Projects;

