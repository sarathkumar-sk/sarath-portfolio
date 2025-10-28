import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Brain, Cpu, Zap, Target } from 'lucide-react';
import BackgroundStars from './BackgroundStars';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });

  const skills = [
    {
      icon: Brain,
      title: 'Autonomous Robotics',
      description: 'Developing intelligent, self-reliant robots capable of real-world decision-making and navigation.',
    },
    {
      icon: Cpu,
      title: 'AI & Machine Learning',
      description: 'Integrating AI and ML models to enable adaptive learning and perception in robotics.',
    },
    {
      icon: Zap,
      title: 'Embedded Systems & IoT',
      description: 'Designing architectures with real-time sensing, communication, and control capabilities.',
    },
    {
      icon: Target,
      title: ' System Integration',
      description: 'Combining hardware, software, and control systems to build efficient, real-world robotic solutions.',
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
    <section id="about" ref={ref} className="py-20 bg-gradient-to-b from-background to-muted/20 relative">
      <BackgroundStars />
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">About Me</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 mx-auto rounded-full" />
        </motion.div>

        <div className="max-w-4xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card rounded-2xl p-8 shadow-card border border-border"
          >
             <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 bg-clip-text text-transparent">
              Career Objective
             </h2>
            <p className="text-lg text-muted-foreground mb-6">
              As a Robotics Engineer with extensive experience in Artificial Intelligence and intelligent systems, I aim to contribute to the design, development, and deployment of efficient, real-world robotic solutions. My expertise spans <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 bg-clip-text text-transparent font-semibold">ROS2</span>, <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 bg-clip-text text-transparent font-semibold">Embedded Systems</span>, <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 bg-clip-text text-transparent font-semibold">Internet of Things</span>, <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 bg-clip-text text-transparent font-semibold">Machine Learning</span>, and <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 bg-clip-text text-transparent font-semibold">Autonomous Robotics</span>, with a strong focus on integrating complex technologies to drive innovation and operational excellence.
            </p>
            
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 bg-clip-text text-transparent">
              Research & Development Interests
            </h2>
            <p className="text-lg text-muted-foreground">
              I am particularly passionate about advancing interactive and autonomous systems, with ongoing research in Human-Robot Interaction (HRI) to develop intuitive, collaborative robotic partners. I am also deeply interested in extending these principles to Space Robotics, focusing on robust autonomous solutions for exploration, in-orbit manufacturing, and planetary operations.
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-card rounded-xl p-6 shadow-card border border-border hover:shadow-glow transition-all duration-300 cursor-pointer"
            >
              <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 p-3 rounded-lg w-fit mb-4">
                <skill.icon className="text-primary-foreground" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">{skill.title}</h3>
              <p className="text-muted-foreground">{skill.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
