import { useEffect, useState } from 'react';

interface Orb {
  id: number;
  size: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
  color: string;
}

export const ContactBackground = () => {
  const [orbs, setOrbs] = useState<Orb[]>([]);

  useEffect(() => {
    generateOrbs();

    const handleResize = () => {
      generateOrbs();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const generateOrbs = () => {
    const numberOfOrbs = 8;
    const colors = [
      'hsl(var(--primary) / 0.15)',
      'hsl(var(--primary) / 0.1)',
      'hsl(var(--accent) / 0.12)',
      'hsl(var(--secondary) / 0.1)',
    ];

    const newOrbs: Orb[] = [];

    for (let i = 0; i < numberOfOrbs; i++) {
      newOrbs.push({
        id: i,
        size: Math.random() * 300 + 150,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 20 + 15,
        delay: Math.random() * 5,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    setOrbs(newOrbs);
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {orbs.map((orb) => (
        <div
          key={orb.id}
          className="floating-orb"
          style={{
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            background: orb.color,
            animationDuration: `${orb.duration}s`,
            animationDelay: `${orb.delay}s`,
          }}
        />
      ))}
    </div>
  );
};
