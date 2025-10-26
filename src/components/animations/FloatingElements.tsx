import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faLeaf, 
  faRecycle, 
  faDroplet, 
  faSeedling,
  faStar
} from '@fortawesome/free-solid-svg-icons';

interface FloatingElementProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export const FloatingElement: React.FC<FloatingElementProps> = ({
  children,
  delay = 0,
  duration = 3,
  className = ''
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: [0, 0.6, 0.8, 0.6, 0],
        y: [20, -5, 5, -2, 0],
        rotate: [0, 2, -2, 0]
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const FloatingElements: React.FC = () => {
  const elements = [
    { icon: faSeedling, delay: 0, size: 'w-12 h-12', position: 'top-20 left-10', color: 'text-green-500' },
    { icon: faRecycle, delay: 1, size: 'w-16 h-16', position: 'bottom-20 right-10', color: 'text-blue-500' },
    { icon: faDroplet, delay: 2, size: 'w-10 h-10', position: 'top-1/2 left-1/4', color: 'text-cyan-500' },
    { icon: faLeaf, delay: 0.5, size: 'w-12 h-12', position: 'bottom-1/3 right-1/4', color: 'text-emerald-500' },
    { icon: faStar, delay: 1.5, size: 'w-8 h-8', position: 'top-1/3 right-1/3', color: 'text-yellow-500' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {elements.map((element, index) => (
        <FloatingElement
          key={index}
          delay={element.delay}
          duration={6 + index * 0.5}
          className={`absolute ${element.position} ${element.size} bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center`}
        >
          <FontAwesomeIcon icon={element.icon} className={`text-lg ${element.color}`} />
        </FloatingElement>
      ))}
    </div>
  );
};
