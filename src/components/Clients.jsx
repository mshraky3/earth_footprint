import React, { useState, useEffect } from 'react';
import './Clients.css';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

// Import all client logos
import clientLogo1 from '../assets/clients/client-logo-1.jpg';
import clientLogo2 from '../assets/clients/client-logo-2.jpg';
import clientLogo3 from '../assets/clients/client-logo-3.jpg';
import clientLogo4 from '../assets/clients/client-logo-4.jpg';
import clientLogo5 from '../assets/clients/client-logo-5.jpg';
import clientLogo6 from '../assets/clients/client-logo-6.jpg';
import clientLogo7 from '../assets/clients/client-logo-7.jpg';
import clientLogo8 from '../assets/clients/client-logo-8.jpg';

// Import company logo
import logo from '../assets/logo_design_to_use.webp';

const Clients = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isSliding, setIsSliding] = useState(false);
  const { t } = useLanguage();

  const clientLogos = [
    { id: 1, logo: clientLogo1, alt: 'Client 1' },
    { id: 2, logo: clientLogo2, alt: 'Client 2' },
    { id: 3, logo: clientLogo3, alt: 'Client 3' },
    { id: 4, logo: clientLogo4, alt: 'Client 4' },
    { id: 5, logo: clientLogo5, alt: 'Client 5' },
    { id: 6, logo: clientLogo6, alt: 'Client 6' },
    { id: 7, logo: clientLogo7, alt: 'Client 7' },
    { id: 8, logo: clientLogo8, alt: 'Client 8' }
  ];

  // Auto-advance carousel with sliding animation
  useEffect(() => {
    if (!isPaused && !isSliding) {
      const interval = setInterval(() => {
        setIsSliding(true);
        setTimeout(() => {
          setCurrentSlide((prev) => (prev + 1) % clientLogos.length);
          setTimeout(() => {
            setIsSliding(false);
          }, 1500); // Match animation duration
        }, 100);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isPaused, isSliding, clientLogos.length]);

  // Get visible logos (6 at a time)
  const getVisibleLogos = () => {
    const visible = [];
    for (let i = 0; i < 6; i++) {
      const logoIndex = (currentSlide + i) % clientLogos.length;
      visible.push(clientLogos[logoIndex]);
    }
    return visible;
  };

  return (
    <section id="clients" className="clients-section">
      <div className="clients-container">
        <h2 className="clients-title">{t('clients.title')}</h2>
        
        {/* Optimized Floating Logo */}
        <motion.div
          className="clients-floating-logo"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.08, scale: 1 }}
          transition={{ 
            duration: 1.5, 
            delay: 0.3,
            ease: [0.25, 0.1, 0.25, 1]
          }}
        >
          <img src={logo} alt="بصمة الأرض" className="clients-logo-image" loading="lazy" />
        </motion.div>

        <div 
          className="clients-track"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className={`clients-track-inner ${isSliding ? 'sliding' : ''}`}>
            {getVisibleLogos().map((client, index) => (
              <div 
                key={`${client.id}-${index}`} 
                className={`client-logo-wrapper ${isSliding ? 'logo-sliding' : ''}`}
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <img 
                  src={client.logo} 
                  alt={client.alt}
                  className="client-logo"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          
          {/* Hidden navigation buttons for auto-clicking */}
          <div className="carousel-controls" style={{ display: 'none' }}>
            <button 
              className="carousel-btn prev-btn"
              onClick={() => setCurrentSlide((prev) => (prev - 1 + clientLogos.length) % clientLogos.length)}
            >
              ‹
            </button>
            <button 
              className="carousel-btn next-btn"
              onClick={() => setCurrentSlide((prev) => (prev + 1) % clientLogos.length)}
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
