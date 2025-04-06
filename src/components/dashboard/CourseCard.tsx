'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  progress: number;
  category: string;
  duration: string;
  level: 'Principiante' | 'Intermedio' | 'Avanzado';
}

export default function CourseCard({
  id,
  title,
  description,
  image,
  progress,
  category,
  duration,
  level
}: CourseCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Determinar el color del nivel
  const getLevelColor = () => {
    switch (level) {
      case 'Principiante':
        return 'bg-green-500/20 text-green-400';
      case 'Intermedio':
        return 'bg-blue-500/20 text-blue-400';
      case 'Avanzado':
        return 'bg-purple-500/20 text-purple-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <motion.div
      className="space-card overflow-hidden relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
    >
      {/* Imagen del curso con overlay */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{
            transform: isHovered ? 'scale(1.05)' : 'scale(1)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--dark-matter)] to-transparent" />
        
        {/* Categoría */}
        <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-[var(--accent)]/20 text-[var(--accent)] text-xs font-medium">
          {category}
        </div>
        
        {/* Nivel */}
        <div className={`absolute top-3 right-3 px-2 py-1 rounded-md text-xs font-medium ${getLevelColor()}`}>
          {level}
        </div>
      </div>
      
      {/* Contenido */}
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2 line-clamp-1">{title}</h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{description}</p>
        
        {/* Barra de progreso */}
        <div className="mb-4">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-400">Progreso</span>
            <span className="text-[var(--accent)]">{progress}%</span>
          </div>
          <div className="h-1.5 w-full bg-[var(--nebula)] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--primary)]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, delay: 0.2 }}
            />
          </div>
        </div>
        
        {/* Duración */}
        <div className="flex justify-between items-center">
          <div className="flex items-center text-xs text-gray-400">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {duration}
          </div>
          
          {/* Botón de continuar */}
          <motion.a
            href={`/dashboard/courses/${id}`}
            className="text-xs font-medium text-[var(--accent)] hover:text-[var(--primary)] transition-colors flex items-center"
            whileHover={{ x: 3 }}
          >
            Continuar
            <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.a>
        </div>
      </div>
      
      {/* Partículas decorativas */}
      {isHovered && (
        <>
          <motion.div
            className="absolute w-1 h-1 rounded-full bg-[var(--accent)]"
            initial={{ opacity: 0, x: 0, y: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              x: [-10, 10],
              y: [-10, 10]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ top: '30%', left: '10%' }}
          />
          <motion.div
            className="absolute w-1 h-1 rounded-full bg-[var(--primary)]"
            initial={{ opacity: 0, x: 0, y: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              x: [10, -10],
              y: [-10, 10]
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            style={{ top: '40%', right: '10%' }}
          />
          <motion.div
            className="absolute w-0.5 h-0.5 rounded-full bg-[var(--quantum)]"
            initial={{ opacity: 0, x: 0, y: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              x: [-5, 5],
              y: [5, -5]
            }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
            style={{ bottom: '20%', left: '20%' }}
          />
        </>
      )}
    </motion.div>
  );
}
