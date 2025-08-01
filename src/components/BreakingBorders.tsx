import React, { useEffect, useRef } from 'react';

const BreakingBorders = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = 700; // Height for the hero section
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Color palette - changed to muted greys
    const colors = {
      background: 'rgb(17, 24, 39)', // Dark charcoal/navy
      particleColor1: 'rgba(150, 150, 150, 1)', // Muted grey
      particleColor2: 'rgba(180, 180, 180, 1)', // Lighter muted grey
      particleColor3: 'rgba(120, 120, 120, 1)', // Darker muted grey
      textPrimary: '#fff',
    };

    // Center of the canvas (where text is assumed to be)
    let centerX = canvas.width / 2;
    let centerY = canvas.height / 2;
    const centralRadius = 180; // Radius around the center where particles reset

    // Update center on resize
    const updateCenter = () => {
      centerX = canvas.width / 2;
      centerY = canvas.height / 2;
    };
    window.addEventListener('resize', updateCenter);

    class Particle {
      constructor() {
        this.reset();
        this.trailLength = 40; // Longer trail for more prominent data flow
        this.trail = [];
        this.pulse = Math.random() * Math.PI * 2; // For pulsation animation
        this.attractionForce = 0.005; // How strongly they are pulled towards the center
      }

      reset() {
        // Start from a random point *outside* the central area
        let startX, startY;
        do {
          startX = Math.random() * canvas.width;
          startY = Math.random() * canvas.height;
          const distFromCenter = Math.sqrt(Math.pow(startX - centerX, 2) + Math.pow(startY - centerY, 2));
          if (distFromCenter > centralRadius) {
            this.x = startX;
            this.y = startY;
            break;
          }
        } while (true); // Keep trying until a valid start point is found

        this.vx = (Math.random() - 0.5) * 0.8; // Slower, subtle initial movement
        this.vy = (Math.random() - 0.5) * 0.8;
        this.size = 1.5 + Math.random() * 1.5; // Slightly smaller, more numerous particles
        this.color = [colors.particleColor1, colors.particleColor2, colors.particleColor3][Math.floor(Math.random() * 3)];
        this.opacity = 0.4 + Math.random() * 0.4; // Slightly lower initial opacity
        this.trail = [];
      }

      update() {
        // Move towards center (pure attraction)
        const dxTarget = centerX - this.x; // Use dynamic centerX
        const dyTarget = centerY - this.y; // Use dynamic centerY
        const distToTarget = Math.sqrt(dxTarget * dxTarget + dyTarget * dyTarget);

        this.vx += dxTarget * this.attractionForce; // Always attract
        this.vy += dyTarget * this.attractionForce; // Always attract

        // Limit velocity to prevent particles from going too fast
        const maxSpeed = 2;
        if (Math.sqrt(this.vx * this.vx + this.vy * this.vy) > maxSpeed) {
            const angle = Math.atan2(this.vy, this.vx);
            this.vx = Math.cos(angle) * maxSpeed;
            this.vy = Math.sin(angle) * maxSpeed;
        }

        this.x += this.vx;
        this.y += this.vy;

        // If particle reaches the central area, reset it to a new random point outside
        if (distToTarget < centralRadius) {
          this.reset();
        }

        // Add current position to trail
        this.trail.push({ x: this.x, y: this.y });
        if (this.trail.length > this.trailLength) {
          this.trail.shift();
        }

        // Update pulsation
        this.pulse += 0.08; // Slightly faster pulsation
      }

      draw(ctx) {
        // Draw trail
        this.trail.forEach((point, index) => {
          const normalizedIndex = index / this.trail.length;
          const alpha = Math.pow(normalizedIndex, 2) * this.opacity * 0.5; // Steeper fade, less intensity
          const size = Math.pow(normalizedIndex, 1.5) * this.size * 0.7; // Tapering size
          
          ctx.beginPath();
          ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
          ctx.fillStyle = this.color.replace(/1\)$/, `${alpha})`); // Adjust alpha
          ctx.fill();
        });

        // Draw main particle with pulsation
        const pulsateSize = this.size + Math.sin(this.pulse) * 0.7; // More pronounced pulsation
        ctx.beginPath();
        ctx.arc(this.x, this.y, pulsateSize, 0, Math.PI * 2);
        ctx.fillStyle = this.color.replace(/1\)$/, `${this.opacity})`);
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 12; // Adjusted blur
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const numParticles = 100; // Increased number of particles for a richer network
    particlesRef.current = Array.from({ length: numParticles }, () => new Particle());

    // Animation loop
    const animate = () => {
      ctx.fillStyle = colors.background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p, i) => {
        p.update();
        p.draw(ctx);

        // Draw lines between nearby particles
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p2 = particlesRef.current[j];
          const dist = Math.sqrt(Math.pow(p.x - p2.x, 2) + Math.pow(p.y - p2.y, 2));
          // Only draw lines if both particles are outside the central clear area
          const distP1 = Math.sqrt(Math.pow(p.x - centerX, 2) + Math.pow(p.y - centerY, 2));
          const distP2 = Math.sqrt(Math.pow(p2.x - centerX, 2) + Math.pow(p2.y - centerY, 2));

          if (dist < 120 && distP1 > centralRadius && distP2 > centralRadius) { 
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            // Dynamic opacity for lines based on distance and particle opacity
            const lineAlpha = (1 - dist / 120) * Math.min(p.opacity, p2.opacity) * 0.15; // Subtle lines
            ctx.strokeStyle = p.color.replace(/1\)$/, `${lineAlpha})`);
            ctx.lineWidth = 0.8; // Slightly thinner lines
            ctx.stroke();
          }
        }
      });

      // Removed Radiant Light Pulse

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('resize', updateCenter); // Clean up new listener
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []); 
\  return (
    <div className="relative w-full h-[700px] overflow-hidden flex items-center justify-center" style={{ backgroundColor: 'rgb(17, 24, 39)' }}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      <div className="relative z-10 text-center px-8">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white leading-tight tracking-wide">
          Breaking down borders on
          <br />
          <span className="font-semibold text-blue-400"> {/* Changed to solid color */} 
            cross-border analysis
          </span>
        </h1>
        <div className="mt-8 flex justify-center">
            <div className="relative w-32 h-0.5 bg-blue-400 overflow-hidden"> {/* Changed to solid color */}
              <div className="absolute inset-0 bg-blue-400 animate-pulse" /> {/* Changed to solid color */}
              <div className="absolute inset-0 bg-white opacity-30 animate-ping" />
            </div>
          </div>
      </div>
    </div>
  );
};

export default BreakingBorders;
