import React from 'react';
import { Sun, Moon, Cloud } from 'lucide-react';
import { motion } from 'framer-motion';
import { Player } from '@lottiefiles/react-lottie-player';

interface WelcomeCardProps {
  username: string;
}

export function WelcomeCard({ username }: WelcomeCardProps) {
  const getTimeBasedContent = () => {
    const hour = new Date().getHours();
    if (hour < 12) return {
      greeting: 'Good morning',
      icon: Sun,
      animation: 'https://lottie.host/c99e0a8d-1b12-4d6a-a3c1-c11b86d1d46d/jtTzrJXLrE.json'
    };
    if (hour < 18) return {
      greeting: 'Good afternoon',
      icon: Cloud,
      animation: 'https://lottie.host/2c5e9d2c-c465-45e3-a4f3-63e63fc84e7c/TqAIUxrBf1.json'
    };
    return {
      greeting: 'Good evening',
      icon: Moon,
      animation: 'https://lottie.host/ad5c6c40-4200-4ce7-9e0b-8f36e6c0e886/1MHk1JiYYf.json'
    };
  };

  const timeContent = getTimeBasedContent();
  const Icon = timeContent.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg shadow-lg p-8 mb-8 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-48 h-48 opacity-20">
        <Player
          autoplay
          loop
          src={timeContent.animation}
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="relative z-10">
        <div className="flex items-center mb-6">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 1 }}
            className="bg-white/10 p-3 rounded-full mr-4"
          >
            <Icon className="w-8 h-8 text-white" />
          </motion.div>
          <div>
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold text-white"
            >
              {timeContent.greeting}, {username}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-teal-100"
            >
              Welcome to your safe space
            </motion.p>
          </div>
        </div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-teal-50 text-lg leading-relaxed"
        >
          Remember, taking care of your mental health is just as important as physical health.
          We're here to support you on your journey to wellness.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-6 flex space-x-4"
        >
          <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors">
            Start Journal Entry
          </button>
          <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors">
            View Resources
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}