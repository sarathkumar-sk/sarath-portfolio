import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code2, Wrench, Layers, Database } from 'lucide-react';
import BackgroundStars from './BackgroundStars';
import Tilt from 'react-parallax-tilt'; // 3D tilt effect

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: false, // now animation happens every time you scroll in
    threshold: 0.1,
  });

  const skillCategories = [
    {
      icon: Code2,
      title: 'Languages',
      skills: ['Python', 'C', 'C++', 'Java', 'JavaScript', 'SQL', 'Shell Scripting'],
      color: 'primary',
    },
    {
      icon: Layers,
      title: 'Frontend',
      skills: ['ReactJS', 'HTML', 'CSS', 'Bootstrap', 'PyQt5', 'Tailwind CSS'],
      color: 'accent',
    },
    {
      icon: Wrench,
      title: 'Tools & Frameworks',
      skills: ['UiPath', 'ROS', 'ROS2', 'Arduino', 'Raspberry Pi', 'Nvidia Jetson', 'Firebase', 'PyTorch', 'Gazebo', 'RViz'],
      color: 'orange',
    },
    {
      icon: Database,
      title: 'Domains',
      skills: ['SLAM', 'Machine Learning', 'Deep Learning', 'NLP', 'IoT', 'Embedded Systems', 'Computer Vision', 'Sensor Fusion'],
      color: 'primary',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: 15 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section id="skills" ref={ref} className="py-20 relative">
      <BackgroundStars />
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Skills & Expertise</h2>
          <div className="w-28 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 mx-auto rounded-full" />
        </motion.div>

        {/* Skill Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto"
        >
          {skillCategories.map((category) => (
            <Tilt
              key={category.title}
              glareEnable={true}
              glareMaxOpacity={0.25}
              scale={1.05}
              transitionSpeed={2500}
              className="rounded-xl"
            >
              <motion.div
                variants={itemVariants}
                className={`bg-card rounded-xl p-6 shadow-xl border border-border hover:shadow-glow transition-all duration-500 cursor-pointer`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 p-3 rounded-lg`}>
                    <category.icon className="text-white" size={28} />
                  </div>
                  <h3 className="text-2xl font-bold">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, index) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: index * 0.1, type: 'spring', stiffness: 200 }}
                      className="px-3 py-1.5 bg-muted rounded-full text-sm font-medium hover:bg-gradient-to-r hover:from-purple-500 hover:via-pink-500 hover:to-orange-400 hover:text-white transition-all duration-300 cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </Tilt>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
