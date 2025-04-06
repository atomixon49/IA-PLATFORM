'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function QuantumScene() {
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

    // Crear sistema de partículas para representar qubits y superposición
    const qubitGeometry = new THREE.BufferGeometry();
    const qubitCount = 200;
    const qubitPositions = new Float32Array(qubitCount * 3);
    const qubitColors = new Float32Array(qubitCount * 3);
    const qubitSizes = new Float32Array(qubitCount);
    
    // Colores para los qubits
    const zeroStateColor = new THREE.Color(0x0070f3); // Estado |0⟩
    const oneStateColor = new THREE.Color(0x7928ca); // Estado |1⟩
    const superpositionColor = new THREE.Color(0x00c4cc); // Superposición
    
    // Crear distribución de qubits en forma de esfera de Bloch
    const sphereRadius = 5;
    
    for (let i = 0; i < qubitCount; i++) {
      const i3 = i * 3;
      
      // Posicionar en forma de esfera (representación de Bloch)
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      const x = sphereRadius * Math.sin(phi) * Math.cos(theta);
      const y = sphereRadius * Math.sin(phi) * Math.sin(theta);
      const z = sphereRadius * Math.cos(phi);
      
      qubitPositions[i3] = x;
      qubitPositions[i3 + 1] = y;
      qubitPositions[i3 + 2] = z;
      
      // Color basado en la posición en la esfera
      let color;
      if (z > sphereRadius * 0.7) {
        color = zeroStateColor; // Cerca del polo norte (estado |0⟩)
      } else if (z < -sphereRadius * 0.7) {
        color = oneStateColor; // Cerca del polo sur (estado |1⟩)
      } else {
        // En el ecuador (superposición)
        const t = (z + sphereRadius) / (2 * sphereRadius);
        color = zeroStateColor.clone().lerp(oneStateColor, t);
      }
      
      qubitColors[i3] = color.r;
      qubitColors[i3 + 1] = color.g;
      qubitColors[i3 + 2] = color.b;
      
      // Tamaño variable para los qubits
      qubitSizes[i] = Math.random() * 0.1 + 0.05;
    }
    
    qubitGeometry.setAttribute('position', new THREE.BufferAttribute(qubitPositions, 3));
    qubitGeometry.setAttribute('color', new THREE.BufferAttribute(qubitColors, 3));
    qubitGeometry.setAttribute('size', new THREE.BufferAttribute(qubitSizes, 1));

    // Shader personalizado para los qubits
    const qubitVertexShader = `
      attribute float size;
      varying vec3 vColor;
      
      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (300.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `;
    
    const qubitFragmentShader = `
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
    const qubitMaterial = new THREE.ShaderMaterial({
      uniforms: {},
      vertexShader: qubitVertexShader,
      fragmentShader: qubitFragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true
    });

    const qubitMesh = new THREE.Points(qubitGeometry, qubitMaterial);
    scene.add(qubitMesh);

    // Crear ejes de la esfera de Bloch
    const axisLength = sphereRadius * 1.2;
    const axisGeometry = new THREE.BufferGeometry();
    const axisPositions = new Float32Array([
      0, 0, -axisLength, 0, 0, axisLength, // Eje Z
      -axisLength, 0, 0, axisLength, 0, 0, // Eje X
      0, -axisLength, 0, 0, axisLength, 0  // Eje Y
    ]);
    
    const axisColors = new Float32Array([
      oneStateColor.r, oneStateColor.g, oneStateColor.b, zeroStateColor.r, zeroStateColor.g, zeroStateColor.b, // Eje Z (|0⟩ a |1⟩)
      superpositionColor.r, superpositionColor.g, superpositionColor.b, superpositionColor.r, superpositionColor.g, superpositionColor.b, // Eje X
      superpositionColor.r, superpositionColor.g, superpositionColor.b, superpositionColor.r, superpositionColor.g, superpositionColor.b  // Eje Y
    ]);
    
    axisGeometry.setAttribute('position', new THREE.BufferAttribute(axisPositions, 3));
    axisGeometry.setAttribute('color', new THREE.BufferAttribute(axisColors, 3));
    
    const axisMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending
    });
    
    const axisMesh = new THREE.LineSegments(axisGeometry, axisMaterial);
    scene.add(axisMesh);

    // Crear círculo ecuatorial (superposición)
    const equatorGeometry = new THREE.BufferGeometry();
    const equatorSegments = 64;
    const equatorPositions = new Float32Array(equatorSegments * 3);
    const equatorColors = new Float32Array(equatorSegments * 3);
    
    for (let i = 0; i < equatorSegments; i++) {
      const i3 = i * 3;
      const angle = (i / equatorSegments) * Math.PI * 2;
      
      equatorPositions[i3] = sphereRadius * Math.cos(angle);
      equatorPositions[i3 + 1] = sphereRadius * Math.sin(angle);
      equatorPositions[i3 + 2] = 0;
      
      equatorColors[i3] = superpositionColor.r;
      equatorColors[i3 + 1] = superpositionColor.g;
      equatorColors[i3 + 2] = superpositionColor.b;
    }
    
    equatorGeometry.setAttribute('position', new THREE.BufferAttribute(equatorPositions, 3));
    equatorGeometry.setAttribute('color', new THREE.BufferAttribute(equatorColors, 3));
    
    const equatorMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending
    });
    
    const equatorMesh = new THREE.Line(equatorGeometry, equatorMaterial);
    scene.add(equatorMesh);

    // Crear qubit en superposición que se mueve por la esfera
    const activeQubitGeometry = new THREE.SphereGeometry(0.2, 16, 16);
    const activeQubitMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending
    });
    
    const activeQubit = new THREE.Mesh(activeQubitGeometry, activeQubitMaterial);
    scene.add(activeQubit);
    
    // Crear línea para mostrar el vector de estado del qubit activo
    const stateVectorGeometry = new THREE.BufferGeometry();
    const stateVectorPositions = new Float32Array(6); // 2 puntos (origen y qubit)
    
    stateVectorPositions[0] = 0;
    stateVectorPositions[1] = 0;
    stateVectorPositions[2] = 0;
    stateVectorPositions[3] = 0;
    stateVectorPositions[4] = 0;
    stateVectorPositions[5] = 0;
    
    stateVectorGeometry.setAttribute('position', new THREE.BufferAttribute(stateVectorPositions, 3));
    
    const stateVectorMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });
    
    const stateVector = new THREE.Line(stateVectorGeometry, stateVectorMaterial);
    scene.add(stateVector);

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
      
      // Rotación suave para la esfera de Bloch
      qubitMesh.rotation.y = elapsedTime * 0.1;
      axisMesh.rotation.y = elapsedTime * 0.1;
      equatorMesh.rotation.y = elapsedTime * 0.1;
      
      // Animar qubit activo
      const theta = elapsedTime * 0.5;
      const phi = Math.sin(elapsedTime * 0.3) * Math.PI;
      
      const x = sphereRadius * Math.sin(phi) * Math.cos(theta);
      const y = sphereRadius * Math.sin(phi) * Math.sin(theta);
      const z = sphereRadius * Math.cos(phi);
      
      activeQubit.position.set(x, y, z);
      
      // Actualizar vector de estado
      const positions = stateVector.geometry.attributes.position.array as Float32Array;
      positions[3] = x;
      positions[4] = y;
      positions[5] = z;
      stateVector.geometry.attributes.position.needsUpdate = true;
      
      // Actualizar color del qubit activo basado en su posición
      let qubitColor;
      if (z > sphereRadius * 0.7) {
        qubitColor = zeroStateColor;
      } else if (z < -sphereRadius * 0.7) {
        qubitColor = oneStateColor;
      } else {
        const t = (z + sphereRadius) / (2 * sphereRadius);
        qubitColor = zeroStateColor.clone().lerp(oneStateColor, t);
      }
      
      (activeQubit.material as THREE.MeshBasicMaterial).color = qubitColor;
      
      // Efecto de pulso para el qubit activo
      const scale = 1 + Math.sin(elapsedTime * 3) * 0.2;
      activeQubit.scale.set(scale, scale, scale);
      
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
      
      scene.remove(qubitMesh);
      scene.remove(axisMesh);
      scene.remove(equatorMesh);
      scene.remove(activeQubit);
      scene.remove(stateVector);
      
      qubitGeometry.dispose();
      qubitMaterial.dispose();
      axisGeometry.dispose();
      axisMaterial.dispose();
      equatorGeometry.dispose();
      equatorMaterial.dispose();
      activeQubitGeometry.dispose();
      activeQubitMaterial.dispose();
      stateVectorGeometry.dispose();
      stateVectorMaterial.dispose();
      
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-10" />;
}
