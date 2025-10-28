import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import profilePhoto from '@/assets/profile-photo.jpg';
import TerminalTyping from '@/components/TerminalTyping';

const greetings = [
  { text: 'Hi,', lang: 'English' },
  { text: 'வணக்கம்,', lang: 'Tamil' },
  { text: 'こんにちは,', lang: 'Japanese' },
  { text: 'Bonjour,', lang: 'French' },
  { text: 'Hola,', lang: 'Spanish' },
  { text: '你好,', lang: 'Chinese' },
  { text: 'नमस्ते,', lang: 'Hindi' },
  { text: '안녕하세요,', lang: 'Korean' },
  { text: 'Ciao,', lang: 'Italian' },
  { text: 'Olá,', lang: 'Portuguese' },
  { text: 'Привет,', lang: 'Russian' },
  { text: 'مرحبا,', lang: 'Arabic' },
  { text: 'Hallo,', lang: 'German' },
  { text: 'Hej,', lang: 'Swedish' },
  { text: 'Γεια σου,', lang: 'Greek' },
  { text: 'שלום,', lang: 'Hebrew' },
  { text: 'Hello,', lang: 'English' },
];

const Hero = () => {
  const [currentGreeting, setCurrentGreeting] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGreeting((prev) => (prev + 1) % greetings.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 pb-24">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-hero opacity-50" />
      
      {/* Animated circles */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl"
      />

      <div className="container mx-auto px-4 z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Profile Photo with 3D Effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex justify-center"
          >
            <motion.div
              whileHover={{ rotateY: 15, rotateX: 10, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              style={{ transformStyle: "preserve-3d" }}
              className="relative w-48 h-48 md:w-56 md:h-56"
            >
              {/* Animated dotted circles */}
            <motion.svg
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 w-full h-full"
              style={{ transform: "translateZ(10px)" }}
            >
              <circle
                cx="50%"
                cy="50%"
                r="55%"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                strokeDasharray="4 8"
                opacity="0.6"
              />
            </motion.svg>
            <motion.svg
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 w-full h-full"
              style={{ transform: "translateZ(10px)" }}
            >
              <circle
                cx="50%"
                cy="50%"
                r="55%"
                fill="none"
                stroke="hsl(var(--accent))"
                strokeWidth="2"
                strokeDasharray="6 10"
                opacity="0.4"
              />
            </motion.svg>



              <div className="absolute inset-0 bg-gradient-primary rounded-full blur-xl opacity-50" />
              <img
                src={profilePhoto}
                alt="Sarath Kumar S K"
                className="relative w-full h-full rounded-full object-cover border-4 border-primary shadow-glow"
                style={{ transform: "translateZ(20px)" }}
              />
            </motion.div>
          </motion.div>

          {/* Animated greeting */}
          <motion.div
            key={currentGreeting}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent"
          >
            {greetings[currentGreeting].text}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            I'm <span className="bg-gradient-primary bg-clip-text text-transparent">Sarath Kumar</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto"
          >
      
          </motion.p>
          <TerminalTyping 
            text="Robotics Engineer focused on AI-driven automation and intelligent system design, developing innovative, real-world robotic solutions that enhance efficiency."
            delay={400}
            speed={30}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-lg md:text-xl font-medium mb-12 bg-gradient-primary bg-clip-text text-transparent"
          >
            Robotics | Artificial Intelligence | Automation | Embedded Programming
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              asChild
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg"
            >
              <a href="/sarath-kumar-cv.pdf" download="Sarath_Kumar_SK_CV.pdf">
                Download CV
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection('contact')}
              className="border-2 border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-lg"
            >
              Contact Me
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-9 inset-x-0 flex justify-center cursor-pointer"
        onClick={() => scrollToSection('about')}
      >
        <ChevronDown size={32} className="text-primary" />
      </motion.div>
    </section>
  );
};

export default Hero;
