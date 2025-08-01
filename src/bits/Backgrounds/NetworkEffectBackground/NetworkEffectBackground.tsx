import React, { useEffect, useRef, useState } from 'react';

const NetworkEffectBackground = ({ children }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Particle class
  class Particle {
    constructor(x, y, canvas) {
      this.x = x;
      this.y = y;
      this.originalX = x;
      this.originalY = y;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.radius = Math.random() * 2 + 1;
      this.opacity = Math.random() * 0.5 + 0.3;
      this.canvas = canvas;
      this.pulseSpeed = Math.random() * 0.02 + 0.01;
      this.pulseOffset = Math.random() * Math.PI * 2;
    }

    update(mouse, time) {
      // Mouse attraction
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 150) {
        const force = (150 - distance) / 150;
        this.vx += (dx / distance) * force * 0.003;
        this.vy += (dy / distance) * force * 0.003;
      }

      // Apply velocity with damping
      this.vx *= 0.99;
      this.vy *= 0.99;
      
      // Move particle
      this.x += this.vx;
      this.y += this.vy;

      // Gentle drift back to original position
      this.vx += (this.originalX - this.x) * 0.0005;
      this.vy += (this.originalY - this.y) * 0.0005;

      // Keep particles within bounds with soft bouncing
      if (this.x < 0 || this.x > this.canvas.width) this.vx *= -0.5;
      if (this.y < 0 || this.y > this.canvas.height) this.vy *= -0.5;
      
      this.x = Math.max(0, Math.min(this.canvas.width, this.x));
      this.y = Math.max(0, Math.min(this.canvas.height, this.y));

      // Pulsing effect
      this.currentRadius = this.radius + Math.sin(time * this.pulseSpeed + this.pulseOffset) * 0.5;
    }

    draw(ctx) {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.currentRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#00ffff';
      ctx.fill();
      
      // Add glow effect
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#00ffff';
      ctx.fill();
      ctx.restore();
    }
  }

  // Initialize particles
  const initParticles = (canvas) => {
    particlesRef.current = [];
    const particleCount = Math.min(120, Math.floor((canvas.width * canvas.height) / 8000));
    
    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      particlesRef.current.push(new Particle(x, y, canvas));
    }
  };

  // Draw connections between particles
  const drawConnections = (ctx, particles, mouse, time) => {
    const maxDistance = 120;
    
    particles.forEach((particle, i) => {
      // Connect to nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        const other = particles[j];
        const dx = particle.x - other.x;
        const dy = particle.y - other.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < maxDistance) {
          const opacity = (1 - distance / maxDistance) * 0.4;
          const pulseIntensity = Math.sin(time * 0.003 + distance * 0.01) * 0.2 + 0.8;
          
          ctx.save();
          ctx.globalAlpha = opacity * pulseIntensity;
          ctx.strokeStyle = '#00ffff';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(other.x, other.y);
          ctx.stroke();
          ctx.restore();
        }
      }
      
      // Connect to mouse
      const mouseDistance = Math.sqrt(
        Math.pow(particle.x - mouse.x, 2) + Math.pow(particle.y - mouse.y, 2)
      );
      
      if (mouseDistance < 150) {
        const opacity = (1 - mouseDistance / 150) * 0.6;
        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.strokeStyle = '#00ffff';
        ctx.lineWidth = 2;
        ctx.shadowBlur = 5;
        ctx.shadowColor = '#00ffff';
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
        ctx.restore();
      }
    });
  };

  // Animation loop
  const animate = (time) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Clear canvas with fade effect
    ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw particles
    particlesRef.current.forEach(particle => {
      particle.update(mouseRef.current, time);
      particle.draw(ctx);
    });
    
    // Draw connections
    drawConnections(ctx, particlesRef.current, mouseRef.current, time);
    
    animationRef.current = requestAnimationFrame(animate);
  };

  // Handle mouse movement
  const handleMouseMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  // Handle window resize
  const handleResize = () => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    });
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !dimensions.width) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    // Initialize with dark background
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#0a0a0f';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    initParticles(canvas);
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-gray-900">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 cursor-crosshair"
        onMouseMove={handleMouseMove}
        style={{ background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%)' }}
      />
      
      {/* Content overlay */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default NetworkEffectBackground;