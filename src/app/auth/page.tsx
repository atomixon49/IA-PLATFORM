'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import AuthForm from '../../components/AuthForm';
import { useSearchParams } from 'next/navigation';

const LoginScene = dynamic(() => import('../../components/3d/LoginScene'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-[var(--dark-matter)]" />
});

export default function AuthPage() {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab') as 'login' | 'register' | null;

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
      {/* Fondo animado */}
      <LoginScene />
      
      {/* Contenedor principal con efecto de cristal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div className="space-card p-8 backdrop-blur-xl">
          {/* Logo y título */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
              className="mb-6"
            >
              <div className="w-20 h-20 mx-auto relative">
                <div className="absolute inset-0 rounded-full quantum-gradient animate-pulse"></div>
                <div className="absolute inset-2 rounded-full bg-[var(--dark-matter)] flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
              </div>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl font-bold space-text mb-2"
            >
              Bienvenido de nuevo
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-gray-400"
            >
              Continúa tu viaje en el universo del aprendizaje
            </motion.p>
          </div>

          {/* Formulario */}
          <AuthForm initialTab={tab || 'login'} />

          {/* Enlaces adicionales */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 text-center text-sm"
          >
            <a href="#" className="text-[var(--accent)] hover:text-[var(--primary)] transition-colors duration-200">
              ¿Olvidaste tu contraseña?
            </a>
          </motion.div>
        </div>

        {/* Decoración */}
        <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full quantum-gradient opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full tech-gradient opacity-20 blur-3xl"></div>
      </motion.div>
    </div>
  );
}
