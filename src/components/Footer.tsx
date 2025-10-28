import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: Github,
      href: 'https://github.com/sarathkumar-sk',
      label: 'GitHub',
    },
    {
      icon: Linkedin,
      href: 'https://linkedin.com/in/sarath-kumar-sk',
      label: 'LinkedIn',
    },
    {
      icon: Mail,
      href: 'mailto:sarathkumarsenthilkavitha@gmail.com',
      label: 'Email',
    },
  ];

  return (
    <footer className="bg-card border-t border-border py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-6">
          {/* Social Links */}
          <div className="flex gap-4">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-3 bg-muted rounded-lg hover:bg-gradient-primary hover:text-primary-foreground transition-all duration-300"
                aria-label={link.label}
              >
                <link.icon size={20} />
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center text-muted-foreground"
          >
            <p className="flex items-center gap-2 justify-center">
              © {currentYear} Sarath Kumar - Engineered for the future, powered by code, sensors, and a bit of curiosity. 🚀
          
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
