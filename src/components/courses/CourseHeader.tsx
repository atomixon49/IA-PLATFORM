'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface CourseHeaderProps {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  duration: string;
  level: 'Principiante' | 'Intermedio' | 'Avanzado';
  progress: number;
  instructor: {
    name: string;
    avatar: string;
    title: string;
  };
}

export default function CourseHeader({
  id,
  title,
  description,
  image,
  category,
  duration,
  level,
  progress,
  instructor
}: CourseHeaderProps) {
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
    <div className="relative mb-8">
      {/* Imagen de fondo con overlay */}
      <div className="relative h-64 md:h-80 overflow-hidden rounded-xl">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--dark-matter)] to-transparent" />
        
        {/* Contenido superpuesto */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Migas de pan */}
            <div className="flex items-center text-sm text-gray-300 mb-4">
              <Link href="/dashboard" className="hover:text-white transition-colors">
                Dashboard
              </Link>
              <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <Link href="/dashboard/courses" className="hover:text-white transition-colors">
                Cursos
              </Link>
              <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-white">{title}</span>
            </div>
            
            {/* Etiquetas */}
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="px-2 py-1 rounded-md bg-[var(--accent)]/20 text-[var(--accent)] text-xs font-medium">
                {category}
              </span>
              <span className={`px-2 py-1 rounded-md text-xs font-medium ${getLevelColor()}`}>
                {level}
              </span>
              <span className="px-2 py-1 rounded-md bg-[var(--nebula)] text-gray-300 text-xs font-medium">
                {duration}
              </span>
            </div>
            
            {/* Título y descripción */}
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{title}</h1>
            <p className="text-gray-300 max-w-3xl">{description}</p>
          </motion.div>
        </div>
      </div>
      
      {/* Barra de información */}
      <motion.div
        className="bg-[var(--nebula)]/50 backdrop-blur-lg rounded-xl p-4 mt-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Progreso */}
        <div className="flex-1">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-300">Progreso del curso</span>
            <span className="text-[var(--accent)]">{progress}%</span>
          </div>
          <div className="h-2 w-full bg-[var(--dark-matter)] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--primary)]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, delay: 0.4 }}
            />
          </div>
        </div>
        
        {/* Instructor */}
        <div className="flex items-center">
          <div className="mr-3">
            <img
              src={instructor.avatar}
              alt={instructor.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-[var(--accent)]"
            />
          </div>
          <div>
            <p className="text-sm font-medium text-white">{instructor.name}</p>
            <p className="text-xs text-gray-400">{instructor.title}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
