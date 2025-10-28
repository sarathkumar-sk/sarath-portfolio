import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Skills from '@/components/Skills';
import Education from '@/components/Education';
import Awards from '@/components/Awards';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import IntroCountdown from '@/components/IntroCountdown';

const Index = () => {
  const [showCountdown, setShowCountdown] = useState(true);

  return (
    <>
      <AnimatePresence>
        {showCountdown && (
          <IntroCountdown onComplete={() => setShowCountdown(false)} />
        )}
      </AnimatePresence>
      
      {!showCountdown && (
        <div className="min-h-screen overflow-x-hidden">
          <Navigation />
          <Hero />
          <About />
          <Projects />
          <Experience />
          <Skills />
          <Education />
          <Awards />
          <Contact />
          <Footer />
        </div>
      )}
    </>
  );
};

export default Index;
