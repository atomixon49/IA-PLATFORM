'use client';

import { motion } from 'framer-motion';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: number;
    isPositive: boolean;
  };
  gradientClass?: string;
}

export default function StatsCard({ 
  title, 
  value, 
  icon, 
  change,
  gradientClass = 'quantum-gradient'
}: StatsCardProps) {
  return (
    <motion.div
      className="space-card p-6 relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      {/* Fondo con gradiente */}
      <div className={`absolute top-0 right-0 w-24 h-24 opacity-10 rounded-bl-full ${gradientClass}`} />
      
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-400 text-sm mb-1">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
          
          {change && (
            <div className="flex items-center mt-2">
              <span className={`text-xs font-medium ${change.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                {change.isPositive ? '+' : ''}{change.value}%
              </span>
              <svg 
                className={`w-3 h-3 ml-1 ${change.isPositive ? 'text-green-400' : 'text-red-400'}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d={change.isPositive ? "M5 10l7-7m0 0l7 7m-7-7v18" : "M19 14l-7 7m0 0l-7-7m7 7V3"} 
                />
              </svg>
              <span className="text-xs text-gray-400 ml-1">vs. semana pasada</span>
            </div>
          )}
        </div>
        
        <div className={`p-3 rounded-lg ${gradientClass}`}>
          {icon}
        </div>
      </div>
      
      {/* Partículas decorativas */}
      <motion.div
        className="absolute w-1 h-1 rounded-full bg-[var(--accent)]"
        animate={{ 
          y: [0, -10, 0],
          opacity: [0, 1, 0]
        }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "loop" }}
        style={{ bottom: '20%', left: '20%' }}
      />
      <motion.div
        className="absolute w-1 h-1 rounded-full bg-[var(--primary)]"
        animate={{ 
          y: [0, -15, 0],
          opacity: [0, 1, 0]
        }}
        transition={{ duration: 4, repeat: Infinity, repeatType: "loop", delay: 1 }}
        style={{ bottom: '30%', left: '50%' }}
      />
    </motion.div>
  );
}
