import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, MessageCircle, ArrowLeft, Phone, Copy, Check } from 'lucide-react';
import styles from './Contact.module.css';
import logo from '../assets/logo_design_to_use.png';

const Contact = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyNumber = async () => {
    try {
      await navigator.clipboard.writeText('0533778433');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Hide notification after 2 seconds
    } catch (err) {
      console.error('Failed to copy number: ', err);
    }
  };

  return (
    <section id="contact" className={styles.contact}>
      <div className="container">
        {/* Floating Logo */}
        <motion.div
          className={styles.contactFloatingLogo}
          initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
          whileInView={{ opacity: 0.1, scale: 1, rotate: 0 }}
          transition={{ 
            duration: 2, 
            delay: 0.3,
            ease: [0.25, 0.1, 0.25, 1]
          }}
          viewport={{ once: true }}
          whileHover={{ 
            scale: 1.1,
            opacity: 0.18,
            transition: { duration: 0.3 }
          }}
        >
          <img src={logo} alt="بصمة الأرض" className={styles.contactFloatingLogoImage} />
        </motion.div>

        {/* Minimal Header */}
        <motion.div
          className={styles.contactHeaderMinimal}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
        >
          <h2>تواصل معنا</h2>
        </motion.div>

        {/* Side-by-Side Layout: Info + Map */}
        <motion.div 
          className={styles.contactGridLayout}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          viewport={{ once: true }}
        >
          {/* Left Side - Contact Info */}
          <div className={styles.contactInfoSide}>
            {/* Quick Info */}
            <div className={styles.contactQuickInfo}>
              <div className={styles.quickInfoItem}>
                <Globe size={20} />
                <span>القصيم، المملكة العربية السعودية</span>
              </div>
            </div>

            {/* Communication Windows */}
            <div className={styles.communicationWindows}>
              {/* WhatsApp Window */}
              <motion.div
                className={styles.communicationWindow}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.15 }}
                viewport={{ once: true }}
              >
                <motion.a
                  href="https://wa.link/17jq8a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.communicationBtn}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <MessageCircle size={24} />
                  <div className={styles.communicationContent}>
                    <span className={styles.communicationTitle}>نافذة التواصل عبر واتساب</span>
                    <span className={styles.communicationSubtitle}>
                      التواصل غير المباشر عبر الرسائل
                    </span>
                    <span className={styles.communicationNumber}>0597007805</span>
                  </div>
                  <ArrowLeft size={20} />
                </motion.a>
              </motion.div>

              {/* Phone Window */}
              <motion.div
                className={styles.communicationWindow}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <motion.button
                  onClick={handleCopyNumber}
                  className={styles.communicationBtn}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Phone size={24} />
                  <div className={styles.communicationContent}>
                    <span className={styles.communicationTitle}>التواصل المباشر عبر الهاتف</span>
                    <span className={styles.communicationSubtitle}>
                      انقر لنسخ الرقم
                    </span>
                    <span className={styles.communicationNumber}>0533778433</span>
                  </div>
                  {copied ? <Check size={20} /> : <Copy size={20} />}
                </motion.button>
              </motion.div>
            </div>
          </div>

          {/* Right Side - Square Map */}
          <motion.div
            className={styles.contactMapSide}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            viewport={{ once: true }}
          >
            <div className={styles.mapWrapperSquare}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3575.4525134593873!2d43.973797399999995!3d26.3442221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x157f596476ef1083%3A0x1627f4ca3423d980!2z2YXZg9iq2Kgg2KjYtdmF2Kkg2KfZhNin2LHYtiDZhNmE2KfYs9iq2LTYp9ix2KfYqiDYp9mE2KjZitim2YrYqQ!5e0!3m2!1sar!2ssa!4v1760196481123!5m2!1sar!2ssa"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="موقعنا"
              ></iframe>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Copy Notification */}
      {copied && (
        <motion.div
          className={styles.copyNotification}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <Check size={20} />
          <span>تم نسخ الرقم بنجاح!</span>
        </motion.div>
      )}
    </section>
  );
};

export default Contact;

