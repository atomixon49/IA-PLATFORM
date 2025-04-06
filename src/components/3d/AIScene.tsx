'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function AIScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Configuración básica
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.01);
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: 'high-performance'
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Crear sistema de partículas para representar una red neuronal
    const networkGeometry = new THREE.BufferGeometry();
    const networkCount = 300; // Nodos de la red
    const nodePositions = new Float32Array(networkCount * 3);
    const nodeColors = new Float32Array(networkCount * 3);
    const nodeSizes = new Float32Array(networkCount);
    
    // Colores para los nodos
    const inputColor = new THREE.Color(0x7928ca); // Capa de entrada
    const hiddenColor = new THREE.Color(0x0070f3); // Capas ocultas
    const outputColor = new THREE.Color(0x00c4cc); // Capa de salida
    
    // Crear distribución de nodos en forma de cerebro
    const brainRadius = 5;
    const brainHeight = 4;
    const brainWidth = 6;
    
    for (let i = 0; i < networkCount; i++) {
      const i3 = i * 3;
      
      // Posicionar en forma aproximada de cerebro
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      // Ecuación paramétrica para forma de cerebro
      const r = brainRadius * (1 + 0.3 * Math.sin(4 * theta) * Math.sin(4 * phi));
      
      let x = r * Math.sin(phi) * Math.cos(theta);
      let y = r * Math.sin(phi) * Math.sin(theta);
      let z = r * Math.cos(phi);
      
      // Aplanar un poco para dar forma de cerebro
      x *= brainWidth / brainRadius;
      y *= 1;
      z *= brainHeight / brainRadius;
      
      nodePositions[i3] = x;
      nodePositions[i3 + 1] = y;
      nodePositions[i3 + 2] = z;
      
      // Color basado en la posición
      let color;
      if (x < -brainWidth * 0.5) {
        color = inputColor; // Nodos de entrada (izquierda)
      } else if (x > brainWidth * 0.5) {
        color = outputColor; // Nodos de salida (derecha)
      } else {
        // Nodos ocultos (centro) - gradiente
        const t = (x + brainWidth * 0.5) / brainWidth;
        color = inputColor.clone().lerp(outputColor, t);
      }
      
      nodeColors[i3] = color.r;
      nodeColors[i3 + 1] = color.g;
      nodeColors[i3 + 2] = color.b;
      
      // Tamaño variable para los nodos
      nodeSizes[i] = Math.random() * 0.1 + 0.05;
    }
    
    networkGeometry.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));
    networkGeometry.setAttribute('color', new THREE.BufferAttribute(nodeColors, 3));
    networkGeometry.setAttribute('size', new THREE.BufferAttribute(nodeSizes, 1));

    // Shader personalizado para los nodos
    const nodeVertexShader = `
      attribute float size;
      varying vec3 vColor;
      
      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (300.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `;
    
    const nodeFragmentShader = `
      varying vec3 vColor;
      
      void main() {
        float distance = length(gl_PointCoord - vec2(0.5, 0.5));
        if (distance > 0.5) discard;
        
        float strength = 1.0 - (distance * 2.0);
        strength = pow(strength, 1.5);
        
        gl_FragColor = vec4(vColor, strength);
      }
    `;

    // Material con shaders personalizados
    const nodeMaterial = new THREE.ShaderMaterial({
      uniforms: {},
      vertexShader: nodeVertexShader,
      fragmentShader: nodeFragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true
    });

    const networkMesh = new THREE.Points(networkGeometry, nodeMaterial);
    scene.add(networkMesh);

    // Crear conexiones entre nodos cercanos
    const connectionGeometry = new THREE.BufferGeometry();
    const connectionCount = 200;
    const connectionPositions = new Float32Array(connectionCount * 6); // 2 puntos por línea (x,y,z) * 2
    const connectionColors = new Float32Array(connectionCount * 6);
    
    // Crear conexiones aleatorias entre nodos cercanos
    for (let i = 0; i < connectionCount; i++) {
      const i6 = i * 6;
      
      // Seleccionar dos nodos aleatorios
      const node1 = Math.floor(Math.random() * networkCount);
      const node2 = Math.floor(Math.random() * networkCount);
      
      // Obtener posiciones de los nodos
      const x1 = nodePositions[node1 * 3];
      const y1 = nodePositions[node1 * 3 + 1];
      const z1 = nodePositions[node1 * 3 + 2];
      
      const x2 = nodePositions[node2 * 3];
      const y2 = nodePositions[node2 * 3 + 1];
      const z2 = nodePositions[node2 * 3 + 2];
      
      // Calcular distancia
      const distance = Math.sqrt(
        Math.pow(x2 - x1, 2) + 
        Math.pow(y2 - y1, 2) + 
        Math.pow(z2 - z1, 2)
      );
      
      // Solo conectar si están lo suficientemente cerca
      if (distance < 3) {
        connectionPositions[i6] = x1;
        connectionPositions[i6 + 1] = y1;
        connectionPositions[i6 + 2] = z1;
        connectionPositions[i6 + 3] = x2;
        connectionPositions[i6 + 4] = y2;
        connectionPositions[i6 + 5] = z2;
        
        // Colores de las conexiones
        const color1 = new THREE.Color(
          nodeColors[node1 * 3],
          nodeColors[node1 * 3 + 1],
          nodeColors[node1 * 3 + 2]
        );
        
        const color2 = new THREE.Color(
          nodeColors[node2 * 3],
          nodeColors[node2 * 3 + 1],
          nodeColors[node2 * 3 + 2]
        );
        
        connectionColors[i6] = color1.r;
        connectionColors[i6 + 1] = color1.g;
        connectionColors[i6 + 2] = color1.b;
        connectionColors[i6 + 3] = color2.r;
        connectionColors[i6 + 4] = color2.g;
        connectionColors[i6 + 5] = color2.b;
      }
    }
    
    connectionGeometry.setAttribute('position', new THREE.BufferAttribute(connectionPositions, 3));
    connectionGeometry.setAttribute('color', new THREE.BufferAttribute(connectionColors, 3));
    
    const connectionMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending
    });
    
    const connectionMesh = new THREE.LineSegments(connectionGeometry, connectionMaterial);
    scene.add(connectionMesh);

    // Crear pulsos de activación neuronal
    const pulseGeometry = new THREE.SphereGeometry(0.1, 8, 8);
    const pulseMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    
    const pulseCount = 15;
    const pulseMeshes = [];
    const pulseData = [];
    
    for (let i = 0; i < pulseCount; i++) {
      // Crear mesh para el pulso
      const pulseMesh = new THREE.Mesh(pulseGeometry, pulseMaterial.clone());
      pulseMesh.visible = false;
      scene.add(pulseMesh);
      pulseMeshes.push(pulseMesh);
      
      // Datos para el pulso
      pulseData.push({
        startNode: 0,
        endNode: 0,
        progress: 0,
        speed: 0.01 + Math.random() * 0.02,
        active: false,
        timeOffset: Math.random() * 5 // Offset para que no empiecen todos a la vez
      });
    }

    // Posicionar cámara
    camera.position.z = 15;
    
    // Variables para interactividad
    let mouseX = 0;
    let mouseY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;
    
    // Reloj para animación
    const clock = new THREE.Clock();
    
    // Manejar movimiento del mouse
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - windowHalfX) / 100;
      mouseY = (event.clientY - windowHalfY) / 100;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Animación
    const animate = () => {
      requestAnimationFrame(animate);
      
      const elapsedTime = clock.getElapsedTime();
      
      // Rotación suave para la red neuronal
      networkMesh.rotation.y = elapsedTime * 0.1;
      connectionMesh.rotation.y = elapsedTime * 0.1;
      
      // Efecto de "respiración" para la red
      const breathScale = 1 + Math.sin(elapsedTime * 0.5) * 0.03;
      networkMesh.scale.set(breathScale, breathScale, breathScale);
      connectionMesh.scale.set(breathScale, breathScale, breathScale);
      
      // Actualizar pulsos
      for (let i = 0; i < pulseCount; i++) {
        const pulse = pulseData[i];
        const pulseMesh = pulseMeshes[i];
        
        // Gestionar tiempo de inicio
        if (!pulse.active && elapsedTime > pulse.timeOffset) {
          pulse.active = true;
          
          // Seleccionar nodos aleatorios para el pulso
          pulse.startNode = Math.floor(Math.random() * networkCount);
          pulse.endNode = Math.floor(Math.random() * networkCount);
          pulse.progress = 0;
          
          // Color basado en el nodo de inicio
          const color = new THREE.Color(
            nodeColors[pulse.startNode * 3],
            nodeColors[pulse.startNode * 3 + 1],
            nodeColors[pulse.startNode * 3 + 2]
          );
          
          (pulseMesh.material as THREE.MeshBasicMaterial).color = color;
        }
        
        if (pulse.active) {
          // Actualizar progreso
          pulse.progress += pulse.speed;
          
          if (pulse.progress >= 1) {
            // Reiniciar el pulso
            pulse.active = false;
            pulse.timeOffset = elapsedTime + Math.random() * 2;
            pulseMesh.visible = false;
          } else {
            // Interpolar posición
            const startIdx = pulse.startNode * 3;
            const endIdx = pulse.endNode * 3;
            
            const x = nodePositions[startIdx] + (nodePositions[endIdx] - nodePositions[startIdx]) * pulse.progress;
            const y = nodePositions[startIdx + 1] + (nodePositions[endIdx + 1] - nodePositions[startIdx + 1]) * pulse.progress;
            const z = nodePositions[startIdx + 2] + (nodePositions[endIdx + 2] - nodePositions[startIdx + 2]) * pulse.progress;
            
            pulseMesh.position.set(x, y, z);
            
            // Hacer visible y ajustar opacidad
            pulseMesh.visible = true;
            const opacity = Math.sin(pulse.progress * Math.PI);
            (pulseMesh.material as THREE.MeshBasicMaterial).opacity = opacity * 0.8;
            
            // Efecto de pulso en el tamaño
            const scale = 0.1 + Math.sin(pulse.progress * Math.PI) * 0.1;
            pulseMesh.scale.set(scale, scale, scale);
          }
        }
      }
      
      // Interactividad con el mouse
      camera.position.x += (mouseX - camera.position.x) * 0.05;
      camera.position.y += (-mouseY - camera.position.y) * 0.05;
      camera.lookAt(scene.position);
      
      renderer.render(scene, camera);
    };

    animate();

    // Manejar resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    // Limpieza
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      scene.remove(networkMesh);
      scene.remove(connectionMesh);
      
      // Limpiar pulsos
      pulseMeshes.forEach(mesh => {
        scene.remove(mesh);
        mesh.geometry.dispose();
        mesh.material.dispose();
      });
      
      networkGeometry.dispose();
      nodeMaterial.dispose();
      connectionGeometry.dispose();
      connectionMaterial.dispose();
      pulseGeometry.dispose();
      pulseMaterial.dispose();
      
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-10" />;
}
