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
    alert('شكراً لطلب الاستشارة ال! سيتواصل معك فريق الخبراء لدينا خلال 24 ساعة لمناقشة احتياجاتك من الاستشارات البيئية.');
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
            <Leaf className="logo-icon" />
            <span className="logo-text">بصمة الأرض</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="nav-links desktop-nav">
            <a href="#services" onClick={scrollToServices}>الخدمات</a>
            <a href="#projects" onClick={handleNavClick}>المشاريع</a>
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
                <a href="#projects" onClick={handleNavClick}>المشاريع</a>
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
          {/* Particle orbs */}
          <div className="particles-container">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className={`particle particle-${i + 1}`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0.1, 0.3, 0.1],
                  scale: [1, 1.2, 1],
                  x: [0, Math.random() * 30 - 15, 0],
                  y: [0, Math.random() * 30 - 15, 0]
                }}
                transition={{ 
                  duration: 5 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.3
                }}
              />
            ))}
          </div>
          
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
              <span>التميز البيئي</span>
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
                حوّل أعمالك
              </motion.span>
              <motion.span 
                className="title-word gradient-text"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                إلى مستقبل
              </motion.span>
              <motion.span 
                className="title-word"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                مستدام بحلول
              </motion.span>
              <motion.span 
                className="title-word accent-text"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                بيئية متطورة
              </motion.span>
            </motion.h1>

            <motion.p 
              className="hero-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              استشارات بيئية متخصصة لمساعدتك في التعامل مع اللوائح وتحقيق الامتثال وبناء ممارسات مستدامة تدفع نجاح أعمالك والبيئة معاً.
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
                  <span>احصل على استشارة الان </span>
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
                  <span>استشارة أولية </span>
                </div>
                <div className="trust-badge">
                  <Users size={16} />
                  <span>فريق خبراء معتمد</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Floating Stats Cards */}
          <div className="floating-stats">
            {[
              { 
                number: "+500", 
                label: "مشروع", 
                icon: <CheckCircle size={22} />,
                color: "#2d5a27",
                delay: 1.0
              },
              { 
                number: "%50", 
                label: "تقليل الكربون", 
                icon: <Leaf size={22} />,
                color: "#0369a1",
                delay: 1.1
              },
              { 
                number: "+100", 
                label: "عميل سعيد", 
                icon: <Users size={22} />,
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

          {/* Decorative Globe Element */}
          <motion.div
            className="hero-globe"
            initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <motion.div
              animate={{ 
                rotate: 360,
              }}
              transition={{ 
                duration: 40,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <Globe size={280} strokeWidth={1} />
            </motion.div>
            <motion.div 
              className="globe-ring"
              animate={{ 
                rotate: -360,
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                rotate: {
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear"
                },
                scale: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            />
          </motion.div>
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
            <h2 className="section-title professional-title">خدماتنا الاستشارية</h2>
            <p className="section-subtitle professional-subtitle">
              خدمات استشارات بيئية متخصصة مصممة لمساعدة أعمالك في التعامل مع اللوائح وتحقيق الامتثال وتنفيذ ممارسات مستدامة تدفع النمو
            </p>
          </motion.div>

          <div className="services-professional-layout">
            <div className="professional-services-grid">
              {[
                {
                  icon: <Globe className="service-icon" />,
                  title: "الامتثال البيئي",
                  description: "إرشادات متخصصة حول اللوائح البيئية والتصاريح ومتطلبات الامتثال لحماية أعمالك.",
                  features: ["التحليل التنظيمي", "طلبات التصاريح", "تدقيق الامتثال"]
                },
                {
                  icon: <Leaf className="service-icon" />,
                  title: "استراتيجية الاستدامة",
                  description: "تطوير استراتيجيات استدامة شاملة تتماشى مع أهداف عملك والأهداف البيئية.",
                  features: ["تطوير الاستراتيجية", "تحديد الأهداف", "تخطيط التنفيذ"]
                },
                {
                  icon: <CheckCircle className="service-icon" />,
                  title: "تقييم المخاطر البيئية",
                  description: "تحديد وتقييم المخاطر البيئية لحماية عملك وضمان الاستدامة على المدى الطويل.",
                  features: ["تحديد المخاطر", "تحليل الأثر", "استراتيجيات التخفيف"]
                },
                {
                  icon: <Globe className="service-icon" />,
                  title: "استشارات الأعمال الخضراء",
                  description: "حوّل عمليات عملك بممارسات مستدامة تقلل التكاليف والأثر البيئي.",
                  features: ["تحسين العمليات", "كفاءة الموارد", "خفض التكاليف"]
                },
                {
                  icon: <Users className="service-icon" />,
                  title: "التدريب البيئي",
                  description: "برامج تدريبية شاملة لتثقيف فريقك حول أفضل الممارسات البيئية واللوائح.",
                  features: ["تدريب الموظفين", "تعليم الامتثال", "أفضل الممارسات"]
                },
                {
                  icon: <CheckCircle className="service-icon" />,
                  title: "التقارير البيئية",
                  description: "تقارير ووثائق بيئية احترافية لتلبية المتطلبات التنظيمية وتوقعات أصحاب المصلحة.",
                  features: ["تقارير ESG", "التقارير التنظيمية", "التواصل مع المعنيين"]
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

      {/* Projects Section */}
      <section id="projects" className="projects professional-projects">
        <div className="container">
          <motion.div
            className="section-header professional-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="section-title professional-title">قصص نجاحنا</h2>
            <p className="section-subtitle professional-subtitle">
              اكتشف كيف ساعدنا الشركات في تحقيق أهدافها البيئية وتقليل بصمتها الكربونية
            </p>
          </motion.div>

          <div className="projects-professional-layout">
            <div className="professional-projects-grid">
              {[
                {
                  title: "مبادرة التصنيع الأخضر",
                  company: "شركة تك كورب للصناعات",
                  description: "نفذنا برامج شاملة للحد من النفايات وكفاءة الطاقة، مما أدى إلى تقليل انبعاثات الكربون بنسبة 40%.",
                  results: ["تقليل الكربون 40%", "تقليل النفايات 60%", "توفير 2 مليون دولار سنوياً"],
                  category: "تصنيع",
                  year: "2023"
                },
                {
                  title: "مجمع المكاتب المستدام",
                  company: "مركز مترو للأعمال",
                  description: "صممنا ونفذنا حلول البناء الأخضر بما في ذلك الألواح الشمسية وحصاد مياه الأمطار وأنظمة الطاقة الذكية.",
                  results: ["طاقة متجددة 100%", "توفير المياه 50%", "شهادة LEED بلاتينيوم"],
                  category: "عقارات",
                  year: "2023"
                },
                {
                  title: "سلسلة توريد محايدة للكربون",
                  company: "شركة الخدمات اللوجستية العالمية",
                  description: "حوّلنا عمليات سلسلة التوريد بالكامل لتحقيق الحياد الكربوني من خلال تحسين المسار والنقل الأخضر.",
                  results: ["محايد للكربون", "توفير الوقود 30%", "شهادة ISO 14001"],
                  category: "لوجستيات",
                  year: "2024"
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
              <h2 className="section-title">حول بصمة الأرض</h2>
              <motion.p 
                className="about-description"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
              >
                نحن مستشارون بيئيون خبراء يتمتعون بمعرفة صناعية عميقة وخبرة تنظيمية. مهمتنا هي مساعدة الشركات على التعامل مع التحديات البيئية المعقدة وتحقيق الامتثال وتنفيذ ممارسات مستدامة تدفع نجاح الأعمال والبيئة معاً.
              </motion.p>
              <div className="about-values">
                <div className="value-item">
                  <Users className="value-icon" />
                  <div>
                    <h4>فريق متخصص</h4>
                    <p>محترفون بيئيون معتمدون بسنوات من الخبرة في الصناعة</p>
                  </div>
                </div>
                <div className="value-item">
                  <Award className="value-icon" />
                  <div>
                    <h4>سجل حافل بالنجاح</h4>
                    <p>نجحنا في مساعدة الشركات على تحقيق أهداف الامتثال والاستدامة</p>
                  </div>
                </div>
                <div className="value-item">
                  <Globe className="value-icon" />
                  <div>
                    <h4>نهج شامل</h4>
                    <p>خدمات استشارية شاملة من الاستراتيجية إلى التنفيذ</p>
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
                <div className="floating-icons">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Leaf size={60} />
                  </motion.div>
                  <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Globe size={50} />
                  </motion.div>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Award size={45} />
                  </motion.div>
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
              <h2 className="section-title">احصل على استشارتك اليوم</h2>
              <p className="contact-subtitle">
                احجز استشارة  مع خبرائنا البيئيين. سنساعدك على التعامل مع اللوائح وتحقيق الامتثال وتنفيذ ممارسات مستدامة تدفع عملك للأمام.
              </p>
              <div className="contact-info">
                <div className="contact-item">
                  <MessageCircle className="contact-icon" />
                  <div>
                    <h4>واتساب</h4>
                    <p>+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="contact-item">
                  <Globe className="contact-icon" />
                  <div>
                    <h4>البريد الإلكتروني</h4>
                    <p>hello@earthfootprint.com</p>
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
                  <input type="text" placeholder="اسمك" required />
                </div>
                <div className="form-group">
                  <input type="email" placeholder="البريد الإلكتروني" required />
                </div>
                <div className="form-group">
                  <input type="tel" placeholder="رقم الهاتف" required />
                </div>
                <div className="form-group">
                  <select required>
                    <option value="">اختر الخدمة الاستشارية</option>
                    <option value="compliance">الامتثال البيئي</option>
                    <option value="strategy">استراتيجية الاستدامة</option>
                    <option value="risk">تقييم المخاطر البيئية</option>
                    <option value="green">استشارات الأعمال الخضراء</option>
                    <option value="training">التدريب البيئي</option>
                    <option value="reporting">التقارير البيئية</option>
                  </select>
                </div>
                <div className="form-group">
                  <textarea placeholder="أخبرنا عن مشروعك..." rows={4} required></textarea>
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
                  إرسال الرسالة
                  <MessageCircle size={20} />
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <Leaf className="logo-icon" />
              <span className="logo-text">بصمة الأرض</span>
            </div>
            <p className="footer-text">
              نبني مستقبلاً مستداماً، حلاً واحداً في كل مرة
            </p>
            <div className="footer-links">
              <a href="#services">الخدمات</a>
              <a href="#about">من نحن</a>
              <a href="#contact">تواصل معنا</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 بصمة الأرض. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
