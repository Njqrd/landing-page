import React, { useRef, useEffect } from 'react';

const FloatingFinanceDie = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    // Load Three.js from CDN
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.onload = () => {
      initScene();
    };
    document.head.appendChild(script);

    const initScene = () => {
      if (!mountRef.current || !window.THREE) return;

      const THREE = window.THREE;

      // Scene setup
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0f0f23);
      sceneRef.current = scene;

      // Camera setup
      const camera = new THREE.PerspectiveCamera(
        75, 
        window.innerWidth / window.innerHeight, 
        0.1, 
        1000
      );
      camera.position.z = 5;

      // Renderer setup
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      rendererRef.current = renderer;
      mountRef.current.appendChild(renderer.domElement);

      // Lighting
      const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(5, 5, 5);
      directionalLight.castShadow = true;
      directionalLight.shadow.mapSize.width = 2048;
      directionalLight.shadow.mapSize.height = 2048;
      scene.add(directionalLight);

      const pointLight = new THREE.PointLight(0x4169e1, 0.8, 100);
      pointLight.position.set(-5, 5, 5);
      scene.add(pointLight);

      // Create octahedron geometry
      const geometry = new THREE.OctahedronGeometry(1.5, 0);

      // Financial metrics for each face
      const metrics = [
        `Rate of
Return`,
        `Sharpe
Ratio`,
        `Sortino
Ratio`,
        `Max
Drawdown`,
        `Volatility`,
        `Alpha`,
        `Beta`,
        `R/R
Ratio`
      ];

      // Create materials with text textures
      const materials = metrics.map((metric, index) => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 256;
        canvas.height = 256;

        // Background gradient
        const gradient = context.createLinearGradient(0, 0, 256, 256);
        const hue = (index * 45) % 360;
        gradient.addColorStop(0, `hsl(${hue}, 70%, 60%)`);
        gradient.addColorStop(1, `hsl(${hue + 30}, 70%, 40%)`);
        
        context.fillStyle = gradient;
        context.fillRect(0, 0, 256, 256);

        // Border
        context.strokeStyle = '#ffffff';;
        context.lineWidth = 4;
        context.strokeRect(2, 2, 252, 252);

        // Text
        context.fillStyle = '#ffffff';;
        context.font = 'bold 24px Arial';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        
        const lines = metric.split('
');
        const lineHeight = 30;
        const startY = 128 - (lines.length - 1) * lineHeight / 2;
        
        lines.forEach((line, lineIndex) => {
          context.fillText(line, 128, startY + lineIndex * lineHeight);
        });

        const texture = new THREE.CanvasTexture(canvas);
        return new THREE.MeshLambertMaterial({
          map: texture,
          transparent: true
        });
      });

      // Create the octahedron mesh
      const octahedron = new THREE.Mesh(geometry, materials);
      octahedron.castShadow = true;
      octahedron.receiveShadow = true;
      scene.add(octahedron);

      // Add floating particles
      const particlesGeometry = new THREE.BufferGeometry();
      const particlesCount = 100;
      const posArray = new Float32Array(particlesCount * 3);

      for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 20;
      }

      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: 0x4169e1,
        transparent: true,
        opacity: 0.6
      });

      const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particlesMesh);

      // Animation variables
      let time = 0;

      // Animation loop
      const animate = () => {
        frameRef.current = requestAnimationFrame(animate);
        time += 0.01;

        // Rotate the octahedron
        octahedron.rotation.x += 0.005;
        octahedron.rotation.y += 0.008;
        octahedron.rotation.z += 0.003;

        // Float the octahedron
        octahedron.position.y = Math.sin(time) * 0.3;
        octahedron.position.x = Math.cos(time * 0.7) * 0.2;

        // Animate particles
        particlesMesh.rotation.y += 0.001;
        
        const positions = particlesMesh.geometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
          positions[i + 1] += Math.sin(time + i) * 0.001;
        }
        particlesMesh.geometry.attributes.position.needsUpdate = true;

        renderer.render(scene, camera);
      };

      animate();

      // Handle window resize
      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener('resize', handleResize);
    };

    // Cleanup
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      if (rendererRef.current && mountRef.current && rendererRef.current.domElement) {
        mountRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
  }, []);

  return (
    <div className="w-full h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div ref={mountRef} className="w-full h-full" />
      <div className="absolute top-8 left-8 text-white z-10">
        <h1 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          Financial Metrics Die
        </h1>
        <p className="text-gray-300 text-lg">
          Rotating through key investment performance indicators
        </p>
      </div>
      
      {/* Loading indicator */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-white text-xl animate-pulse">
          Loading 3D Scene...
        </div>
      </div>
    </div>
  );
};

export default FloatingFinanceDie;