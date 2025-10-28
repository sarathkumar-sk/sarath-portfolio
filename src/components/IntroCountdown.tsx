import { useState, useEffect } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  animate,
} from 'framer-motion';

interface IntroCountdownProps {
  onComplete: () => void;
}

// Define the lines to be typed out
const lines = [
  "> booting system...",
  "> loading assets...",
  "> initializing Sarath's portfolio...",
  "> initializing welcome protocol...",
  '> ',
  '> Welcome :)',
];

/**
 * A component that animates a single line of text as if it's being typed,
 * then calls onComplete.
 */
function AnimatedLine({
  text,
  onComplete,
}: {
  text: string;
  onComplete: () => void;
}) {
  const count = useMotionValue(0);
  const animatedText = useTransform(count, (latest) =>
    text.slice(0, Math.round(latest))
  );
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const controls = animate(count, text.length, {
      type: 'tween',
      duration: text.length * 0.05, // Adjust typing speed here
      ease: 'linear',
      onComplete: () => {
        // Hide cursor for this line and call parent onComplete
        setShowCursor(false);
        onComplete();
      },
    });
    return () => controls.stop();
  }, [text, count, onComplete]);

  return (
    <span className="relative">
      {/* The animated text */}
      <motion.span
        // <-- 1. ADD GRADIENT CLASSES HERE
        className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent"
      >
        {animatedText}
      </motion.span>
      {/* Blinking cursor that appears only while typing */}
      <AnimatePresence>
        {showCursor && <BlinkingCursor />}
      </AnimatePresence>
    </span>
  );
}

function BlinkingCursor() {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.5,
        repeat: Infinity,
        repeatType: 'reverse',
      }}
      // Use a solid, high-contrast color for the cursor
      className="absolute right-0 inline-block w-[2px] h-[1em] -mr-2 bg-pink-500 translate-y-0.5"
    >
      &nbsp;
    </motion.span>
  );
}

const IntroCountdown = ({ onComplete }: IntroCountdownProps) => {
  const [completedLines, setCompletedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  // This callback is triggered by AnimatedLine when it finishes typing
  const handleLineComplete = () => {
    // Add the just-completed line to the static list
    setCompletedLines((prev) => [...prev, lines[currentLineIndex]]);
    // Move to the next line
    setCurrentLineIndex((prev) => prev + 1);
  };

  useEffect(() => {
    // When the line index exceeds the number of lines, we're done
    if (currentLineIndex >= lines.length) {
      const timer = setTimeout(() => {
        onComplete();
      }, 800); // Wait a moment after "Welcome." is typed
      return () => clearTimeout(timer);
    }
  }, [currentLineIndex, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-background"
    >
      {/* Animated background circles (same as before) */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute w-96 h-96 bg-primary rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
        className="absolute w-96 h-96 bg-accent rounded-full blur-3xl"
      />

      {/* Terminal Text Area */}
      <div
        // <-- 2. REMOVED GRADIENT CLASSES from here
        className="relative z-10 p-4 font-mono text-lg md:text-2xl"
      >
        {/* Render lines that are already completed */}
        {completedLines.map((line, index) => (
          <div
            key={index}
            // 3. ADD GRADIENT CLASSES HERE
            className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent"
          >
            {line}
          </div>
        ))}

        {/* Render the currently-typing line */}
        {currentLineIndex < lines.length && (
          <div>
            <AnimatedLine
              text={lines[currentLineIndex]}
              onComplete={handleLineComplete}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default IntroCountdown;