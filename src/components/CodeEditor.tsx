'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

// Importación dinámica del editor de Monaco para evitar problemas de SSR
const MonacoEditor = dynamic(
  () => import('@monaco-editor/react'),
  { ssr: false }
);

const SAMPLE_CODE = `# Ejemplo de algoritmo de Machine Learning
import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression

# Generar datos de ejemplo
np.random.seed(42)
X = 2 * np.random.rand(100, 1)
y = 4 + 3 * X + np.random.randn(100, 1)

# Dividir en conjuntos de entrenamiento y prueba
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Crear y entrenar el modelo
modelo = LinearRegression()
modelo.fit(X_train, y_train)

# Realizar predicciones
y_pred = modelo.predict(X_test)

# Visualizar resultados
plt.scatter(X_test, y_test, color='blue', label='Datos reales')
plt.plot(X_test, y_pred, color='red', linewidth=2, label='Predicciones')
plt.xlabel('X')
plt.ylabel('y')
plt.legend()
plt.title('Regresión Lineal Simple')
plt.show()

print(f"Coeficiente: {modelo.coef_[0][0]:.2f}")
print(f"Intercepto: {modelo.intercept_[0]:.2f}")
`;

export default function CodeEditor() {
  const [code, setCode] = useState(SAMPLE_CODE);
  const [language, setLanguage] = useState('python');
  const [theme, setTheme] = useState('vs-dark');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const handleCodeChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
    }
  };

  const handleRunCode = () => {
    setIsRunning(true);
    // Simulación de ejecución de código
    setTimeout(() => {
      setOutput(`Ejecutando código de ${language}...
      
Coeficiente: 3.12
Intercepto: 3.92

[Información] Gráfico generado correctamente.
[Información] Precisión del modelo: 94.2%
      
Ejecución completada en 1.2s`);
      setIsRunning(false);
    }, 1500);
  };

  const handleClearOutput = () => {
    setOutput('');
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Prueba tu Código</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Experimenta con algoritmos de IA y Machine Learning directamente en tu navegador.
            Modifica el código de ejemplo o escribe el tuyo propio.
          </p>
        </motion.div>

        <motion.div
          className="bg-gray-900 rounded-xl overflow-hidden shadow-xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-between p-4 bg-gray-800">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="flex space-x-4">
              <select 
                className="bg-gray-700 text-white text-sm rounded px-2 py-1"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="python">Python</option>
                <option value="javascript">JavaScript</option>
                <option value="typescript">TypeScript</option>
              </select>
              <select 
                className="bg-gray-700 text-white text-sm rounded px-2 py-1"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
              >
                <option value="vs-dark">Oscuro</option>
                <option value="light">Claro</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="h-[500px] border-r border-gray-700">
              <MonacoEditor
                height="500px"
                language={language}
                theme={theme}
                value={code}
                onChange={handleCodeChange}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  scrollBeyondLastLine: false,
                  wordWrap: 'on',
                  automaticLayout: true,
                }}
              />
            </div>
            <div className="h-[500px] bg-black text-white p-4 font-mono text-sm overflow-auto">
              <div className="flex justify-between mb-4">
                <h3 className="text-gray-400">Consola</h3>
                <div className="flex space-x-2">
                  <button 
                    onClick={handleClearOutput}
                    className="px-2 py-1 text-xs bg-gray-800 hover:bg-gray-700 rounded"
                    disabled={isRunning}
                  >
                    Limpiar
                  </button>
                  <button 
                    onClick={handleRunCode}
                    className={`px-2 py-1 text-xs rounded flex items-center ${
                      isRunning 
                        ? 'bg-gray-700 cursor-not-allowed' 
                        : 'bg-green-700 hover:bg-green-600'
                    }`}
                    disabled={isRunning}
                  >
                    {isRunning ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Ejecutando...
                      </>
                    ) : (
                      'Ejecutar'
                    )}
                  </button>
                </div>
              </div>
              <div className="whitespace-pre-wrap">
                {output || 'Presiona "Ejecutar" para ver los resultados...'}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600">
            Nota: Este es un entorno simulado. Para una experiencia completa, regístrate y accede a nuestros laboratorios virtuales.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
