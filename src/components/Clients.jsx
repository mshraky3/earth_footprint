import React from 'react';
import './Clients.css';
import { motion } from 'framer-motion';

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
import logo from '../assets/logo_design_to_use.png';

const Clients = () => {
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

  return (
    <section className="clients-section">
      <div className="clients-container">
        <h2 className="clients-title">عملاؤنا</h2>
        
        {/* Floating Logo */}
        <motion.div
          className="clients-floating-logo"
          initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
          animate={{ opacity: 0.12, scale: 1, rotate: 0 }}
          transition={{ 
            duration: 2, 
            delay: 0.5,
            ease: [0.25, 0.1, 0.25, 1]
          }}
          whileHover={{ 
            scale: 1.1,
            opacity: 0.2,
            transition: { duration: 0.3 }
          }}
        >
          <img src={logo} alt="بصمة الأرض" className="clients-logo-image" />
        </motion.div>

        <div className="clients-grid">
          {clientLogos.map((client) => (
            <div key={client.id} className="client-logo-wrapper">
              <img 
                src={client.logo} 
                alt={client.alt}
                className="client-logo"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;
