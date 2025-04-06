'use client';

import { motion } from 'framer-motion';

interface RecommendationCardProps {
  title: string;
  description: string;
  image: string;
  category: string;
  href: string;
}

export default function RecommendationCard({
  title,
  description,
  image,
  category,
  href
}: RecommendationCardProps) {
  return (
    <motion.div
      className="space-card overflow-hidden relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      <div className="flex flex-col md:flex-row h-full">
        {/* Imagen */}
        <div className="relative w-full md:w-1/3 h-32 md:h-auto overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--dark-matter)] via-transparent to-transparent md:bg-gradient-to-t" />
          
          {/* Categoría */}
          <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-[var(--accent)]/20 text-[var(--accent)] text-xs font-medium">
            {category}
          </div>
        </div>
        
        {/* Contenido */}
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="text-lg font-bold mb-2 line-clamp-1">{title}</h3>
          <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">{description}</p>
          
          {/* Botón */}
          <motion.a
            href={href}
            className="self-start px-4 py-2 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] text-sm font-medium hover:bg-[var(--accent)]/20 transition-colors"
            whileHover={{ x: 5 }}
          >
            Ver más
          </motion.a>
        </div>
      </div>
      
      {/* Efecto de brillo en hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent)]/0 via-[var(--accent)]/5 to-[var(--accent)]/0 opacity-0 hover:opacity-100 transition-opacity duration-1000" />
      </motion.div>
    </motion.div>
  );
}
