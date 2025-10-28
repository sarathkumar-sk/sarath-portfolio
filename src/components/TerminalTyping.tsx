import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TerminalTypingProps {
  text: string;
  delay?: number;
  speed?: number;
}

const TerminalTyping = ({ text, delay = 0, speed = 50 }: TerminalTypingProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let currentIndex = 0;
      
      const typingInterval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTypingComplete(true);
        }
      }, speed);

      return () => clearInterval(typingInterval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, delay, speed]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay / 1000 }}
      className="relative max-w-3xl mx-auto mb-8"
    >
      <div className="terminal-window bg-card/50 backdrop-blur-sm rounded-lg border border-primary/20 shadow-glow overflow-hidden">
        {/* Terminal Header */}
        <div className="terminal-header bg-primary/10 px-4 py-2 flex items-center gap-2 border-b border-primary/20">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-xs text-muted-foreground ml-2 font-mono">bash</span>
        </div>

        {/* Terminal Body */}
        <div className="terminal-body p-4 font-mono text-sm md:text-base">
          <div className="flex items-start gap-2">
            <span className="text-primary font-bold select-none">$</span>
            <div className="flex-1">
              <span className="text-foreground">{displayedText}</span>
              <motion.span
                animate={{ opacity: isTypingComplete ? [1, 0, 1] : 1 }}
                transition={{
                  duration: 0.8,
                  repeat: isTypingComplete ? Infinity : 0,
                  ease: "linear"
                }}
                className="inline-block w-2 h-5 bg-primary ml-0.5 align-middle"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TerminalTyping;
