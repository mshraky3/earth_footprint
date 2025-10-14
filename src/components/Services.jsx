import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle, Globe, Leaf, Users } from 'lucide-react';
import styles from './Services.module.css';
import logo from '../assets/logo_design_to_use.png';

const Services = () => {
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
      title: "التصاريح البيئية",
      description: "إصدار وتجديد التصاريح البيئية وفق أحدث الأنظمة واللوائح المعتمدة في المملكة.",
      features: ["إصدار الرخص", "تجديد الرخص", "الامتثال للأنظمة"]
    },
    {
      icon: <CheckCircle className={styles.serviceIcon} />,
      title: "التقارير البيئية الدورية",
      description: "إعداد الدراسات والتقارير البيئية الدورية الشاملة والمتخصصة.",
      features: ["دراسات بيئية", "تقارير دورية", "تقارير متخصصة"]
    },
    {
      icon: <Globe className={styles.serviceIcon} />,
      title: "تقييم الأثر البيئي",
      description: "تقييم شامل للآثار البيئية المحتملة للمشاريع والأنشطة في جميع القطاعات.",
      features: ["تقييم الأثر", "دراسات الجدوى", "الحلول البيئية"]
    },
    {
      icon: <Leaf className={styles.serviceIcon} />,
      title: "التدقيق البيئي",
      description: "خدمات تدقيق بيئي متكاملة لضمان الامتثال المستمر للمعايير البيئية.",
      features: ["التدقيق الداخلي", "مراجعة الامتثال", "التحسين المستمر"]
    },
    {
      icon: <Users className={styles.serviceIcon} />,
      title: "خطط الإدارة البيئية",
      description: "تطوير خطط إدارة بيئية شاملة ومتكاملة لضمان الاستدامة البيئية.",
      features: ["خطط الإدارة", "الاستدامة البيئية", "الإدارة المتكاملة"]
    },
    {
      icon: <Leaf className={styles.serviceIcon} />,
      title: "خطط إعادة التأهيل البيئي",
      description: "تطوير برامج إعادة التأهيل البيئي للمواقع المتضررة والمتدهورة.",
      features: ["إعادة التأهيل", "استصلاح المواقع", "التحسين البيئي"]
    },
    {
      icon: <Globe className={styles.serviceIcon} />,
      title: "الاستشارات الفنية المتخصصة",
      description: "استشارات فنية متخصصة في إدارة الموارد البيئية، النفايات، التلوث، الطاقة المستدامة، والتخطيط الحضري لجميع القطاعات.",
      features: ["إدارة الموارد", "الطاقة المستدامة", "التخطيط البيئي"]
    }
  ];

  return (
    <section id="services" className={styles.services}>
      <div className="container">
        <motion.div
          className={styles.sectionHeader}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className={styles.sectionTitle}>خدماتنا البيئية المتكاملة</h2>
          <p className={styles.sectionSubtitle}>
            نقدّم باقة شاملة من الخدمات البيئية التي تمكّن جميع المنشآت والقطاعات من تحقيق الامتثال الكامل للأنظمة والمعايير البيئية المعتمدة في المملكة
          </p>
        </motion.div>

        <div className={styles.servicesLayout}>
          {/* Multiple Floating Logos */}
          <motion.div
            className={styles.floatingLogo1}
            initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
            animate={{ opacity: 0.25, scale: 1, rotate: 0 }}
            transition={{ 
              duration: 2, 
              delay: 0.5,
              ease: [0.25, 0.1, 0.25, 1]
            }}
            whileHover={{ 
              scale: 1.15,
              opacity: 0.35,
              transition: { duration: 0.3 }
            }}
          >
            <img src={logo} alt="بصمة الأرض" className={styles.servicesLogo} />
          </motion.div>

          <motion.div
            className={styles.floatingLogo2}
            initial={{ opacity: 0, scale: 0.4, rotate: 180 }}
            animate={{ opacity: 0.22, scale: 1, rotate: 0 }}
            transition={{ 
              duration: 2.5, 
              delay: 0.8,
              ease: [0.25, 0.1, 0.25, 1]
            }}
            whileHover={{ 
              scale: 1.1,
              opacity: 0.28,
              transition: { duration: 0.3 }
            }}
          >
            <img src={logo} alt="بصمة الأرض" className={styles.servicesLogoSmall} />
          </motion.div>

          <motion.div
            className={styles.floatingLogo3}
            initial={{ opacity: 0, scale: 0.3, rotate: -90 }}
            animate={{ opacity: 0.18, scale: 1, rotate: 0 }}
            transition={{ 
              duration: 3, 
              delay: 1.2,
              ease: [0.25, 0.1, 0.25, 1]
            }}
            whileHover={{ 
              scale: 1.12,
              opacity: 0.25,
              transition: { duration: 0.3 }
            }}
          >
            <img src={logo} alt="بصمة الأرض" className={styles.servicesLogoTiny} />
          </motion.div>

          <motion.div
            className={styles.floatingLogo4}
            initial={{ opacity: 0, scale: 0.6, rotate: 90 }}
            animate={{ opacity: 0.2, scale: 1, rotate: 0 }}
            transition={{ 
              duration: 2.2, 
              delay: 1.5,
              ease: [0.25, 0.1, 0.25, 1]
            }}
            whileHover={{ 
              scale: 1.08,
              opacity: 0.28,
              transition: { duration: 0.3 }
            }}
          >
            <img src={logo} alt="بصمة الأرض" className={styles.servicesLogoMedium} />
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
                className={styles.serviceCard}
                variants={cardReveal}
                whileHover={{ 
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
              >
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
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Services;

