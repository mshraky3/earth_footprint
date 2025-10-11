import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Leaf, 
  MessageCircle,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Globe,
  Users,
  Award,
  Menu,
  X
} from 'lucide-react';
import './App.css';
import logo from './assets/logo_design_to_use.png';

const App = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Prevent body scroll when mobile menu is open
  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert('شكراً لتواصلك معنا! سيتواصل معك فريقنا خلال 24 ساعة.');
  };

  return (
    <div className="app professional-theme">
      {/* Navigation */}
      <nav className="nav">
        <motion.div 
          className="nav-container"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <motion.div 
            className="nav-logo"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            <img src={logo} alt="بصمة الأرض" className="logo-image" />
            <span className="logo-text">بصمة الأرض</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="nav-links desktop-nav">
            <a href="#services" onClick={scrollToServices}>الخدمات</a>
            <a href="#projects" onClick={handleNavClick}>لماذا نحن</a>
            <a href="#about" onClick={handleNavClick}>من نحن</a>
            <a href="#contact" onClick={scrollToContact}>تواصل معنا</a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-button"
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
              className="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="mobile-menu-links">
                <a href="#services" onClick={scrollToServices}>الخدمات</a>
                <a href="#projects" onClick={handleNavClick}>لماذا نحن</a>
                <a href="#about" onClick={handleNavClick}>من نحن</a>
                <a href="#contact" onClick={scrollToContact}>تواصل معنا</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        {/* Animated Background */}
        <div className="hero-background">
          {/* Gradient waves */}
          <div className="gradient-waves">
            <motion.div 
              className="wave wave-1"
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <motion.div 
              className="wave wave-2"
              animate={{ 
                rotate: [360, 0],
                scale: [1.1, 1, 1.1]
              }}
              transition={{ 
                duration: 25,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>
        </div>
        
        <div className="hero-content">
          {/* Main Content Card - Asymmetric */}
          <motion.div
            className="hero-main-card"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <motion.div
              className="hero-badge"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Leaf size={18} />
              <span>الاستشارات البيئية المتكاملة</span>
            </motion.div>

            <motion.h1 
              className="hero-title"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.span 
                className="title-word"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                مكتب بصمة الأرض
              </motion.span>
              <motion.span 
                className="title-word gradient-text"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                للاستشارات البيئية
              </motion.span>
              <motion.span 
                className="title-word accent-text"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                شريكك البيئي الأول
              </motion.span>
            </motion.h1>

            <motion.p 
              className="hero-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              حلول واستشارات بيئية متكاملة لتمكين المنشآت الصناعية من النمو بوعي ومسؤولية وتحقيق الامتثال الكامل للأنظمة البيئية.
            </motion.p>

            <motion.div 
              className="hero-cta-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <div className="hero-buttons">
                <button 
                  className="btn-secondary"
                  onClick={scrollToServices}
                >
                  تصفح خدماتنا
                </button>
                <button 
                  className="btn-primary btn-cta"
                  onClick={scrollToContact}
                >
                  <span>تواصل معنا</span>
                  <ArrowLeft size={20} />
                </button>
              </div>
              
              <motion.div 
                className="cta-trust-badges"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.1 }}
              >
                <div className="trust-badge">
                  <CheckCircle size={16} />
                  <span>خبرة ميدانية متخصصة</span>
                </div>
                <div className="trust-badge">
                  <Users size={16} />
                  <span>فريق عمل مؤهل</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Floating Stats Cards */}
          <div className="floating-stats">
            {[
              { 
                number: "2030", 
                label: "دعم رؤية المملكة", 
                icon: <Award size={22} />,
                color: "#2d5a27",
                delay: 1.0
              },
              { 
                number: "100%", 
                label: "الامتثال البيئي", 
                icon: <CheckCircle size={22} />,
                color: "#0369a1",
                delay: 1.1
              },
              { 
                number: "القصيم", 
                label: "مقرنا الرئيسي", 
                icon: <Globe size={22} />,
                color: "#0ea5e9",
                delay: 1.2
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className={`stat-card stat-card-${index + 1}`}
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
                  transition: { duration: 0.2 }
                }}
              >
                <motion.div 
                  className="stat-icon"
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.3
                  }}
                >
                  {stat.icon}
                </motion.div>
                <div className="stat-content">
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
                <motion.div 
                  className="stat-glow"
                  animate={{ 
                    opacity: [0.2, 0.5, 0.2],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{ background: `radial-gradient(circle, ${stat.color}40, transparent)` }}
                />
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services professional-services">
        <div className="container">
          <motion.div
            className="section-header professional-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title professional-title">خدماتنا البيئية المتكاملة</h2>
            <p className="section-subtitle professional-subtitle">
              نقدّم باقة شاملة من الخدمات البيئية التي تمكّن المنشآت الصناعية من تحقيق الامتثال الكامل للأنظمة والمعايير البيئية المعتمدة في المملكة
            </p>
          </motion.div>

          <div className="services-professional-layout">
            <div className="professional-services-grid">
              {[
                {
                  icon: <Award className="service-icon" />,
                  title: "الرخص البيئية",
                  description: "إصدار وتجديد الرخص البيئية وفق أحدث الأنظمة واللوائح المعتمدة في المملكة.",
                  features: ["إصدار الرخص", "تجديد الرخص", "الامتثال للأنظمة"]
                },
                {
                  icon: <CheckCircle className="service-icon" />,
                  title: "الدراسات والتقارير البيئية",
                  description: "إعداد الدراسات والتقارير البيئية الدورية الشاملة والمتخصصة.",
                  features: ["دراسات بيئية", "تقارير دورية", "تقارير متخصصة"]
                },
                {
                  icon: <Globe className="service-icon" />,
                  title: "تقييم الأثر البيئي",
                  description: "تقييم شامل للآثار البيئية المحتملة للمشاريع والأنشطة الصناعية.",
                  features: ["تقييم الأثر", "دراسات الجدوى", "الحلول البيئية"]
                },
                {
                  icon: <Leaf className="service-icon" />,
                  title: "التدقيق البيئي",
                  description: "خدمات تدقيق بيئي متكاملة لضمان الامتثال المستمر للمعايير البيئية.",
                  features: ["التدقيق الداخلي", "مراجعة الامتثال", "التحسين المستمر"]
                },
                {
                  icon: <Users className="service-icon" />,
                  title: "خطط الإدارة والتأهيل البيئي",
                  description: "تطوير خطط إدارة بيئية شاملة وبرامج إعادة التأهيل البيئي للمواقع.",
                  features: ["خطط الإدارة", "إعادة التأهيل", "الإدارة المستدامة"]
                },
                {
                  icon: <Globe className="service-icon" />,
                  title: "الاستشارات الفنية المتخصصة",
                  description: "استشارات فنية في إدارة الموارد البيئية، النفايات، التلوث، الطاقة المستدامة، والتخطيط الحضري.",
                  features: ["إدارة الموارد", "الطاقة المستدامة", "التخطيط البيئي"]
                }
              ].map((service, index) => (
                <motion.div
                  key={index}
                  className="service-card professional-service-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{ 
                    y: -8,
                    transition: { duration: 0.2, ease: "easeOut" }
                  }}
                >
                  <div className="service-icon-container professional-icon">
                    {service.icon}
                  </div>
                  <h3 className="service-title professional-service-title">{service.title}</h3>
                  <p className="service-description professional-description">{service.description}</p>
                  <ul className="service-features professional-features">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex}>
                        <CheckCircle size={16} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="projects" className="projects professional-projects">
        <div className="container">
          <motion.div
            className="section-header professional-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="section-title professional-title">لماذا تختار بصمة الأرض؟</h2>
            <p className="section-subtitle professional-subtitle">
              نتميز بخبرة ميدانية متخصصة وفريق عمل مؤهل يقدم حلولًا مبتكرة تدعم أهداف التنمية المستدامة
            </p>
          </motion.div>

          <div className="projects-professional-layout">
            <div className="professional-projects-grid">
              {[
                {
                  title: "الخبرة الميدانية المتخصصة",
                  company: "فريق عمل مؤهل ومتمرس",
                  description: "نتميز بخبرة عملية واسعة في التعامل مع مختلف القطاعات الصناعية وتقديم حلول واقعية وفعّالة.",
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
              ].map((project, index) => (
                <motion.div
                  key={index}
                  className="project-card professional-project-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{ 
                    y: -8,
                    transition: { duration: 0.2, ease: "easeOut" }
                  }}
                >
                  <div className="project-header professional-header">
                    <div className="project-category professional-category">{project.category}</div>
                    <div className="project-year professional-year">{project.year}</div>
                  </div>
                  <h3 className="project-title professional-project-title">{project.title}</h3>
                  <p className="project-company professional-company">{project.company}</p>
                  <p className="project-description professional-description">{project.description}</p>
                  <div className="project-results professional-results">
                    {project.results.map((result, resultIndex) => (
                      <div key={resultIndex} className="result-item professional-result">
                        <CheckCircle size={16} />
                        {result}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <div className="about-content">
            <motion.div
              className="about-text"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="section-title">من نحن</h2>
              <motion.p 
                className="about-description"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
              >
                نحن مكتب بصمة الأرض للاستشارات البيئية، نعمل بشغف لإحداث أثرٍ حقيقي في مجال الاستدامة البيئية، من خلال تقديم حلول واستشارات بيئية متكاملة تمكّن المنشآت الصناعية من النمو بوعي ومسؤولية، وتحقيق الامتثال الكامل للأنظمة والمعايير البيئية المعتمدة في المملكة.
              </motion.p>
              <motion.p 
                className="about-description"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
              >
                نؤمن أن البيئة ليست مجرد التزام تنظيمي، بل قيمة اقتصادية واستثمارية تُسهم في بناء مستقبل أكثر استدامة، ولذلك نعمل لنكون الشريك البيئي الأول للقطاع الصناعي في المملكة.
              </motion.p>
              <div className="about-values">
                <div className="value-item">
                  <Users className="value-icon" />
                  <div>
                    <h4>فريق عمل مؤهل</h4>
                    <p>نتميز بفريق عمل مؤهل يقدم حلولًا مبتكرة تدعم أهداف التنمية المستدامة</p>
                  </div>
                </div>
                <div className="value-item">
                  <Award className="value-icon" />
                  <div>
                    <h4>خبرة ميدانية متخصصة</h4>
                    <p>خبرة عملية واسعة في التعامل مع مختلف القطاعات الصناعية</p>
                  </div>
                </div>
                <div className="value-item">
                  <Globe className="value-icon" />
                  <div>
                    <h4>تغطية شاملة</h4>
                    <p>مقرنا في القصيم ونخدم كافة مناطق المملكة العربية السعودية</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              className="about-visual"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="visual-container">
                <div className="modern-showcase">
                  {/* Main Logo Card */}
                  <motion.div
                    className="logo-card"
                    initial={{ scale: 0.8, opacity: 0, y: 50 }}
                    whileInView={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      y: -10,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <div className="logo-container">
                      <img src={logo} alt="بصمة الأرض" className="main-logo" />
                      <div className="logo-overlay"></div>
                    </div>
                    <div className="logo-text">
                      <h3>بصمة الأرض</h3>
                      <p>للاستشارات البيئية</p>
                    </div>
                  </motion.div>

                  {/* Floating Elements */}
                  <motion.div
                    className="floating-element element-1"
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
                    className="floating-element element-2"
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
                    className="floating-element element-3"
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
                    className="floating-element element-4"
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
                  <div className="background-pattern">
                    <div className="pattern-circle circle-1"></div>
                    <div className="pattern-circle circle-2"></div>
                    <div className="pattern-circle circle-3"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <motion.div
            className="contact-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="contact-text">
              <h2 className="section-title">تواصل معنا</h2>
              <p className="contact-subtitle">
                نحن هنا لمساعدتك في تحقيق الامتثال البيئي وتقديم الحلول المتكاملة لمنشأتك. تواصل معنا اليوم للحصول على استشارة متخصصة.
              </p>
              <div className="contact-info">
                <div className="contact-item">
                  <Globe className="contact-icon" />
                  <div>
                    <h4>الموقع</h4>
                    <p>منطقة القصيم - المملكة العربية السعودية</p>
                  </div>
                </div>
                <div className="contact-item">
                  <MessageCircle className="contact-icon" />
                  <div>
                    <h4>التواصل</h4>
                    <p>نخدم جميع مناطق المملكة</p>
                  </div>
                </div>
              </div>
            </div>
            
            <motion.div
              className="contact-form"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <form className="form" onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <input type="text" placeholder="الاسم" required />
                </div>
                <div className="form-group">
                  <input type="email" placeholder="البريد الإلكتروني" required />
                </div>
                <div className="form-group">
                  <input type="tel" placeholder="رقم الجوال" required />
                </div>
                <div className="form-group">
                  <select required>
                    <option value="">اختر الخدمة المطلوبة</option>
                    <option value="license">الرخص البيئية</option>
                    <option value="studies">الدراسات والتقارير البيئية</option>
                    <option value="assessment">تقييم الأثر البيئي</option>
                    <option value="audit">التدقيق البيئي</option>
                    <option value="management">خطط الإدارة والتأهيل البيئي</option>
                    <option value="consulting">الاستشارات الفنية المتخصصة</option>
                    <option value="other">أخرى</option>
                  </select>
                </div>
                <div className="form-group">
                  <textarea placeholder="تفاصيل الاستفسار أو المشروع..." rows={4} required></textarea>
                </div>
                <motion.button
                  type="submit"
                  className="btn-primary form-submit"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(45, 90, 39, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  إرسال
                  <MessageCircle size={20} />
                </motion.button>
              </form>
            </motion.div>
          </motion.div>

          {/* Google Maps */}
          <motion.div
            className="contact-map"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3575.4525134593873!2d43.973797399999995!3d26.3442221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x157f596476ef1083%3A0x1627f4ca3423d980!2z2YXZg9iq2Kgg2KjYtdmF2Kkg2KfZhNin2LHYtiDZhNmE2KfYs9iq2LTYp9ix2KfYqiDYp9mE2KjZitim2YrYqQ!5e0!3m2!1sar!2ssa!4v1760196481123!5m2!1sar!2ssa"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="موقعنا في بريدة، القصيم"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <img src={logo} alt="بصمة الأرض" className="logo-image" />
              <span className="logo-text">بصمة الأرض</span>
            </div>
            <p className="footer-text">
              شريكك البيئي الأول للقطاع الصناعي في المملكة
            </p>
            <div className="footer-links">
              <a href="#services">الخدمات</a>
              <a href="#projects">لماذا نحن</a>
              <a href="#about">من نحن</a>
              <a href="#contact">تواصل معنا</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} بصمة الأرض. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
