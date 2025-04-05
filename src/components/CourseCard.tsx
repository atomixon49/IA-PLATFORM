'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface CourseCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  gradientClass: string;
  href: string;
}

export default function CourseCard({ title, description, icon, gradientClass, href }: CourseCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative w-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className={`space-card group cursor-pointer h-[400px] p-8 flex flex-col justify-between ${gradientClass}`}
        whileHover={{ 
          scale: 1.02,
          rotateY: 5,
          rotateX: 5,
          translateZ: 20
        }}
        style={{
          transformStyle: 'preserve-3d',
          perspective: '1000px'
        }}
      >
        {/* Efecto de brillo en hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-lg quantum-gradient"></div>
        
        {/* Contenido */}
        <div className="relative z-10">
          {/* Icono */}
          <div className={`h-20 w-20 rounded-2xl ${gradientClass} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
            {icon}
          </div>

          {/* Título */}
          <h3 className="text-2xl font-bold mb-4 space-text">
            {title}
          </h3>

          {/* Descripción */}
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            {description}
          </p>
        </div>

        {/* Botón */}
        <motion.a
          href={href}
          className="quantum-button inline-flex items-center justify-center space-x-2 w-full"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Explorar Curso</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </motion.a>
      </motion.div>

      {/* Partículas flotantes */}
      {isHovered && (
        <>
          <motion.div
            className="absolute w-2 h-2 rounded-full bg-[var(--accent)]"
            initial={{ opacity: 0, x: 0, y: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              x: [-20, 20],
              y: [-20, 20]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute w-2 h-2 rounded-full bg-[var(--primary)]"
            initial={{ opacity: 0, x: 0, y: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              x: [20, -20],
              y: [-20, 20]
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
        </>
      )}
    </motion.div>
  );
}
