'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface ResourceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  category: string;
  gradientClass: string;
}

export default function ResourceCard({ 
  title, 
  description, 
  icon, 
  link, 
  category,
  gradientClass 
}: ResourceCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`space-card overflow-hidden relative ${isHovered ? 'space-glow' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
    >
      {/* Fondo con gradiente */}
      <div className={`absolute inset-0 opacity-20 ${gradientClass}`} />
      
      {/* Contenido */}
      <div className="relative p-6 h-full flex flex-col">
        {/* Categoría */}
        <div className="text-xs font-semibold text-[var(--accent)] mb-2 uppercase tracking-wider">
          {category}
        </div>
        
        {/* Icono */}
        <div className={`w-12 h-12 rounded-lg ${gradientClass} flex items-center justify-center mb-4`}>
          {icon}
        </div>
        
        {/* Título */}
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        
        {/* Descripción */}
        <p className="text-gray-300 mb-4 flex-grow">{description}</p>
        
        {/* Botón */}
        <motion.a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm font-semibold text-white hover:text-[var(--accent)] transition-colors"
          whileHover={{ x: 5 }}
        >
          Explorar recurso
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </motion.a>
      </div>

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
          <motion.div
            className="absolute w-1 h-1 rounded-full bg-[var(--quantum)]"
            initial={{ opacity: 0, x: 0, y: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              x: [-10, 10],
              y: [10, -10]
            }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
          />
        </>
      )}
    </motion.div>
  );
}
