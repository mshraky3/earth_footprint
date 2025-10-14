import React from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Services from './components/Services';
import Projects from './components/Projects';
import Clients from './components/Clients';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './styles/shared.css';
import './App.css';

const App = () => {
  return (
    <div className="app professional-theme">
      <Navigation />
      <Hero />
      <Services />
      <Projects />
      <About />
      <Contact />
      <Clients />
      <Footer />
    </div>
  );
};

export default App;
