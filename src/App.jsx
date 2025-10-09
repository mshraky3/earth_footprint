import React from 'react';
import { motion } from 'framer-motion';
import { 
  Leaf, 
  MessageCircle,
  ArrowRight,
  CheckCircle,
  Globe,
  Users,
  Award
} from 'lucide-react';
import './App.css';

const App = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your interest! We\'ll contact you soon via WhatsApp.');
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
            <span className="logo-text">Earth Footprint</span>
          </motion.div>

          <div className="nav-links">
            <a href="#services" onClick={scrollToServices}>Services</a>
            <a href="#projects">Projects</a>
            <a href="#about">About</a>
            <a href="#contact" onClick={scrollToContact}>Contact</a>
          </div>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background professional-bg">
          <div className="professional-grid">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="grid-line"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: "easeOut" }}
              />
            ))}
          </div>
          <div className="professional-elements">
            <motion.div 
              className="professional-icon-1"
              animate={{ 
                opacity: [0.3, 0.7, 0.3],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Globe size={60} />
            </motion.div>
            <motion.div 
              className="professional-icon-2"
              animate={{ 
                opacity: [0.2, 0.5, 0.2],
                x: [0, 20, 0]
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Award size={50} />
            </motion.div>
          </div>
        </div>
        
        <div className="hero-content professional-layout">
              <motion.div
                className="hero-text professional-text"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              >
                <motion.h1 
                  className="hero-title professional-title"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
                >
              <span className="title-line">Expert</span>
              <span className="title-line highlight professional-highlight">Environmental Consulting</span>
              <span className="title-line">Solutions</span>
            </motion.h1>
            <motion.p 
              className="hero-subtitle professional-subtitle"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4, ease: "easeOut" }}
            >
              Navigate complex environmental regulations and sustainability challenges with our expert consulting services. 
              We help businesses achieve compliance, reduce environmental risks, and build sustainable practices that drive success.
            </motion.p>
            <motion.div 
              className="hero-buttons professional-buttons"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
            >
              <motion.button 
                className="btn-primary professional-btn"
                onClick={scrollToContact}
                whileHover={{ 
                  scale: 1.05, 
                  y: -3
                }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: [
                    "0 8px 24px rgba(45, 90, 39, 0.4)",
                    "0 12px 32px rgba(45, 90, 39, 0.6)",
                    "0 8px 24px rgba(45, 90, 39, 0.4)"
                  ],
                  y: [0, -2, 0]
                }}
                transition={{
                  boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                  y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                Get Started
                <ArrowRight size={20} />
              </motion.button>
              <motion.button 
                className="btn-secondary professional-btn-secondary"
                onClick={scrollToServices}
                whileHover={{ 
                  scale: 1.02, 
                  y: -2
                }}
                whileTap={{ scale: 0.98 }}
              >
                Explore Solutions
              </motion.button>
            </motion.div>
          </motion.div>
          
          <motion.div
            className="hero-stats professional-stats"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
          >
            {[
              { number: "500+", label: "Projects Completed" },
              { number: "50%", label: "Carbon Reduction" },
              { number: "100+", label: "Happy Clients" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="stat-item professional-stat"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.05, ease: "easeOut" }}
                whileHover={{ 
                  scale: 1.03, 
                  y: -3,
                  transition: { duration: 0.2 }
                }}
              >
                <div className="stat-number professional-number">{stat.number}</div>
                <div className="stat-label professional-label">{stat.label}</div>
              </motion.div>
            ))}
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
            <h2 className="section-title professional-title">Our Consulting Services</h2>
            <p className="section-subtitle professional-subtitle">
              Expert environmental consulting services designed to help your business navigate regulations, 
              achieve compliance, and implement sustainable practices that drive growth
            </p>
          </motion.div>

          <div className="services-professional-layout">
            <div className="professional-services-grid">
              {[
                {
                  icon: <Globe className="service-icon" />,
                  title: "Environmental Compliance",
                  description: "Expert guidance on environmental regulations, permits, and compliance requirements to keep your business protected.",
                  features: ["Regulatory Analysis", "Permit Applications", "Compliance Audits"]
                },
                {
                  icon: <Leaf className="service-icon" />,
                  title: "Sustainability Strategy",
                  description: "Develop comprehensive sustainability strategies that align with your business goals and environmental objectives.",
                  features: ["Strategy Development", "Goal Setting", "Implementation Planning"]
                },
                {
                  icon: <CheckCircle className="service-icon" />,
                  title: "Environmental Risk Assessment",
                  description: "Identify and evaluate environmental risks to protect your business and ensure long-term sustainability.",
                  features: ["Risk Identification", "Impact Analysis", "Mitigation Strategies"]
                },
                {
                  icon: <Globe className="service-icon" />,
                  title: "Green Business Consulting",
                  description: "Transform your business operations with sustainable practices that reduce costs and environmental impact.",
                  features: ["Process Optimization", "Resource Efficiency", "Cost Reduction"]
                },
                {
                  icon: <Users className="service-icon" />,
                  title: "Environmental Training",
                  description: "Comprehensive training programs to educate your team on environmental best practices and regulations.",
                  features: ["Staff Training", "Compliance Education", "Best Practices"]
                },
                {
                  icon: <CheckCircle className="service-icon" />,
                  title: "Environmental Reporting",
                  description: "Professional environmental reporting and documentation to meet regulatory requirements and stakeholder expectations.",
                  features: ["ESG Reporting", "Regulatory Reports", "Stakeholder Communication"]
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
            <h2 className="section-title professional-title">Our Success Stories</h2>
            <p className="section-subtitle professional-subtitle">
              Discover how we've helped businesses achieve their environmental goals and reduce their carbon footprint
            </p>
          </motion.div>

          <div className="projects-professional-layout">
            <div className="professional-projects-grid">
              {[
                {
                  title: "Green Manufacturing Initiative",
                  company: "TechCorp Industries",
                  description: "Implemented comprehensive waste reduction and energy efficiency programs, resulting in 40% reduction in carbon emissions.",
                  results: ["40% Carbon Reduction", "60% Waste Reduction", "$2M Annual Savings"],
                  category: "Manufacturing",
                  year: "2023"
                },
                {
                  title: "Sustainable Office Complex",
                  company: "Metro Business Center",
                  description: "Designed and implemented green building solutions including solar panels, rainwater harvesting, and smart energy systems.",
                  results: ["100% Renewable Energy", "50% Water Savings", "LEED Platinum Certified"],
                  category: "Real Estate",
                  year: "2023"
                },
                {
                  title: "Carbon Neutral Supply Chain",
                  company: "Global Logistics Co.",
                  description: "Transformed entire supply chain operations to achieve carbon neutrality through route optimization and green transportation.",
                  results: ["Carbon Neutral", "30% Fuel Savings", "ISO 14001 Certified"],
                  category: "Logistics",
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
              <h2 className="section-title">About Earth Footprint</h2>
              <motion.p 
                className="about-description"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
              >
                We are expert environmental consultants with deep industry knowledge and regulatory expertise. 
                Our mission is to help businesses navigate complex environmental challenges, achieve compliance, 
                and implement sustainable practices that drive both environmental and business success.
              </motion.p>
              <div className="about-values">
                <div className="value-item">
                  <Users className="value-icon" />
                  <div>
                    <h4>Expert Team</h4>
                    <p>Certified environmental professionals with years of industry experience</p>
                  </div>
                </div>
                <div className="value-item">
                  <Award className="value-icon" />
                  <div>
                    <h4>Proven Track Record</h4>
                    <p>Successfully helping businesses achieve compliance and sustainability goals</p>
                  </div>
                </div>
                <div className="value-item">
                  <Globe className="value-icon" />
                  <div>
                    <h4>Comprehensive Approach</h4>
                    <p>End-to-end consulting services from strategy to implementation</p>
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
              <h2 className="section-title">Ready to Achieve Environmental Excellence?</h2>
              <p className="contact-subtitle">
                Partner with our expert environmental consultants to navigate regulations, achieve compliance, 
                and implement sustainable practices that drive your business forward.
              </p>
              <div className="contact-info">
                <div className="contact-item">
                  <MessageCircle className="contact-icon" />
                  <div>
                    <h4>WhatsApp</h4>
                    <p>+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="contact-item">
                  <Globe className="contact-icon" />
                  <div>
                    <h4>Email</h4>
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
                  <input type="text" placeholder="Your Name" required />
                </div>
                <div className="form-group">
                  <input type="email" placeholder="Your Email" required />
                </div>
                <div className="form-group">
                  <input type="tel" placeholder="Phone Number" required />
                </div>
                <div className="form-group">
                  <select required>
                    <option value="">Select Consulting Service</option>
                    <option value="compliance">Environmental Compliance</option>
                    <option value="strategy">Sustainability Strategy</option>
                    <option value="risk">Environmental Risk Assessment</option>
                    <option value="green">Green Business Consulting</option>
                    <option value="training">Environmental Training</option>
                    <option value="reporting">Environmental Reporting</option>
                  </select>
                </div>
                <div className="form-group">
                  <textarea placeholder="Tell us about your project..." rows={4} required></textarea>
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
                  Send Message
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
              <span className="logo-text">Earth Footprint</span>
            </div>
            <p className="footer-text">
              Building a sustainable future, one solution at a time.
            </p>
            <div className="footer-links">
              <a href="#services">Services</a>
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Earth Footprint. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
