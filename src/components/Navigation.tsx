import { useState, useEffect, useRef} from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation = () => {
 const [isDark, setIsDark] = useState(false);
 const [isMenuOpen, setIsMenuOpen] = useState(false);
 const [isScrolled, setIsScrolled] = useState(false);
 const [activeSection, setActiveSection] = useState('Home');

 const isClickScrolling = useRef(false);
 const scrollTimer = useRef<NodeJS.Timeout | null>(null);
 useEffect(() => {
  // Initialize dark mode based on state
  if (isDark) {
   document.documentElement.classList.add('dark');
  } else {
   document.documentElement.classList.remove('dark');
  }
 }, [isDark]); // Re-run when isDark changes

 // Original navItems array
 // eslint-disable-next-line react-hooks/exhaustive-deps
 const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Skills', href: '#skills' },
  { name: 'Education', href: '#education' },
  { name: 'Awards', href: '#awards' },
  { name: 'Contact', href: '#contact' },
 ];
 
 // Added variants for the staggered mobile menu items
 const mobileItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
   opacity: 1, 
   x: 0,
   transition: { type: 'spring', stiffness: 300, damping: 25 }
  },
 };

 useEffect(() => {
  const handleScroll = () => {
   setIsScrolled(window.scrollY > 50);
   if (isClickScrolling.current) {
    return;
   }
   // Active section detection logic
   let currentSection = 'Home';
   for (let i = navItems.length - 1; i >= 0; i--) {
    const item = navItems[i];
    const element = document.querySelector(item.href);
    if (element && element.getBoundingClientRect().top <= 100) {
     currentSection = item.name;
     break;
    }
   }
   if (window.scrollY < 200) { // Adjust threshold if needed
    currentSection = 'Home';
   }
   setActiveSection(currentSection);
  };
  
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
 }, [navItems]);

 const toggleTheme = () => {
  setIsDark(prevIsDark => !prevIsDark); // Toggle the state
 };

 const scrollToSection = (href: string, name: string) => {
  const element = document.querySelector(href);
  if (element) {
   // Set active state immediately for the animation
   setActiveSection(name);
   setIsMenuOpen(false);
   
   // Tell scroll handler to ignore this scroll
   isClickScrolling.current = true;
   
   element.scrollIntoView({ behavior: 'smooth' });

   // Clear any existing timer
   if (scrollTimer.current) {
    clearTimeout(scrollTimer.current);
   }

   scrollTimer.current = setTimeout(() => {
    isClickScrolling.current = false;
   }, 1000);
  }
 };

 const scrollToHome = () => {
  const element = document.querySelector('#home');
  if (element) {
   setActiveSection('Home');
   
   // Tell scroll handler to ignore this scroll
   isClickScrolling.current = true;
   
   element.scrollIntoView({ behavior: 'smooth' });

   if (scrollTimer.current) {
    clearTimeout(scrollTimer.current);
   }
   scrollTimer.current = setTimeout(() => {
    isClickScrolling.current = false;
   }, 1000);
  }
 }

 return (
  <motion.nav
   initial={{ y: -100 }}
   animate={{ y: 0 }}
   className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isScrolled
     ? 'bg-transparent'
     : ''
   }`}
  >
   <div className="container mx-auto px-4 py-4">
    <div className="relative flex h-14 items-center justify-between">
     
     {/* === LEFT COLUMN: Logo (Mobile) / Spacer (Desktop) === */}
  <div className="flex-1 md:flex-none">
   <motion.button
   onClick={scrollToHome}
   initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    // We remove the text-styling classes and keep md:hidden
    className="md:hidden"
   >
    {/* Replace the text with an img tag */}
    <img
     src="sk_logo.jpg" // <-- *** UPDATE THIS PATH TO YOUR LOGO ***
     alt="SK Logo"
     // h-9/w-9 = 2.25rem, matching the theme button (p-2 + size=20)
     className="h-9 w-9 object-cover rounded-lg"
    />
   </motion.button>
   </div>

    	{/* === CENTER COLUMN: Desktop Pill Menu === */}
    	<div className={`hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-1 rounded-full p-1.5 shadow-lg backdrop-blur-sm
    	  ${isDark ? 'bg-neutral-900/80' : 'bg-neutral-100/80'}
    	`}>
    	  {navItems.map((item, index) => (
    	    <motion.button
    	      key={item.name}
    	      initial={{ opacity: 0, y: -20 }}
    	      animate={{ opacity: 1, y: 0 }}
    	      transition={{ delay: index * 0.1 }}
    	      onClick={() => scrollToSection(item.href, item.name)}
    	      className={`relative z-10 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300
    	        ${
    	          activeSection === item.name
    	            ? isDark ? 'text-white' : 'text-neutral-900'
    	            : isDark ? 'text-neutral-400 hover:text-white' : 'text-neutral-500 hover:text-neutral-800'
    	        }
    	      `}
    	    >
    	      {activeSection === item.name && (
    	        <motion.div
    	          layoutId="activePill"
    	          className={`absolute inset-0 -z-10 rounded-full 
    	            ${isDark ? 'bg-neutral-700' : 'bg-neutral-300'}
    	          `}
    	          transition={{ type: 'keyframes', stiffness: 200, damping: 50 }}
    	        />
    	      )}
    	      {item.name}
    	    </motion.button>
    	  ))}

    	  <motion.button
    	    initial={{ opacity: 0, y: -20 }}
    	    animate={{ opacity: 1, y: 0 }}
    	    transition={{ delay: navItems.length * 0.1 }}
    	    onClick={toggleTheme}
    	    className={`hidden rounded-full p-2 transition-all duration-300 md:flex
    	      ${isDark 
    	        ? 'bg-neutral-700 hover:bg-primary hover:text-primary-foreground text-white' 
    	        : 'bg-neutral-300 hover:bg-neutral-400 text-neutral-800'}
    	    `}
    	  >
    	    {isDark ? <Sun size={20} /> : <Moon size={20} />}
    	  </motion.button>
    	</div>

    	{/* === RIGHT COLUMN: Toggles (Mobile & Desktop) === */}
   	  <div className="flex flex-1 justify-end items-center gap-4">
   	    
   	    {/* Mobile Toggles */}
   	    <div className="flex items-center gap-4 md:hidden">
   	      <button
   	        onClick={toggleTheme}
   	        className={`rounded-lg p-2 transition-all duration-300
   	          ${isDark 
   	            ? 'bg-card hover:bg-primary hover:text-primary-foreground text-white' 
   	            : 'bg-neutral-200 hover:bg-neutral-300 text-neutral-800'}
   	        `}
   	      >
   	        {isDark ? <Sun size={20} /> : <Moon size={20} />}
   	      </button>
   	      <button
   	        onClick={() => setIsMenuOpen(!isMenuOpen)}
   	        className="rounded-lg bg-card p-2 transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
   	      >
   	        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
   	      </button>
  	      </div>
  	    </div>
  	  </div>

  	  {/* --- MOBILE MENU --- */}
  	  <AnimatePresence>
  	    {isMenuOpen && (
  	      <motion.div
  	        initial={{ opacity: 0, height: 0 }}
  	        animate={{
  	          opacity: 1,
  	          height: 'auto',
  	          transition: {
  	            when: "beforeChildren", // Animate container *before* children
  	            staggerChildren: 0.07, // Stagger items by 0.07s
  	            delayChildren: 0.1, // Wait 0.1s before starting stagger
  	          },
  	        }}
  	        exit={{
  	          opacity: 0,
  	          height: 0,
  	          transition: {
  	            when: "afterChildren", // Animate container *after* children
  	            staggerChildren: 0.05,
  	            staggerDirection: -1, // Stagger out in reverse
	          },
  	        }}
  	        className="mt-4 space-y-2 md:hidden"
  	      >
  	        {navItems.map((item) => (
  	          <motion.button
  	            key={item.name}
  	            variants={mobileItemVariants} // Apply item variants
  	            whileHover={{ x: 5 }} // Nudge right on hover
  	            transition={{ type: 'spring', stiffness: 400 }} // Springy hover
  	            onClick={() => {
  	              setIsMenuOpen(false);
  	              setTimeout(() => scrollToSection(item.href, item.name), 100);
  	            }}
  	            // --- THIS IS THE MODIFIED LINE ---
  	            className={`
  	              block w-full rounded-lg backdrop-blur-sm px-4 py-3 text-left transition-colors duration-300 border border-black dark:border-white
 	              ${
  	                activeSection === item.name
  	                  ? (isDark ? 'bg-white text-neutral-900' : 'bg-neutral-900 text-white') // Active state
  	                  : 'bg-card/70 hover:bg-gradient-primary hover:text-primary-foreground' // Inactive state
  	              }
  	            `}
  	            // --- END OF MODIFICATION ---
  	          >
  	            {item.name}
  	          </motion.button>
 	        ))}
  	      </motion.div>
  	    )}
  	  </AnimatePresence>
  	</div>
 	</motion.nav>
 );
};

export default Navigation;