import React, { useEffect } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Services from './components/Services';
import Projects from './components/Projects';
import Clients from './components/Clients';
import About from './components/About';
import Numbers from './components/Numbers';
import Contact from './components/Contact';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import SEOHead from './components/SEOHead';
import './styles/shared.css';
import './App.css';
import { Analytics } from "@vercel/analytics/next"

const App = () => {
  // Lazy load non-critical CSS after initial render
  useEffect(() => {
    const loadNonCriticalCSS = () => {
      // Load remaining CSS files after initial paint
      import('./index.css');
    };
    
    // Load after a short delay to ensure critical CSS is rendered first
    const timer = setTimeout(loadNonCriticalCSS, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    
    
    <LanguageProvider>
      <SEOHead />
      <div className="app">
      <Analytics />
        <Navigation/>
        <Hero />
        <Services />
        <Projects />
        <About />
        <Numbers />
        <Contact />
        <Clients />
        <Testimonials />
        <Footer />
      </div>
    </LanguageProvider>
 
  );
};

export default App;
