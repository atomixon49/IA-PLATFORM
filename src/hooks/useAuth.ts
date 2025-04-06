import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useRouter } from 'next/navigation';

export interface AuthError {
  message: string;
}

export interface UseAuthReturn {
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (username: string, email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  error: AuthError | null;
  loading: boolean;
}

export function useAuth(): UseAuthReturn {
  const [error, setError] = useState<AuthError | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const signIn = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;

      // Redirigir al usuario al dashboard después de iniciar sesión
      if (data?.user) {
        router.push('/dashboard');
        return true;
      }

      return false;
    } catch (err: any) {
      setError({ message: err.message || 'Error al iniciar sesión' });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (username: string, email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      // 1. Crear el usuario en auth
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: username
          }
        }
      });

      if (signUpError) throw signUpError;

      // 2. Insertar datos adicionales del usuario en la tabla 'users'
      if (authData.user) {
        const { error: profileError } = await supabase
          .from('users')
          .insert([
            {
              id: authData.user.id,
              username: username,
              email: email,
              created_at: new Date().toISOString(),
            },
          ]);

        if (profileError) throw profileError;

        return true;
      }

      return false;
    } catch (err: any) {
      setError({ message: err.message || 'Error al registrar usuario' });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error: signOutError } = await supabase.auth.signOut();

      if (signOutError) throw signOutError;

      // Redirigir al usuario a la página de inicio de sesión
      router.push('/auth?tab=login');
    } catch (err: any) {
      setError({ message: err.message || 'Error al cerrar sesión' });
    } finally {
      setLoading(false);
    }
  };

  return {
    signIn,
    signUp,
    signOut,
    error,
    loading,
  };
}
