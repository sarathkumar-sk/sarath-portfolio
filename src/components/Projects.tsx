import { useState, useEffect, useCallback } from 'react'; // --- MODIFICATION: Added useCallback ---
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, Calendar, X, ChevronLeft, ChevronRight, View } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import BackgroundStars from './BackgroundStars';
import Tilt from 'react-parallax-tilt'; // --- Re-added Tilt ---

const ProjectMediaModal = ({ isOpen, onClose, media = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // --- MODIFICATION: This is the primary fix ---
  // Reset index when media changes (e.g., opening a new project)
  // This prevents an out-of-bounds index crash when opening a new project
  useEffect(() => {
    setCurrentIndex(0);
  }, [media]); // The dependency is now `media`, not `isOpen`

  // --- Kept useCallback for stable keyboard handler functions ---
  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);
  }, [media.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % media.length);
  }, [media.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, goToNext, goToPrevious, onClose]); // --- Correct dependencies

  if (!isOpen || media.length === 0) return null;

  // --- This line is now safe ---
  // We are guaranteed to have currentIndex = 0 for any new media array
  const currentItem = media[currentIndex];

  // --- This check is now safe, as currentItem will not be undefined ---
  if (!currentItem) {
    // This is an extra safeguard, though the logic above should prevent it.
    console.error("ProjectMediaModal: currentItem is undefined. This shouldn't happen.");
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-card rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute -top-3 -right-3 z-20 p-1 bg-primary text-primary-foreground rounded-full hover:bg-primary/80 transition-all"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            {/* Media Display Area */}
            <div className="relative w-full h-full max-h-[80vh] flex items-center justify-center p-6">
              {currentItem.type === 'image' ? (
                <img
                  src={currentItem.src}
                  alt={`Project media ${currentIndex + 1}`}
                  className="max-w-full max-h-[75vh] object-contain rounded-md"
                  loading="lazy"
                  onError={(e) => (e.target.style.display = 'none')}
                />
              ) : (
                <video
                  key={currentItem.src}
                  src={currentItem.src}
                  controls
                  className="max-w-full max-h-[75vh] object-contain rounded-md"
                  autoPlay
                  muted
                  loop
                  playsInline
                  onError={(e) => {
                    console.error('Video failed to load:', currentItem.src);
                    e.target.style.display = 'none';
                  }}
                />
              )}
            </div>

            {/* Navigation Arrows */}
            {media.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-card/70 text-foreground rounded-full hover:bg-card transition-all"
                  aria-label="Previous item"
                >
                  <ChevronLeft size={28} />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-card/70 text-foreground rounded-full hover:bg-card transition-all"
                  aria-label="Next item"
                >
                  <ChevronRight size={28} />
                </button>
              </>
            )}

            {/* Counter */}
            {media.length > 1 && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 px-2 py-1 text-xs bg-black/50 text-white rounded-full">
                {currentIndex + 1} / {media.length}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};


