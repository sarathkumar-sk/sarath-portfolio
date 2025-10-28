import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, MapPin, Calendar } from 'lucide-react';
import uomBanner from '@/assets/uom-banner.png';
import vitLogo from '@/assets/vit-logo.png';
import schlogo from '@/assets/schoollogo.png';
import BackgroundStars from './BackgroundStars';
import Tilt from 'react-parallax-tilt';

const Education = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });

  const education = [
    {
      degree: 'MSc. Robotics',
      institution: 'The University of Manchester',
      period: 'Sep 2025 – Present',
      location: 'Manchester, UK',
      focus:
        'Robotic Systems, Cognitive Robotics and Computer Vision, Software for Robotics, Machine Learning, Autonomous Mobile Robots, Robotic Manipulators',
      color: 'primary',
      image: uomBanner,
      grade: '',
    },
    {
      degree: 'BTech. Computer Science Engineering',
      institution: 'Vellore Institute of Technology',
      period: 'Sep 2021 – Jun 2025',
      location: 'Chennai, India',
      focus:
        'Data Structures and Algorithms, Operating Systems, Computer Networks, Machine Learning, Natural Language Processing, Sensors and Actuators, Robotics Kinematics, Robot Operating System (ROS), Cognitive Robotics, Robotics Perception',
      color: 'accent',
      image: vitLogo,
      grade: '9.07/10',
    },
    {
      degree: 'High School',
      institution: 'SKNS PMC Vivekananda Vidyalaya',
      period: 'Jun 2019 – Mar 2021',
      location: 'Chennai, India',
      focus: 'Mathematics, Computer Science, Physics, Chemistry, English',
      color: 'secondary',
      image: schlogo,
      grade: '96%',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section
      id="education"
      ref={ref}
      className="py-20 bg-gradient-to-b from-background to-muted/20 relative"
    >
      <BackgroundStars />
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Education</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 mx-auto rounded-full" />
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="relative max-w-5xl mx-auto"
        >
          {/* --- MODIFICATION: Nudged line 4px left --- */}
          <motion.div
            className="absolute left-[calc(50%-4px)] top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 via-pink-500 to-orange-400 transform -translate-x-1/2"
            style={{ originY: 0 }}
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
          />

          {education.map((edu, index) => {
            const isLeft = index % 2 === 0; // alternate sides

            return (
              <motion.div
                key={edu.degree}
                variants={itemVariants}
                className="relative flex flex-col md:flex-row items-center mb-20 md:mb-24"
              >
                {/* --- MODIFICATION: Nudged dot 4px left --- */}
                <motion.div
                  className="absolute left-[calc(50%-18px)] transform -translate-x-1/2 z-10"
                  animate={{
                    scale: [1, 1.2, 1],
                    transition: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.3
                    }
                  }}
                >
                  <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 border-4 border-background rounded-full w-8 h-8 shadow-lg flex items-center justify-center">
                    <GraduationCap size={18} className="text-white" />
                  </div>
                </motion.div>

                <Tilt
                  glareEnable={true}
                  glareMaxOpacity={0.25}
                  scale={1.05}
                  transitionSpeed={2500}
                  className={`w-full md:w-[45%] z-10 ${
                    isLeft ? 'md:mr-auto md:order-1' : 'md:ml-auto md:order-2'
                  }`}
                >
                  {/* Education Card */}
                  <div
                    className="bg-card rounded-xl p-6 shadow-card border border-border hover:shadow-glow transition-all duration-300 h-full flex flex-col items-center text-center"
                  >
                    {edu.image && (
                      <div className="flex justify-center mb-4">
                        <img
                          src={edu.image}
                          alt={edu.institution}
                          className="h-16 object-contain"
                        />
                      </div>
                    )}

                    <h3 className="text-xl font-bold mb-1">{edu.degree}</h3>
                    <p className="text-purple-500 mb-3">{edu.institution}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      <span className="font-semibold text-foreground">Focus Areas:</span>{' '}
                      {edu.focus}
                      {edu.grade && (
                        <>
                          <br />
                          <span className="font-semibold text-foreground">Grade:</span>{' '}
                          {edu.grade}
                        </>
                      )}
                    </p>
                  </div>
                </Tilt>

                {/* --- MODIFICATION: Adjusted alignment for date & location to match new center --- */}
                <div
                  className={`hidden md:flex flex-col text-muted-foreground text-sm font-medium absolute top-1/2 transform -translate-y-1/2 w-[40%] ${
                    isLeft
                      ? 'left-[calc(50%-4px+20px)] items-start pl-6 text-left' // = left-[calc(50%+16px)]
                      : 'right-[calc(50%+4px+20px)] items-end pr-6 text-right' // = right-[calc(50%+24px)]
                  }`}
                >
                  <p className="flex items-center gap-1">
                    <Calendar size={14} /> {edu.period}
                  </p>
                  <p className="flex items-center gap-1 mt-1">
                    <MapPin size={14} /> {edu.location}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Education;