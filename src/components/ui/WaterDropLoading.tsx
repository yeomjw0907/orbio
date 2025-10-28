import React from 'react';
import { motion } from 'framer-motion';

interface WaterDropLoadingProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'green' | 'gradient';
  text?: string;
}

const WaterDropLoading: React.FC<WaterDropLoadingProps> = ({ 
  size = 'md', 
  color = 'gradient',
  text = '로딩 중...'
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const colorClasses = {
    blue: 'from-orbio-blue-400 to-orbio-blue-600',
    green: 'from-orbio-green-400 to-orbio-green-600',
    gradient: 'from-orbio-blue-400 via-orbio-green-400 to-orbio-blue-600'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {/* 물방울 애니메이션 컨테이너 */}
      <div className="relative">
        {/* 메인 물방울 */}
        <motion.div
          className={`${sizeClasses[size]} rounded-full bg-gradient-to-br ${colorClasses[color]} shadow-lg`}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* 물방울 내부 반짝임 효과 */}
          <motion.div
            className="absolute top-2 left-2 w-2 h-2 bg-white rounded-full opacity-60"
            animate={{
              scale: [0.5, 1, 0.5],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          />
        </motion.div>

        {/* 작은 물방울들 */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 rounded-full bg-gradient-to-br ${colorClasses[color]} opacity-60`}
            style={{
              top: `${20 + (i * 10)}%`,
              left: `${15 + (i * 12)}%`,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 1.5 + (i * 0.2),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3
            }}
          />
        ))}

        {/* 파동 효과 */}
        <motion.div
          className={`absolute inset-0 rounded-full border-2 border-orbio-blue-300 opacity-30`}
          animate={{
            scale: [1, 1.5, 2],
            opacity: [0.5, 0.2, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
        <motion.div
          className={`absolute inset-0 rounded-full border-2 border-orbio-green-300 opacity-30`}
          animate={{
            scale: [1, 1.5, 2],
            opacity: [0.5, 0.2, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
            delay: 0.5
          }}
        />
      </div>

      {/* 로딩 텍스트 */}
      <motion.div
        className={`${textSizeClasses[size]} font-medium text-gray-600`}
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {text}
      </motion.div>

      {/* 점들 애니메이션 */}
      <div className="flex space-x-1">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="w-1 h-1 bg-orbio-blue-400 rounded-full"
            animate={{
              scale: [0.5, 1, 0.5],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default WaterDropLoading;