const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState([]);

  const openModal = (media) => {
    if (media && media.length > 0) {
      setSelectedMedia(media);
      setIsModalOpen(true);
    }
  };

  // --- MODIFICATION: Kept useCallback for stable props ---
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedMedia([]);
  }, []);

  const projects = [
    // ... (Your projects array, unchanged) ...
    {
      title: 'Autonomous LEO Rover with Robotic Arm',
      date: 'Ongoing',
      description: 'Building a LEO rover with a robotic arm that autonomously navigates using Raspberry Pi, depth camera, and LiDAR. It detects colored blocks, picks them up, and places them in designated positions, integrating real-time sensor data, computer vision, and autonomous navigation for precise operation.',
      technologies: ['ROS2', 'Python', 'Raspberry Pi', 'Deep Learning', 'intel NUC', 'Sensors', 'Computer Vision'],
      category: 'Robotics',
      githubLink: 'https://github.com/sarathkumar-sk/Team_6_AERO62520_RSD_Project',
      thumbnail: '/project9/6338822519002958744.jpg',
      media: [
        { type: 'image', src: '/project9/6338822519002958744.jpg' },
        { type: 'video', src: '/project9/IMG_5167.MOV' },
        { type: 'video', src: '/project9/VID_20251015_174250.mp4' },
        { type: 'video', src: '/project9/VID_20251020_163402.mp4' },
        { type: 'video', src: '/project9/VID_20251022_164226.mp4' },
      ],
    },
    {
      title: 'Fault Detection and Marking System for Metal Sheets',
      date: '2025',
      description:
        'Developed a system using machine vision and deep learning on Jetson Xavier. It achieves 89% accuracy in real-time fault detection and marking with a robotic spray arm, leveraging YOLOv11 for training and an Arduino to control the spray, showcasing integration of AI, robotics, and automation for industrial quality control.',
      technologies: ['Jetson Xavier', 'Deep Learning', 'Computer Vision', 'ROS2', 'Arduino'],
      category: 'AI & Robotics',
      githubLink: 'https://github.com/sarathkumar-sk/Fault_Detection_System',
      thumbnail: '/project8/IMG_20250305_093205.jpg',
      media: [
        { type: 'image', src: '/project8/IMG_20250305_093205.jpg' },
        { type: 'video', src: '/project8/VID_20250305_095119 (1).mp4' },
        { type: 'image', src: '/project8/6338822519002958595.jpg' },
        { type: 'image', src: '/project8/IMG_20250708_154252.jpg' },
        { type: 'video', src: '/project8/video6338822518542965125.mp4' },
        { type: 'video', src: '/project8/VID_20250708_165351.mp4' },
      ],
    },
    {
      title: 'Contactless Measurement System',
      date: '2025',
      description:
        'Developed a precise, non-contact measurement system using two cameras and OpenCV to accurately capture and analyze object shapes and dimensions in real time automatically. The system enables accurate measurements without physical interaction, improving efficiency and safety in industrial and laboratory environments.',
      technologies: ['OpenCV', 'Python', 'Image Processing', 'Jetson Orion Nano'],
      category: 'Computer Vision',
      githubLink: 'https://github.com/sarathkumar-sk/Component_Verification',
      thumbnail: '/project7/6338822519002958594.jpg',
      media: [
        { type: 'image', src: '/project7/6338822519002958594.jpg'},
        { type: 'video', src: '/project7/Dark Classic Minimalist Film Look Wedding Slideshow Video.mp4' },
        { type: 'video', src: '/project7/video6338822518542965152.mp4' },

      ],
    },
    {
      title: 'Nuclear Environment Automation System',
      date: '2024',
      description:
        'Designed an autonomous system integrating vSLAM-based navigation with a robotic arm for precise operations in nuclear environments. The system was simulated and tested in Gazebo, leveraging A* algorithm for efficient path planning, all implemented using ROS to ensure reliable and safe autonomous functionality.',
      technologies: ['vSLAM', 'Gazebo', 'ROS', 'Autonomous Navigation', 'RViz'],
      category: 'Robotics',
      githubLink: 'https://github.com/sarathkumar-sk/NUCLEUS',
      thumbnail: '/project6/Screenshot 2025-10-26 154557.png',
      media: [
        { type: 'image', src: '/project6/Screenshot 2025-10-26 154557.png' },
        { type: 'image', src: '/project6/Screenshot 2025-10-26 154439.png' },
        { type: 'image', src: '/project6/Screenshot 2025-10-26 154519.png' },
        { type: 'image', src: '/project6/Screenshot 2025-10-26 154643.png' },
        { type: 'image', src: '/project6/Screenshot 2025-10-26 154726.png' },
      ],
    },
    {
      title: 'Motion Control for Underwater Robot',
      date: '2024',
      description: 'Developed an underwater robot motion control system using Jetson Nano with SSH control via Ethernet and joystick input. The system calculates wheel speeds based on joystick commands and integrates IMU and encoder data from an Arduino Mega connected to the Jetson, enabling precise and responsive underwater navigation.',
      technologies: ['ROS2', 'Python', 'Raspberry Pi', 'Jetson Nano', 'Sensors', 'Arduino'],
      category: 'Robotics',
      githubLink: 'https://github.com/sarathkumar-sk/Mafkin_ws',
      thumbnail: '/project5/6338822519002958656.jpg',
      media: [
        { type: 'image', src: '/project5/6338822519002958656.jpg'},
        { type: 'video', src: '/project5/video6338822518542965188.mp4' },
        { type: 'video', src: '/project5/video6338822518542965187.mp4' },

      ],
    },
    {
      title: 'Agri-Connect Smart Irrigation System',
      date: '2023',
      description:
        'An IoT-based intelligent irrigation system built with Raspberry Pi, integrating rain sensors, humidity, and soil moisture monitoring. It uses automated algorithms for optimal water management and features a companion app that predicts soil type, enabling efficient and data-driven irrigation for improved crop health and resource conservation.',
      technologies: ['Raspberry Pi', 'IoT', 'Sensors', 'Automation', 'Computer Vision'],
      category: 'Internet of Things',
      githubLink: 'https://github.com/sarathkumar-sk/Automatic_irrigation',
      thumbnail: '/project4/6338822519002958625.jpg',
      media: [
        { type: 'image', src: '/project4/6338822519002958625.jpg' },
        { type: 'image', src: '/project4/6338822519002958622.jpg' },
        { type: 'image', src: '/project4/6338822519002958627.jpg' },
        { type: 'image', src: '/project4/6338822519002958617.jpg' },
        { type: 'image', src: '/project4/6338822519002958618.jpg' },
        { type: 'image', src: '/project4/6338822519002958620.jpg' },
        { type: 'image', src: '/project4/6338822519002958619.jpg' },
      ],
    },
    {
      title: 'E-learn Website',
      date: '2023',
      description:
        'An educational platform built with React and Node.js, offering interactive, personalized, and adaptive learning experiences. It supports multiple languages and provides customized content for different classes, making learning accessible, engaging, effective, and enjoyable for all students.',
      technologies: ['ReactJS', 'ExpressJS', 'MongoDB', 'Node.js'],
      category: 'Web Development',
      githubLink: 'https://github.com/sarathkumar-sk/E-Learn',
      thumbnail: '/project3/6338822519002958708.jpg', 
      media: [
        { type: 'video', src: '/project3/video6338822518542965178.mp4' },
        { type: 'image', src: '/project3/IMG_5390.JPG'},
        { type: 'image', src: '/project3/IMG_20230305_170025.jpg'},
      ],
    },
    {
      title: 'Gesture-Controlled 3-DOF Robotic Arm',
      date: '2022',
      description:
        'A robotic arm with IoT integration, using Python and Raspberry Pi for precise control. It employs computer vision and hand gesture recognition to manipulate objects intuitively, showcasing seamless interaction between hardware, software, and intelligent control systems.',
      technologies: [ 'Python', 'Raspberry Pi', 'IoT', 'Computer Vision'],
      category: 'Computer Vision',
      githubLink: 'https://github.com/sarathkumar-sk/Gesture_Arm_Control',
      thumbnail: '/project2/6338822519002958623.jpg', 
      media: [
        { type: 'image', src: '/project2/6338822519002958624.jpg'},
        { type: 'video', src: '/project2/video6338822518542965130.mp4' },
        { type: 'image', src: '/project2/6338822519002958623.jpg'},
        { type: 'video', src: '/project2/video6336570718729280035.mp4' },
      ],
    },
    {
      title: 'Voice-Controlled Home Automation',
      date: '2021',
      description:
        'A smart home system using Raspberry Pi, IoT, and NLP that lets users control appliances with voice commands. It interprets instructions in real time, enabling seamless, hands-free management of lights, fans, and other devices.',
      technologies: ['IoT', 'NLP', 'Raspberry Pi', 'Python'],
      category: 'Internet of Things',
      githubLink: '',
      thumbnail: '/project1/IMG_20190502_174321.jpg', 
      media: [
        { type: 'image', src: '/project1/IMG_20190502_174321.jpg' },
        { type: 'image', src: '/project1/IMG_20190502_163954.jpg' },
        { type: 'video', src: '/project1/video6336570718729280021.mp4' },
        { type: 'image', src: '/project1/6336570719189273809.jpg' },
      ],
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
    <section id="projects" ref={ref} className="py-20 relative">
      <BackgroundStars />
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Projects</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 mx-auto rounded-full" />
          <p className="text-muted-foreground mt-4 text-lg">
            Innovative solutions across Robotics, AI, and IoT
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* --- Restored original structure with Tilt --- */}
          {projects.map((project, index) => (
            <Tilt
              key={project.title}
              glareEnable={true}
              glareMaxOpacity={0.25}
              scale={1.05}
              transitionSpeed={2500}
              className="rounded-xl h-full"
              disabled={isModalOpen}
            >
              <motion.div
                variants={itemVariants}
                className="h-full"
              >
                <Card className="h-full hover:shadow-glow transition-all duration-300 border-border bg-card flex flex-col">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                      <Badge className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white">
                        {project.category}
                      </Badge>
                      {project.githubLink && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`GitHub repository for ${project.title}`}
                          className="text-muted-foreground hover:text-primary transition-colors flex-shrink-0 ml-2"
                        >
                          <Github size={18} />
                        </a>
                      )}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar size={14} className="mr-1" />
                        {project.date}
                      </div>
                    </div>
                    <CardTitle className="text-xl mt-1">{project.title}</CardTitle>
                    <CardDescription className="text-base pt-2">
                      {project.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex flex-col flex-grow">
                    {/* --- THUMBNAIL SECTION --- */}
                    {project.thumbnail && project.media.length > 0 && (
                      <div
                        className="relative w-full h-48 mb-4 overflow-hidden rounded-md cursor-pointer group border border-border"
                        // --- MODIFICATION: Removed the setTimeout, it's not needed ---
                        onClick={() => openModal(project.media)}
                      >
                        <img
                          src={project.thumbnail}
                          alt={project.title}
                          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 bg-black/0 group-hover:bg-black/50">
                          <View
                            size={28}
                            className="text-white transition-all opacity-0 group-hover:opacity-100 group-hover:scale-110"
                          />
                        </div>
                      </div>
                    )}
                    {/* --- END THUMBNAIL SECTION --- */}

                    <div className="flex justify-between items-end mt-auto pt-4">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>

                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </Tilt>
          ))}
        </motion.div>
      </div>

      {/* --- RENDER THE MODAL --- */}
      <ProjectMediaModal isOpen={isModalOpen} onClose={closeModal} media={selectedMedia} />
    </section>
  );
};

export default Projects;