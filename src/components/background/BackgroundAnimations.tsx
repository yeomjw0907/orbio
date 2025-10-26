import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface ParticleProps {
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
}

const Particle: React.FC<ParticleProps> = ({ x, y, size, color, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
        y: [y, y - 100, y - 200],
        x: [x, x + Math.random() * 20 - 10, x + Math.random() * 40 - 20]
      }}
      transition={{
        duration: 3 + Math.random() * 2,
        delay: delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 2,
        ease: "easeOut"
      }}
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        left: x,
        top: y,
      }}
    />
  );
};

export const BackgroundAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = React.useState<ParticleProps[]>([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles: ParticleProps[] = [];
      const colors = [
        'rgba(2, 122, 156, 0.1)',   // orbio-blue
        'rgba(163, 217, 177, 0.1)', // orbio-green
        'rgba(199, 209, 217, 0.1)', // orbio-gray
      ];

      for (let i = 0; i < 20; i++) {
        newParticles.push({
          x: Math.random() * (containerRef.current?.offsetWidth || window.innerWidth),
          y: Math.random() * (containerRef.current?.offsetHeight || window.innerHeight),
          size: Math.random() * 4 + 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          delay: Math.random() * 2,
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
    const interval = setInterval(generateParticles, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
    >
      {particles.map((particle, index) => (
        <Particle key={index} {...particle} />
      ))}
    </div>
  );
};

interface GradientBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export const GradientBackground: React.FC<GradientBackgroundProps> = ({
  children,
  className = ''
}) => {
  return (
    <div className={`relative min-h-screen ${className}`}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-gradient-to-br from-orbio-gray-50 via-orbio-blue-50 to-orbio-green-50"
      />
      <motion.div
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute inset-0 orbio-pattern-dense"
      />
      <BackgroundAnimation />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

interface WaveBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export const WaveBackground: React.FC<WaveBackgroundProps> = ({
  children,
  className = ''
}) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <svg
        className="absolute bottom-0 left-0 w-full h-32"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
          fill="rgba(2, 122, 156, 0.1)"
        />
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
          d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
          fill="rgba(163, 217, 177, 0.1)"
        />
      </svg>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
