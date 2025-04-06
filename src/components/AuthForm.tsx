'use client';

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/navigation';

interface AuthFormProps {
  initialTab?: 'login' | 'register';
}

export default function AuthForm({ initialTab = 'login' }: AuthFormProps) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const { signIn, signUp, error, loading } = useAuth();
  const router = useRouter();

  // Estados para los formularios
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [username, setUsername] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Estado para errores de validación
  const [validationError, setValidationError] = useState<string | null>(null);

  // Manejar inicio de sesión
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    // Validación básica
    if (!loginEmail || !loginPassword) {
      setValidationError('Por favor, completa todos los campos');
      return;
    }

    await signIn(loginEmail, loginPassword);
    // La redirección se maneja en el hook useAuth
  };

  // Manejar registro
  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    // Validación básica
    if (!username || !registerEmail || !registerPassword || !confirmPassword) {
      setValidationError('Por favor, completa todos los campos');
      return;
    }

    if (registerPassword !== confirmPassword) {
      setValidationError('Las contraseñas no coinciden');
      return;
    }

    if (registerPassword.length < 6) {
      setValidationError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    const success = await signUp(username, registerEmail, registerPassword);
    if (success) {
      // Mostrar mensaje de éxito y cambiar a la pestaña de login
      setActiveTab('login');
      // Limpiar los campos del formulario de registro
      setUsername('');
      setRegisterEmail('');
      setRegisterPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <div className="w-full max-w-md">
      {/* Tabs */}
      <div className="flex space-x-4 mb-8">
        <motion.button
          className={`flex-1 py-3 text-lg font-semibold relative ${
            activeTab === 'login' ? 'text-white' : 'text-gray-400'
          }`}
          onClick={() => setActiveTab('login')}
          disabled={loading}
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
          disabled={loading}
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

      {/* Mensajes de error */}
      {(error || validationError) && (
        <motion.div
          className="bg-red-500/20 border border-red-500 text-white px-4 py-3 rounded-lg mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {validationError || error?.message}
        </motion.div>
      )}

      {/* Formularios */}
      <AnimatePresence mode="wait">
        {activeTab === 'login' ? (
          <motion.form
            key="login"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
            onSubmit={handleLogin}
          >
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-[var(--nebula)] border border-gray-700 text-white focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)] focus:ring-opacity-50 transition-all duration-200"
                placeholder="tu@email.com"
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Contraseña
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-[var(--nebula)] border border-gray-700 text-white focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)] focus:ring-opacity-50 transition-all duration-200"
                placeholder="••••••••"
                disabled={loading}
              />
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="w-full quantum-button py-4 text-lg relative overflow-hidden group"
              disabled={loading}
            >
              <span className="relative z-10">
                {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </span>
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
            onSubmit={handleRegister}
          >
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Nombre de usuario
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-[var(--nebula)] border border-gray-700 text-white focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)] focus:ring-opacity-50 transition-all duration-200"
                placeholder="Tu nombre de usuario"
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-[var(--nebula)] border border-gray-700 text-white focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)] focus:ring-opacity-50 transition-all duration-200"
                placeholder="tu@email.com"
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Contraseña
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-[var(--nebula)] border border-gray-700 text-white focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)] focus:ring-opacity-50 transition-all duration-200"
                placeholder="••••••••"
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Confirmar Contraseña
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-[var(--nebula)] border border-gray-700 text-white focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)] focus:ring-opacity-50 transition-all duration-200"
                placeholder="••••••••"
                disabled={loading}
              />
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="w-full quantum-button py-4 text-lg relative overflow-hidden group"
              disabled={loading}
            >
              <span className="relative z-10">
                {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
              </span>
              <div className="absolute inset-0 quantum-gradient opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
