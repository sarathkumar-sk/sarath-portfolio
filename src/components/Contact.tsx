import { useState, FormEvent } from 'react';
import { motion, Variants } from 'framer-motion'; // Import Variants
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, Linkedin, Github, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import emailjs from '@emailjs/browser';
import { ContactBackground } from '@/components/ContactBackground';

// 1. Define all animation variants
// This object will control the whole section's orchestration
const sectionContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Stagger the header, then the grid
    },
  },
};

// Header ("Get In Touch")
const headerVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// Grid (container for info and form)
const gridVariants: Variants = {
  hidden: {}, // No initial state needed, just used for staggering
  visible: {
    transition: {
      staggerChildren: 0.2, // Stagger the info column, then the form column
    },
  },
};

// Info Block (Left Column)
const infoColumnVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1, // Stagger the contact items *inside* this column
    },
  },
};

// Form Block (Right Column)
const formColumnVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

// Individual Contact Item
const contactItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });

  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: FormEvent) => {
    // ... (Your handleSubmit function is perfect, no changes needed)
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(
        'service_6qx3f7k',
        'template_vrzaxur',
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        '39spmISJIeucggpB5'
      );

      toast({
        title: 'Message sent successfully!👍',
        description: "I'll get back to you as soon as possible.",
      });

      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast({
        title: 'Failed to send message',
        description: 'Please try again or contact me directly.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    // ... (Your contactInfo array is perfect, no changes needed)
    {
      icon: Mail,
      label: 'Email',
      value: 'sarathkumarsenthilkavitha@gmail.com',
      href: 'mailto:sarathkumarsenthilkavitha@gmail.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+44 7810 821988',
      href: 'tel:+447810821988',
    },
    {
      icon: Linkedin,
      label: 'sarath-kumar-sk',
      value: 'Connect on LinkedIn',
      href: 'https://linkedin.com/in/sarath-kumar-sk',
    },
    {
      icon: Github,
      label: 'sarathkumar-sk',
      value: 'View GitHub Profile',
      href: 'https://github.com/sarathkumar-sk',
    },
  ];

  return (
    // 2. The ref is still on the <section>
    <section id="contact" ref={ref} className="relative py-20 bg-gradient-to-b from-background to-muted/20">
      <ContactBackground />
      {/*
        3. The main <motion.div> now controls the "inView" animation
           and orchestrates its children using variants.
      */}
      <motion.div
        className="container mx-auto px-4"
        variants={sectionContainerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {/* 4. This child uses its variant, inheriting the "hidden" and "visible" states */}
        <motion.div
          variants={headerVariants}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full" />
          <p className="text-muted-foreground mt-4 text-lg">
            Let's discuss our next robotics or AI project
          </p>
        </motion.div>

        {/* 5. We wrap the grid in a motion.div to stagger the two columns */}
        <motion.div
          variants={gridVariants}
          className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {/* 6. Info column uses its variant, which *also* staggers its children */}
          <motion.div
            variants={infoColumnVariants}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
            {contactInfo.map((info) => (
              // 7. The contact items use their variant, inheriting from infoColumnVariants
              <motion.a
                key={info.label}
                variants={contactItemVariants} // Changed from inline animation
                href={info.href}
                target={info.href.startsWith('http') ? '_blank' : undefined}
                rel={
                  info.href.startsWith('http')
                    ? 'noopener noreferrer'
                    : undefined
                }
                whileHover={{ x: 5 }}
                className="flex items-center gap-4 p-4 bg-card rounded-lg shadow-card border border-border hover:shadow-glow transition-all duration-300"
              >
                <div className="bg-gradient-primary p-3 rounded-lg">
                  <info.icon className="text-primary-foreground" size={24} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{info.label}</p>
                  <p className="font-medium break-all">{info.value}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* 8. The form column simply uses its variant */}
          <motion.div
            variants={formColumnVariants}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* ... (Your form inputs are perfect, no changes needed) ... */}
              <div>
                <Input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="bg-card border-border"
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="bg-card border-border"
                />
              </div>
              <div>
                <Input
                  type="text"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  required
                  className="bg-card border-border"
                />
              </div>
              <div>
                <Textarea
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                  rows={6}
                  className="bg-card border-border resize-none"
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                size="lg"
              >
                {isSubmitting ? (
                  'Sending...'
                ) : (
                  <>
                    Send Message <Send size={18} className="ml-2" />
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact;