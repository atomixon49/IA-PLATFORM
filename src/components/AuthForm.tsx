'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AuthFormProps {
  initialTab?: 'login' | 'register';
}

export default function AuthForm({ initialTab = 'login' }: AuthFormProps) {
  const [activeTab, setActiveTab] = useState(initialTab);

  return (
    <div className="w-full max-w-md">
      {/* Tabs */}
      <div className="flex space-x-4 mb-8">
        <motion.button
          className={`flex-1 py-3 text-lg font-semibold relative ${
            activeTab === 'login' ? 'text-white' : 'text-gray-400'
          }`}
          onClick={() => setActiveTab('login')}
        >
          Iniciar Sesión
          {activeTab === 'login' && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-0.5 quantum-gradient"
              layoutId="activeTab"
            />
          )}
        </motion.button>
        <motion.button
          className={`flex-1 py-3 text-lg font-semibold relative ${
            activeTab === 'register' ? 'text-white' : 'text-gray-400'
          }`}
          onClick={() => setActiveTab('register')}
        >
          Registrarse
          {activeTab === 'register' && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-0.5 quantum-gradient"
              layoutId="activeTab"
            />
          )}
        </motion.button>
      </div>

      {/* Formularios */}
      <AnimatePresence mode="wait">
        {activeTab === 'login' ? (
          <motion.form
            key="login"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="email"
                className="w-full px-4 py-3 rounded-lg bg-[var(--nebula)] border border-gray-700 text-white focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)] focus:ring-opacity-50 transition-all duration-200"
                placeholder="tu@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Contraseña
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="password"
                className="w-full px-4 py-3 rounded-lg bg-[var(--nebula)] border border-gray-700 text-white focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)] focus:ring-opacity-50 transition-all duration-200"
                placeholder="••••••••"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full quantum-button py-4 text-lg relative overflow-hidden group"
            >
              <span className="relative z-10">Iniciar Sesión</span>
              <div className="absolute inset-0 quantum-gradient opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
            </motion.button>
          </motion.form>
        ) : (
          <motion.form
            key="register"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Nombre
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                className="w-full px-4 py-3 rounded-lg bg-[var(--nebula)] border border-gray-700 text-white focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)] focus:ring-opacity-50 transition-all duration-200"
                placeholder="Tu nombre"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="email"
                className="w-full px-4 py-3 rounded-lg bg-[var(--nebula)] border border-gray-700 text-white focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)] focus:ring-opacity-50 transition-all duration-200"
                placeholder="tu@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Contraseña
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="password"
                className="w-full px-4 py-3 rounded-lg bg-[var(--nebula)] border border-gray-700 text-white focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)] focus:ring-opacity-50 transition-all duration-200"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Confirmar Contraseña
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="password"
                className="w-full px-4 py-3 rounded-lg bg-[var(--nebula)] border border-gray-700 text-white focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)] focus:ring-opacity-50 transition-all duration-200"
                placeholder="••••••••"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full quantum-button py-4 text-lg relative overflow-hidden group"
            >
              <span className="relative z-10">Crear Cuenta</span>
              <div className="absolute inset-0 quantum-gradient opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
