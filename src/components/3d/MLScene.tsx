'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function MLScene() {
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

    // Crear sistema de partículas para representar un árbol de decisión
    const treeGeometry = new THREE.BufferGeometry();
    const nodeCount = 100; // Nodos del árbol
    const nodePositions = new Float32Array(nodeCount * 3);
    const nodeColors = new Float32Array(nodeCount * 3);
    const nodeSizes = new Float32Array(nodeCount);
    
    // Colores para los nodos
    const leafColor = new THREE.Color(0x00c4cc); // Hojas (decisiones finales)
    const rootColor = new THREE.Color(0x7928ca); // Raíz (inicio)
    const nodeColor = new THREE.Color(0x0070f3); // Nodos intermedios
    
    // Crear estructura de árbol
    const levels = 5; // Número de niveles del árbol
    const spreadFactor = 2.5; // Factor de expansión horizontal por nivel
    
    for (let i = 0; i < nodeCount; i++) {
      const i3 = i * 3;
      
      // Determinar el nivel del nodo (0 es la raíz)
      const level = Math.floor(Math.log2(i + 1));
      const isLeaf = level >= levels - 1;
      
      // Posicionar en forma de árbol
      const horizontalPos = i - Math.pow(2, level) + 1;
      const horizontalSpread = Math.pow(2, level - 1) * spreadFactor;
      
      const x = horizontalPos * horizontalSpread / Math.pow(2, level - 1);
      const y = -level * 3; // Espaciado vertical entre niveles
      const z = Math.random() * 0.5 - 0.25; // Pequeña variación en profundidad
      
      nodePositions[i3] = x;
      nodePositions[i3 + 1] = y;
      nodePositions[i3 + 2] = z;
      
      // Color basado en el tipo de nodo
      let color;
      if (i === 0) {
        color = rootColor; // Nodo raíz
      } else if (isLeaf) {
        color = leafColor; // Nodos hoja
      } else {
        color = nodeColor; // Nodos intermedios
      }
      
      nodeColors[i3] = color.r;
      nodeColors[i3 + 1] = color.g;
      nodeColors[i3 + 2] = color.b;
      
      // Tamaño variable para los nodos
      nodeSizes[i] = isLeaf ? 0.08 : i === 0 ? 0.15 : 0.1;
    }
    
    treeGeometry.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));
    treeGeometry.setAttribute('color', new THREE.BufferAttribute(nodeColors, 3));
    treeGeometry.setAttribute('size', new THREE.BufferAttribute(nodeSizes, 1));

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

    const treeMesh = new THREE.Points(treeGeometry, nodeMaterial);
    scene.add(treeMesh);

    // Crear conexiones entre nodos (ramas del árbol)
    const edgeGeometry = new THREE.BufferGeometry();
    const edgePositions = [];
    const edgeColors = [];
    
    // Conectar cada nodo con sus hijos
    for (let i = 0; i < nodeCount; i++) {
      const leftChild = 2 * i + 1;
      const rightChild = 2 * i + 2;
      
      if (leftChild < nodeCount) {
        // Conectar con hijo izquierdo
        edgePositions.push(
          nodePositions[i * 3], nodePositions[i * 3 + 1], nodePositions[i * 3 + 2],
          nodePositions[leftChild * 3], nodePositions[leftChild * 3 + 1], nodePositions[leftChild * 3 + 2]
        );
        
        // Color de la conexión
        edgeColors.push(
          nodeColors[i * 3], nodeColors[i * 3 + 1], nodeColors[i * 3 + 2],
          nodeColors[leftChild * 3], nodeColors[leftChild * 3 + 1], nodeColors[leftChild * 3 + 2]
        );
      }
      
      if (rightChild < nodeCount) {
        // Conectar con hijo derecho
        edgePositions.push(
          nodePositions[i * 3], nodePositions[i * 3 + 1], nodePositions[i * 3 + 2],
          nodePositions[rightChild * 3], nodePositions[rightChild * 3 + 1], nodePositions[rightChild * 3 + 2]
        );
        
        // Color de la conexión
        edgeColors.push(
          nodeColors[i * 3], nodeColors[i * 3 + 1], nodeColors[i * 3 + 2],
          nodeColors[rightChild * 3], nodeColors[rightChild * 3 + 1], nodeColors[rightChild * 3 + 2]
        );
      }
    }
    
    edgeGeometry.setAttribute('position', new THREE.Float32BufferAttribute(edgePositions, 3));
    edgeGeometry.setAttribute('color', new THREE.Float32BufferAttribute(edgeColors, 3));
    
    const edgeMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    
    const edgeMesh = new THREE.LineSegments(edgeGeometry, edgeMaterial);
    scene.add(edgeMesh);

    // Crear partículas de datos que fluyen por el árbol
    const dataGeometry = new THREE.BufferGeometry();
    const dataCount = 30;
    const dataPositions = new Float32Array(dataCount * 3);
    const dataColors = new Float32Array(dataCount * 3);
    const dataSizes = new Float32Array(dataCount);
    
    // Inicializar partículas de datos
    for (let i = 0; i < dataCount; i++) {
      const i3 = i * 3;
      
      // Posición inicial (en la raíz)
      dataPositions[i3] = nodePositions[0];
      dataPositions[i3 + 1] = nodePositions[1];
      dataPositions[i3 + 2] = nodePositions[2];
      
      // Color aleatorio para los datos
      const dataColor = new THREE.Color();
      dataColor.setHSL(Math.random(), 0.8, 0.6);
      
      dataColors[i3] = dataColor.r;
      dataColors[i3 + 1] = dataColor.g;
      dataColors[i3 + 2] = dataColor.b;
      
      // Tamaño para las partículas de datos
      dataSizes[i] = 0.06;
    }
    
    dataGeometry.setAttribute('position', new THREE.BufferAttribute(dataPositions, 3));
    dataGeometry.setAttribute('color', new THREE.BufferAttribute(dataColors, 3));
    dataGeometry.setAttribute('size', new THREE.BufferAttribute(dataSizes, 1));
    
    const dataMaterial = new THREE.ShaderMaterial({
      uniforms: {},
      vertexShader: nodeVertexShader, // Reutilizamos el shader
      fragmentShader: nodeFragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true
    });
    
    const dataMesh = new THREE.Points(dataGeometry, dataMaterial);
    scene.add(dataMesh);

    // Datos para el movimiento de las partículas
    const dataState = [];
    for (let i = 0; i < dataCount; i++) {
      dataState.push({
        currentNode: 0,
        targetNode: 0,
        progress: 0,
        speed: 0.01 + Math.random() * 0.02
      });
    }

    // Posicionar cámara
    camera.position.z = 15;
    camera.position.y = 5;
    
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
      
      // Rotación suave para el árbol
      treeMesh.rotation.y = Math.sin(elapsedTime * 0.2) * 0.2;
      edgeMesh.rotation.y = Math.sin(elapsedTime * 0.2) * 0.2;
      dataMesh.rotation.y = Math.sin(elapsedTime * 0.2) * 0.2;
      
      // Actualizar partículas de datos
      const positions = dataGeometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < dataCount; i++) {
        const i3 = i * 3;
        const data = dataState[i];
        
        // Actualizar progreso
        data.progress += data.speed;
        
        if (data.progress >= 1) {
          // Reiniciar desde el nodo actual
          data.progress = 0;
          data.currentNode = data.targetNode;
          
          // Elegir un nuevo nodo destino (hijo izquierdo o derecho)
          const leftChild = 2 * data.currentNode + 1;
          const rightChild = 2 * data.currentNode + 2;
          
          if (leftChild < nodeCount && rightChild < nodeCount) {
            // Elegir aleatoriamente entre izquierda y derecha
            data.targetNode = Math.random() < 0.5 ? leftChild : rightChild;
          } else if (leftChild < nodeCount) {
            data.targetNode = leftChild;
          } else if (rightChild < nodeCount) {
            data.targetNode = rightChild;
          } else {
            // Si es un nodo hoja, volver a la raíz
            data.currentNode = 0;
            data.targetNode = 0;
          }
        }
        
        // Interpolar posición entre nodo actual y destino
        const currentNodeIndex = data.currentNode * 3;
        const targetNodeIndex = data.targetNode * 3;
        
        positions[i3] = nodePositions[currentNodeIndex] + 
                        (nodePositions[targetNodeIndex] - nodePositions[currentNodeIndex]) * data.progress;
        positions[i3 + 1] = nodePositions[currentNodeIndex + 1] + 
                           (nodePositions[targetNodeIndex + 1] - nodePositions[currentNodeIndex + 1]) * data.progress;
        positions[i3 + 2] = nodePositions[currentNodeIndex + 2] + 
                           (nodePositions[targetNodeIndex + 2] - nodePositions[currentNodeIndex + 2]) * data.progress;
      }
      
      dataGeometry.attributes.position.needsUpdate = true;
      
      // Interactividad con el mouse
      camera.position.x += (mouseX - camera.position.x) * 0.05;
      camera.position.y += (-mouseY - camera.position.y) * 0.05;
      camera.lookAt(0, -5, 0); // Mirar hacia el centro del árbol
      
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
      
      scene.remove(treeMesh);
      scene.remove(edgeMesh);
      scene.remove(dataMesh);
      
      treeGeometry.dispose();
      nodeMaterial.dispose();
      edgeGeometry.dispose();
      edgeMaterial.dispose();
      dataGeometry.dispose();
      dataMaterial.dispose();
      
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-10" />;
}
