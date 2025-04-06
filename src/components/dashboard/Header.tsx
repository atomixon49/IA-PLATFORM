'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthContext } from '../../context/AuthContext';

interface HeaderProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export default function Header({ toggleSidebar, isSidebarOpen }: HeaderProps) {
  const { user } = useAuthContext();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Notificaciones de ejemplo
  const notifications = [
    { id: 1, title: 'Nuevo curso disponible', message: 'Introducción a Redes Neuronales ya está disponible', time: '2 horas' },
    { id: 2, title: 'Recordatorio', message: 'Continúa tu curso de Machine Learning', time: '1 día' },
    { id: 3, title: 'Logro desbloqueado', message: 'Has completado tu primer proyecto de IA', time: '3 días' },
  ];

  return (
    <header className="bg-[var(--dark-matter)]/80 backdrop-blur-lg border-b border-[var(--accent)]/20 sticky top-0 z-20">
      <div className="flex items-center justify-between h-16 px-4">
        {/* Botón de menú y título */}
        <div className="flex items-center">
          <motion.button
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-[var(--accent)]/10 mr-4"
            onClick={toggleSidebar}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isSidebarOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </motion.button>
          <h1 className="text-xl font-bold text-white md:hidden">Dashboard</h1>
        </div>

        {/* Barra de búsqueda */}
        <div className="hidden md:flex flex-1 max-w-xl mx-4">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-4 py-2 bg-[var(--nebula)]/50 border border-[var(--accent)]/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent"
              placeholder="Buscar cursos, recursos, temas..."
            />
          </div>
        </div>

        {/* Iconos de acción */}
        <div className="flex items-center space-x-4">
          {/* Botón de notificaciones */}
          <div className="relative">
            <motion.button
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-[var(--accent)]/10 relative"
              onClick={() => setShowNotifications(!showNotifications)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </motion.button>

            {/* Menú de notificaciones */}
            {showNotifications && (
              <motion.div
                className="absolute right-0 mt-2 w-80 bg-[var(--dark-matter)] border border-[var(--accent)]/20 rounded-lg shadow-lg overflow-hidden z-50"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="p-4 border-b border-[var(--accent)]/20">
                  <h3 className="text-lg font-semibold text-white">Notificaciones</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="p-4 border-b border-[var(--accent)]/10 hover:bg-[var(--accent)]/5 transition-colors">
                      <div className="flex justify-between items-start">
                        <h4 className="text-sm font-medium text-white">{notification.title}</h4>
                        <span className="text-xs text-gray-400">{notification.time}</span>
                      </div>
                      <p className="text-xs text-gray-300 mt-1">{notification.message}</p>
                    </div>
                  ))}
                </div>
                <div className="p-3 text-center border-t border-[var(--accent)]/20">
                  <button className="text-sm text-[var(--accent)] hover:text-[var(--primary)] transition-colors">
                    Ver todas las notificaciones
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Perfil de usuario */}
          <div className="relative">
            <motion.button
              className="flex items-center space-x-2"
              onClick={() => setShowUserMenu(!showUserMenu)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--primary)] flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {user?.user_metadata?.username?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
              <span className="hidden md:block text-sm font-medium text-white">
                {user?.user_metadata?.username || user?.email?.split('@')[0] || 'Usuario'}
              </span>
              <svg className="hidden md:block w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </motion.button>

            {/* Menú de usuario */}
            {showUserMenu && (
              <motion.div
                className="absolute right-0 mt-2 w-48 bg-[var(--dark-matter)] border border-[var(--accent)]/20 rounded-lg shadow-lg overflow-hidden z-50"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="p-3 border-b border-[var(--accent)]/20">
                  <p className="text-sm font-medium text-white">{user?.user_metadata?.username || 'Usuario'}</p>
                  <p className="text-xs text-gray-400">{user?.email}</p>
                </div>
                <div className="py-1">
                  <a href="/dashboard/profile" className="block px-4 py-2 text-sm text-gray-300 hover:bg-[var(--accent)]/10 hover:text-white transition-colors">
                    Mi Perfil
                  </a>
                  <a href="/dashboard/settings" className="block px-4 py-2 text-sm text-gray-300 hover:bg-[var(--accent)]/10 hover:text-white transition-colors">
                    Configuración
                  </a>
                  <a href="/dashboard/help" className="block px-4 py-2 text-sm text-gray-300 hover:bg-[var(--accent)]/10 hover:text-white transition-colors">
                    Ayuda
                  </a>
                </div>
                <div className="py-1 border-t border-[var(--accent)]/20">
                  <button 
                    onClick={() => {
                      const { signOut } = useAuthContext();
                      signOut();
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-500 transition-colors"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
