import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
// --- CHANGED ---
// Removed 'ExternalLink' as it's no longer used
import { Trophy, Award, Medal, X } from 'lucide-react';
// --- END CHANGE ---
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import BackgroundStars from './BackgroundStars';
import { useState } from 'react';
import Tilt from 'react-parallax-tilt';

const Awards = () => {
 // --- State for Modal ---
 const [selectedCert, setSelectedCert] = useState<string | null>(null);
 // --- END ---

 // Give each main animated block its own ref and inView state
 const [titleRef, titleInView] = useInView({
  triggerOnce: false,
  threshold: 0.3,
 });

 const [awardsRef, awardsInView] = useInView({
  triggerOnce: false,
  threshold: 0.3,
 });

 // This threshold is low (0.05) to fix mobile visibility
 const [certsRef, certsInView] = useInView({
  triggerOnce: false,
  threshold: 0.05,
 });

 const awards = [
  {
   title: 'CSI Product Development Hackathon',
   year: '2023',
   award: '1st Prize',
   description: 'Achieved top honors (First Place) for the development of a novel e-learning platform, recognized for its innovative approach to education.',
   icon: Trophy,
   certificateLink: '/certificate/awardcsi.png',
  },
  {
   title: 'e-Yantra Robotics Competition',
   year: '2024',
   award: 'Finalist',
   description: '"Learning while Competing" initiative by IIT Bombay. Our team placed in the Top 50 nationwide by successfully designing, simulating a robot for a complex real-world theme.',
   icon: Medal,
   certificateLink: '/certificate/eyantra.jpg',
  },
 ];

 const certifications = [
  {
   title: 'Wildlife Ecology',
   issuer: 'NPTEL',
   date: 'October 2024',
   icon: Award,
   certificateLink: '/certificate/wildlife.jpg',
  },
  {
   title: 'ROS2 Programming Intern',
   issuer: 'Mafkin Robotics',
   date: 'September 2024',
   icon: Award,
   certificateLink: '/certificate/mafkin.jpg',
  },
  {
   title: 'RPA Developer Intern',
   issuer: 'Tata Consultancy Services',
   date: 'November 2023',
   icon: Award,
   certificateLink: '/certificate/tcs.jpg',
  },
  {
   title: 'Google Cloud Computing',
   issuer: 'NPTEL',
   date: 'October 2023',
   icon: Award,
   certificateLink: '/certificate/cloud.jpg',
  },
  {
   title: 'Enterprise Automation',
   issuer: 'Workato',
   date: 'June 2023',
   icon: Award,
   certificateLink: '/certificate/work.png',
  },
  {
   title: 'Skill Development Workshop on UAV',
   issuer: 'The American Society of Mechanical Engineers',
   date: 'June 2023',
   icon: Award,
   certificateLink: '/certificate/asme.png',
  },
  {
   title: 'RPA Developer',
   issuer: 'UiPath',
   date: 'May 2023',
   icon: Award,
   certificateLink: '/certificate/rpa.png',
  },
  {
   title: 'Diploma in Computer Application ',
   issuer: 'Apollo Computer Education Ltd.',
   date: 'July 2021',
   icon: Award,
   certificateLink: '/certificate/cs.jpg',
  },
  {
   title: 'Face Recognition Application',
   issuer: 'GUVI',
   date: 'April 2021',
   icon: Award,
   certificateLink: '/certificate/guvi.png',
  },
  {
   title: 'IoT Foundations',
   issuer: 'SP Robotics Maker Lab',
   date: 'May 2019',
   icon: Award,
   certificateLink: '/certificate/sp.png',
  },
 ];

 const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
   opacity: 1,
   transition: {
    staggerChildren: 0.1,
   },
  },
 };

 const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
   opacity: 1,
   y: 0,
   transition: {
    duration: 0.5,
   },
  },
 };

 return (
  <section id="awards" className="py-20 relative">
   <BackgroundStars />
   <div className="container mx-auto px-4">
    <motion.div
     ref={titleRef}
     initial={{ opacity: 0, y: -20 }}
     animate={titleInView ? { opacity: 1, y: 0 } : {}}
     transition={{ duration: 0.6 }}
     className="text-center mb-16"
    >
     <h2 className="text-4xl md:text-5xl font-bold mb-4">Achievements & Certifications</h2>
     <div className="w-24 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 mx-auto rounded-full" />
    </motion.div>

    {/* Awards */}
    <motion.div
     ref={awardsRef}
     variants={containerVariants}
     initial="hidden"
     animate={awardsInView ? "visible" : "hidden"}
     className="max-w-4xl mx-auto mb-12"
    >
     <h3 className="text-2xl font-bold mb-6 text-center"> Achievements</h3>
     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {awards.map((award) => (
       <motion.div key={award.title} variants={itemVariants} whileHover={{ scale: 1.02 }}>
        <Card className="h-full hover:shadow-glow transition-all duration-300 border-border bg-card">
         <CardHeader>
          <div className="flex items-center gap-3 mb-2">
           <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 p-3 rounded-lg">
            <award.icon className="text-primary-foreground" size={24} />
           </div>
           <div>
            <CardTitle className="text-xl">{award.title}</CardTitle>
            <p className="text-sm text-muted-foreground">{award.year}</p>
           </div>
          </div>
          <p className="text-2xl font-bold text-primary">{award.award}</p>
         </CardHeader>
         <CardContent>
          <CardDescription className="text-base">{award.description}</CardDescription>
          {award.certificateLink && (
           // --- CHANGED ---
           // Removed 'asChild' prop and <a> tag
           // Added onClick handler to open the modal
           <Button
            variant="outline"
            size="sm"
            className="mt-4 hover:bg-gradient-to-r hover:from-purple-500 hover:via-pink-500 hover:to-orange-400 hover:text-white hover:border-transparent"
            onClick={() => setSelectedCert(award.certificateLink)}
           >
            View Certificate
            {
             /* <ExternalLink /> removed as it now opens a modal */
            }
           </Button>
           // --- END CHANGE ---
          )}
         </CardContent>
        </Card>
       </motion.div>
      ))}
     </div>
    </motion.div>

    {/* Certifications (No changes here) */}
    <motion.div
     ref={certsRef}
     variants={containerVariants}
     initial="hidden"
     animate={certsInView ? "visible" : "hidden"}
     className="max-w-5xl mx-auto"
    >
     <h3 className="text-2xl font-bold mb-6 text-center">Certifications</h3>
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {certifications.map((cert) => (
       <Tilt
        key={cert.title}
        perspective={1000}
        scale={1.05}
        transitionSpeed={1500}
        glareEnable={true}
        glareMaxOpacity={0.2}
        tiltMaxAngleX={20}
        tiltMaxAngleY={20}
       >
        <motion.div
         variants={itemVariants}
         className="bg-card rounded-lg shadow-card border border-border hover:shadow-glow transition-all duration-300 overflow-hidden h-full"
        >
         {/* 1. Thumbnail Image (Clickable for modal) */}
         <img
          src={cert.certificateLink}
          alt={`${cert.title} thumbnail`}
          className="w-full h-40 object-cover object-top cursor-pointer"
          onClick={() => setSelectedCert(cert.certificateLink)}
         />

         {/* 2. Content Area (with padding) */}
       <div className="p-4">
          {/* Title, Issuer, and Date */}
          <div>
           <p className="font-semibold">{cert.title}</p>
           <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm text-muted-foreground mt-1">
            <span className="sm:pr-2">{cert.issuer}</span>
            <span className="flex-shrink-0">{cert.date}</span>
           </div>
          </div>
         </div>
        </motion.div>
       </Tilt>
      ))}
     </div>
    </motion.div>
   </div>

   {/* --- MODAL (No Changes) --- */}
   <AnimatePresence>
    {selectedCert && (
     <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={() => setSelectedCert(null)} // This closes modal on backdrop click
     >
      <motion.button
       initial={{ opacity: 0, scale: 0.5 }}
       animate={{ opacity: 1, scale: 1 }}
       exit={{ opacity: 0, scale: 0.5 }}
       className="absolute top-4 right-4 z-[51] p-2 rounded-full bg-black/50 text-white hover:bg-black/75 transition-colors"
       onClick={() => setSelectedCert(null)}
       aria-label="Close certificate view"
      >
       <X size={24} />
      </motion.button>

      <motion.img
     	 initial={{ scale: 0.5, opacity: 0 }}
      	 animate={{ scale: 1, opacity: 1 }}
      	 transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      	 src={selectedCert}
      	 alt="Certificate"
  	    	 className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl"
      	 onClick={(e) => e.stopPropagation()} // Stops click on image from closing modal
     	/>
   	 </motion.div>
   	)}
 	 </AnimatePresence>
 	 {/* --- END MODAL --- */}
 </section>
);
};

export default Awards;