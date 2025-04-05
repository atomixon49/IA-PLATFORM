'use client';

import React, { useEffect } from 'react';

export default function StarField() {
  useEffect(() => {
    const createStar = () => {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.left = `${Math.random() * 100}vw`;
      star.style.top = `${Math.random() * 100}vh`;
      star.style.animationDelay = `${Math.random() * 3}s`;
      star.style.opacity = `${Math.random()}`;
      document.body.appendChild(star);

      // Remover la estrella después de un tiempo aleatorio
      setTimeout(() => {
        star.remove();
      }, Math.random() * 5000 + 5000);
    };

    // Crear estrellas iniciales
    for (let i = 0; i < 50; i++) {
      createStar();
    }

    // Crear nuevas estrellas periódicamente
    const interval = setInterval(() => {
      createStar();
    }, 1000);

    return () => {
      clearInterval(interval);
      // Limpiar todas las estrellas al desmontar
      const stars = document.querySelectorAll('.star');
      stars.forEach(star => star.remove());
    };
  }, []);

  return null;
}
