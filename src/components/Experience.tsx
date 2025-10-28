import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase, MapPin, ExternalLink } from 'lucide-react';
import BackgroundStars from './BackgroundStars';

import bimetalLogo from '@/assets/bimetal_logo.png';
import mafkinLogo from '@/assets/mafkin_logo.png';
import tcsLogo from '@/assets/tcs_logo.png';

const Experience = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const experiences = [
    {
      company: 'Vellore Institute of Technology – Bimetal Pvt. Ltd.',
      role: 'Robotics Engineer Intern',
      period: 'Jan 2025 – Aug 2025',
      location: 'Chennai, India',
      logo: bimetalLogo,
      companyUrl: 'https://www.bimite.co.in/',
      achievements: [
        'Utilized a Hikrobot (MV-CS050-10UC) industrial machine vision camera to capture high-framerate images of the metal sheets as they moved down the production line.',
        'Developed and trained a custom YOLO-based object detection model to identify and classify various types of defects (scratches, dents, etc.).',
        'Deployed this model onto an NVIDIA Jetson Xavier Industrial platform for real-time edge inference without a cloud server.',
        'When the AI model detected a fault, the Jetson signaled the Arduino, which controlled relays to activate a spray marker, marking the defected area of the metal sheet.',
        'The final system achieved an 89% accuracy rate in detecting and localizing defects in real-time.',
      ],
      certificateLink: '',
    },
    {
      company: 'Mafkin Robotics',
      role: 'ROS2 Programming Intern',
      period: 'Jun 2024 – Aug 2024',
      location: 'Chennai, India',
      logo: mafkinLogo,
      companyUrl: 'https://www.mafkinrobotics.com/',
      achievements: [
        'Integrated a multi-sensor array, including an IMU (Inertial Measurement Unit), ArduCam, and Wheel Encoders.',
        'Implemented sensor fusion techniques for precise localization and real-time mapping (SLAM) of the hull surface.',
        'Developed a Python script to enable joystick-based remote teleoperation via secure Ethernet (SSH).',
        'Utilized RViz to visualize live sensor data, robot state, and mapping for debugging navigation and control algorithms.',
        'Demonstrated accurate real-time localization on a complex surface using sensor fusion.',
      ],
      certificateLink:
        '',
    },
    {
      company: 'Tata Consultancy Services (TCS)',
      role: 'RPA Developer Intern',
      period: 'Aug 2023 – Nov 2023',
      location: 'Chennai, India',
      logo: tcsLogo,
      companyUrl: 'https://www.tcs.com/',
      achievements: [
        'Designed, developed, tested, and deployed 15 end-to-end RPA workflows using UiPath Studio for data entry, report generation, and system integration.',
        'Collaborated with cross-functional teams to analyze business processes, map automation flows, and gather detailed requirements.',
        'Authored Solution Design Documents (SDD) and provided production support for deployed bots, ensuring long-term reliability.',
        'Achieved UiPath Certified RPA Associate (UiRPA) status, demonstrating solid RPA development and deployment expertise.',
      ],
      certificateLink:
        '',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section id="experience" ref={ref} className="py-20 relative">
      <BackgroundStars />
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Work Experience
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 mx-auto rounded-full" />
        </motion.div>

        {/* Experience Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto"
        >
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-card rounded-2xl p-6 shadow-card border border-border hover:shadow-glow transition-all duration-300"
            >
              {/* Top Section */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold mb-1">{exp.role}</h3>
                  <p className="text-purple-500 text-sm font-medium">{exp.company}</p>
                  <p className="text-muted-foreground text-sm mt-1 flex items-center gap-1">
                    <Briefcase size={14} /> {exp.period}
                  </p>
                  <p className="text-muted-foreground text-sm flex items-center gap-1">
                    <MapPin size={14} /> {exp.location}
                  </p>
                </div>

                {/* Company Logo (Clickable) */}
                <a
                  href={exp.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 ml-4"
                >
                  <img
                    src={exp.logo}
                    alt={`${exp.company} logo`}
                    className="w-20 h-20 object-contain rounded-lg hover:scale-105 transition-transform duration-300"
                  />
                </a>
              </div>

              {/* Achievements */}
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                {exp.achievements.map((achievement, i) => (
                  <li key={i}>{achievement}</li>
                ))}
              </ul>

              {/* Certificate Button (if available) */}
              {exp.certificateLink && (
                <div className="mt-6 flex justify-center">
                  <motion.a
                    href={exp.certificateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:text-primary-foreground hover:bg-primary px-4 py-2 rounded-full border border-primary transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    View Certificate
                    <ExternalLink size={16} />
                  </motion.a>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
