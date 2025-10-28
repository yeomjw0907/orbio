import React from 'react';
import { motion } from 'framer-motion';

interface HamburgerMenuProps {
  isOpen: boolean;
  onClick: () => void;
}

export const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ isOpen, onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors relative"
      whileTap={{ scale: 0.95 }}
    >
      <div className="w-6 h-6 flex flex-col justify-center items-center">
        <motion.span
          className="block w-5 h-0.5 bg-gray-700 rounded-full"
          animate={{
            rotate: isOpen ? 45 : 0,
            y: isOpen ? 2 : 0,
          }}
          transition={{ duration: 0.2 }}
        />
        <motion.span
          className="block w-5 h-0.5 bg-gray-700 rounded-full mt-1"
          animate={{
            opacity: isOpen ? 0 : 1,
          }}
          transition={{ duration: 0.2 }}
        />
        <motion.span
          className="block w-5 h-0.5 bg-gray-700 rounded-full mt-1"
          animate={{
            rotate: isOpen ? -45 : 0,
            y: isOpen ? -2 : 0,
          }}
          transition={{ duration: 0.2 }}
        />
      </div>
    </motion.button>
  );
};
