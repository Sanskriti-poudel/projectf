import React from 'react';
import { BookOpen, Users, Phone, Calendar, Brain, Heart, Coffee, Music } from 'lucide-react';
import { motion } from 'framer-motion';

const QUICK_ACTIONS = [
  {
    icon: BookOpen,
    label: 'Resources',
    description: 'Mental health articles & guides',
    color: 'bg-blue-100 text-blue-600',
    gradient: 'from-blue-500 to-blue-600'
  },
  {
    icon: Users,
    label: 'Community',
    description: 'Connect with others',
    color: 'bg-purple-100 text-purple-600',
    gradient: 'from-purple-500 to-purple-600'
  },
  {
    icon: Brain,
    label: 'Meditation',
    description: 'Guided mindfulness sessions',
    color: 'bg-indigo-100 text-indigo-600',
    gradient: 'from-indigo-500 to-indigo-600'
  },
  {
    icon: Heart,
    label: 'Self-Care',
    description: 'Daily wellness activities',
    color: 'bg-pink-100 text-pink-600',
    gradient: 'from-pink-500 to-pink-600'
  },
  {
    icon: Phone,
    label: 'Crisis Help',
    description: '24/7 support line',
    color: 'bg-red-100 text-red-600',
    gradient: 'from-red-500 to-red-600'
  },
  {
    icon: Calendar,
    label: 'Therapy',
    description: 'Book professional sessions',
    color: 'bg-green-100 text-green-600',
    gradient: 'from-green-500 to-green-600'
  },
  {
    icon: Coffee,
    label: 'Journal',
    description: 'Express your thoughts',
    color: 'bg-amber-100 text-amber-600',
    gradient: 'from-amber-500 to-amber-600'
  },
  {
    icon: Music,
    label: 'Relaxation',
    description: 'Calming sounds & music',
    color: 'bg-cyan-100 text-cyan-600',
    gradient: 'from-cyan-500 to-cyan-600'
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function QuickActions() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
    >
      {QUICK_ACTIONS.map(({ icon: Icon, label, description, color, gradient }) => (
        <motion.button
          key={label}
          variants={item}
          whileHover={{ scale: 1.02, y: -5 }}
          whileTap={{ scale: 0.98 }}
          className="relative group overflow-hidden rounded-xl shadow-md transition-all duration-300"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 
            group-hover:opacity-100 transition-opacity duration-300`} />
          
          <div className="relative p-6 bg-white group-hover:bg-opacity-0 transition-colors duration-300">
            <div className={`${color} p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4
              group-hover:bg-white/20 group-hover:text-white transition-colors duration-300`}>
              <Icon className="w-6 h-6" />
            </div>
            
            <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-white transition-colors duration-300">
              {label}
            </h3>
            <p className="text-sm text-gray-500 group-hover:text-white/80 transition-colors duration-300">
              {description}
            </p>
          </div>
        </motion.button>
      ))}
    </motion.div>
  );
}