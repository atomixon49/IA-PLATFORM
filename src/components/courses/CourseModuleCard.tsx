'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface CourseModuleCardProps {
  id: string;
  courseId: string;
  title: string;
  description: string;
  duration: string;
  progress?: number;
  index: number;
  isLocked?: boolean;
}

export default function CourseModuleCard({
  id,
  courseId,
  title,
  description,
  duration,
  progress = 0,
  index,
  isLocked = false
}: CourseModuleCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`space-card overflow-hidden relative ${isLocked ? 'opacity-70' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: isLocked ? 0 : -5 }}
    >
      {/* Número de módulo */}
      <div className="absolute top-0 left-0 w-12 h-12 flex items-center justify-center">
        <div className="absolute inset-0 quantum-gradient opacity-20" />
        <span className="relative text-xl font-bold">{index + 1}</span>
      </div>

      <div className="p-6 pt-8">
        {/* Título y duración */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-bold pr-4">{title}</h3>
          <div className="flex items-center text-xs text-gray-400 whitespace-nowrap">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {duration}
          </div>
        </div>

        {/* Descripción */}
        <p className="text-gray-400 text-sm mb-4">{description}</p>

        {/* Barra de progreso */}
        {!isLocked && (
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
        )}

        {/* Botón de acción */}
        {isLocked ? (
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400">Completa el módulo anterior para desbloquear</span>
            <div className="p-2 rounded-full bg-[var(--nebula)]">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400">
              {progress === 0 ? 'No iniciado' : progress === 100 ? 'Completado' : 'En progreso'}
            </span>
            <Link href={`/dashboard/courses/${courseId}/modules/${id}`}>
              <motion.div
                className="p-2 rounded-full bg-[var(--accent)]/20 text-[var(--accent)] hover:bg-[var(--accent)]/30 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {progress === 100 ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                )}
              </motion.div>
            </Link>
          </div>
        )}
      </div>

      {/* Partículas decorativas */}
      {isHovered && !isLocked && (
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
        </>
      )}
    </motion.div>
  );
}
