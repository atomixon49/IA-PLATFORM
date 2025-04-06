'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function DashboardScene() {
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
    const networkCount = 200; // Nodos de la red
    const nodePositions = new Float32Array(networkCount * 3);
    const nodeColors = new Float32Array(networkCount * 3);
    const nodeSizes = new Float32Array(networkCount);
    
    // Colores para los nodos
    const nodeColor1 = new THREE.Color(0x7928ca); // --accent
    const nodeColor2 = new THREE.Color(0x0070f3); // --primary
    const nodeColor3 = new THREE.Color(0x00c4cc); // --secondary
    
    // Crear distribución de nodos en forma de capas de red neuronal
    const layers = 5; // Número de capas
    const nodesPerLayer = networkCount / layers;
    
    for (let i = 0; i < networkCount; i++) {
      const i3 = i * 3;
      
      // Determinar la capa a la que pertenece este nodo
      const layer = Math.floor(i / nodesPerLayer);
      const nodeInLayer = i % nodesPerLayer;
      
      // Posicionar en forma de capas
      const x = (layer - layers / 2) * 4; // Espaciado horizontal entre capas
      const spread = Math.min(nodesPerLayer * 0.5, 10); // Limitar la expansión vertical
      const y = (nodeInLayer - nodesPerLayer / 2) * (20 / spread);
      const z = Math.random() * 2 - 1; // Pequeña variación en profundidad
      
      nodePositions[i3] = x;
      nodePositions[i3 + 1] = y;
      nodePositions[i3 + 2] = z;
      
      // Color basado en la capa
      let color;
      if (layer === 0) {
        color = nodeColor1; // Capa de entrada
      } else if (layer === layers - 1) {
        color = nodeColor2; // Capa de salida
      } else {
        // Capas ocultas - mezcla de colores
        const t = layer / (layers - 1);
        color = nodeColor1.clone().lerp(nodeColor3, t);
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

    // Crear conexiones entre nodos
    const connectionGeometry = new THREE.BufferGeometry();
    const connectionCount = 300; // Número de conexiones
    const connectionPositions = new Float32Array(connectionCount * 6); // 2 puntos por línea (x,y,z) * 2
    const connectionColors = new Float32Array(connectionCount * 6);
    
    // Crear conexiones aleatorias entre nodos
    for (let i = 0; i < connectionCount; i++) {
      const i6 = i * 6;
      
      // Seleccionar dos nodos aleatorios, pero solo entre capas adyacentes
      const node1 = Math.floor(Math.random() * networkCount);
      const layer1 = Math.floor(node1 / nodesPerLayer);
      const layer2 = Math.min(layer1 + 1, layers - 1); // Capa siguiente
      const node2 = Math.floor(Math.random() * nodesPerLayer) + (layer2 * nodesPerLayer);
      
      // Obtener posiciones de los nodos
      const x1 = nodePositions[node1 * 3];
      const y1 = nodePositions[node1 * 3 + 1];
      const z1 = nodePositions[node1 * 3 + 2];
      
      const x2 = nodePositions[node2 * 3];
      const y2 = nodePositions[node2 * 3 + 1];
      const z2 = nodePositions[node2 * 3 + 2];
      
      // Asignar posiciones a la línea
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

    // Crear partículas de fondo (estrellas)
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 1000;
    const starsPos = new Float32Array(starsCount * 3);
    const starsColors = new Float32Array(starsCount * 3);
    const starsSizes = new Float32Array(starsCount);
    
    // Distribuir estrellas aleatoriamente
    for (let i = 0; i < starsCount; i++) {
      const i3 = i * 3;
      
      // Posición aleatoria en un espacio más grande
      starsPos[i3] = (Math.random() - 0.5) * 100;
      starsPos[i3 + 1] = (Math.random() - 0.5) * 100;
      starsPos[i3 + 2] = (Math.random() - 0.5) * 100 - 50; // Más lejos que la red
      
      // Color blanco/azulado para las estrellas
      const brightness = 0.7 + Math.random() * 0.3;
      starsColors[i3] = brightness;
      starsColors[i3 + 1] = brightness;
      starsColors[i3 + 2] = brightness + Math.random() * 0.2;
      
      // Tamaño variable para las estrellas
      starsSizes[i] = Math.random() * 0.03 + 0.01;
    }
    
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starsPos, 3));
    starsGeometry.setAttribute('color', new THREE.BufferAttribute(starsColors, 3));
    starsGeometry.setAttribute('size', new THREE.BufferAttribute(starsSizes, 1));
    
    const starsMaterial = new THREE.ShaderMaterial({
      uniforms: {},
      vertexShader: nodeVertexShader, // Reutilizamos el shader
      fragmentShader: nodeFragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true
    });
    
    const starsMesh = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starsMesh);

    // Posicionar cámara
    camera.position.z = 20;
    
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
    
    // Animación de pulsos a través de la red
    const pulses: { position: THREE.Vector3, target: THREE.Vector3, progress: number, speed: number }[] = [];
    
    // Crear pulsos iniciales
    for (let i = 0; i < 10; i++) {
      createNewPulse();
    }
    
    function createNewPulse() {
      // Seleccionar un nodo de inicio (preferiblemente de la primera capa)
      const startLayer = Math.floor(Math.random() * 2); // Capa 0 o 1
      const startNode = Math.floor(Math.random() * nodesPerLayer) + (startLayer * nodesPerLayer);
      
      // Seleccionar un nodo de destino (preferiblemente de la última capa)
      const endLayer = layers - 1 - Math.floor(Math.random() * 2); // Penúltima o última capa
      const endNode = Math.floor(Math.random() * nodesPerLayer) + (endLayer * nodesPerLayer);
      
      // Crear el pulso
      pulses.push({
        position: new THREE.Vector3(
          nodePositions[startNode * 3],
          nodePositions[startNode * 3 + 1],
          nodePositions[startNode * 3 + 2]
        ),
        target: new THREE.Vector3(
          nodePositions[endNode * 3],
          nodePositions[endNode * 3 + 1],
          nodePositions[endNode * 3 + 2]
        ),
        progress: 0,
        speed: Math.random() * 0.01 + 0.005
      });
    }
    
    // Geometría y material para los pulsos
    const pulseGeometry = new THREE.SphereGeometry(0.1, 8, 8);
    const pulseMaterial = new THREE.MeshBasicMaterial({
      color: 0x00c4cc,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    
    // Crear meshes para los pulsos
    const pulseMeshes: THREE.Mesh[] = [];
    for (let i = 0; i < pulses.length; i++) {
      const pulseMesh = new THREE.Mesh(pulseGeometry, pulseMaterial.clone());
      pulseMesh.visible = false;
      scene.add(pulseMesh);
      pulseMeshes.push(pulseMesh);
    }
    
    // Animación
    const animate = () => {
      requestAnimationFrame(animate);
      
      const elapsedTime = clock.getElapsedTime();
      
      // Rotación suave para la red
      networkMesh.rotation.y = Math.sin(elapsedTime * 0.1) * 0.2;
      connectionMesh.rotation.y = Math.sin(elapsedTime * 0.1) * 0.2;
      
      // Rotación más lenta para las estrellas de fondo
      starsMesh.rotation.y = elapsedTime * 0.01;
      starsMesh.rotation.x = Math.sin(elapsedTime * 0.005) * 0.1;
      
      // Actualizar pulsos
      for (let i = 0; i < pulses.length; i++) {
        const pulse = pulses[i];
        const pulseMesh = pulseMeshes[i];
        
        // Actualizar progreso
        pulse.progress += pulse.speed;
        
        if (pulse.progress >= 1) {
          // Reiniciar el pulso
          pulse.progress = 0;
          
          // Seleccionar un nuevo nodo de inicio
          const startLayer = Math.floor(Math.random() * 2);
          const startNode = Math.floor(Math.random() * nodesPerLayer) + (startLayer * nodesPerLayer);
          
          // Seleccionar un nuevo nodo de destino
          const endLayer = layers - 1 - Math.floor(Math.random() * 2);
          const endNode = Math.floor(Math.random() * nodesPerLayer) + (endLayer * nodesPerLayer);
          
          // Actualizar posiciones
          pulse.position.set(
            nodePositions[startNode * 3],
            nodePositions[startNode * 3 + 1],
            nodePositions[startNode * 3 + 2]
          );
          
          pulse.target.set(
            nodePositions[endNode * 3],
            nodePositions[endNode * 3 + 1],
            nodePositions[endNode * 3 + 2]
          );
          
          // Cambiar color aleatoriamente
          const pulseColor = new THREE.Color();
          pulseColor.setHSL(Math.random(), 0.8, 0.5);
          (pulseMesh.material as THREE.MeshBasicMaterial).color = pulseColor;
          
          pulseMesh.visible = false;
        } else {
          // Interpolar posición
          const newPos = pulse.position.clone().lerp(pulse.target, pulse.progress);
          pulseMesh.position.copy(newPos);
          
          // Hacer visible y ajustar opacidad
          pulseMesh.visible = true;
          const opacity = Math.sin(pulse.progress * Math.PI);
          (pulseMesh.material as THREE.MeshBasicMaterial).opacity = opacity * 0.8;
          
          // Efecto de pulso en el tamaño
          const scale = 0.1 + Math.sin(pulse.progress * Math.PI) * 0.1;
          pulseMesh.scale.set(scale, scale, scale);
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
      scene.remove(starsMesh);
      
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
      starsGeometry.dispose();
      starsMaterial.dispose();
      pulseGeometry.dispose();
      pulseMaterial.dispose();
      
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-10" />;
}
