import React, { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = 500; // Fixed height for this background section
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Grid configuration
    const gridSize = 80;
    const cols = Math.ceil(canvas.width / gridSize) + 1;
    const rows = Math.ceil(canvas.height / gridSize) + 1;

    // Create grid paths for particles to follow - as random segments on the grid
    const createGridPaths = () => {
      const paths = [];
      
      // Horizontal paths
      for (let row = 0; row < rows; row++) {
        const y = row * gridSize;
        // Create segments along the horizontal grid line
        const segmentLength = canvas.width / 3; // Approx 1/3 of the screen width for a segment
        const startX = Math.random() * (canvas.width - segmentLength);
        paths.push({
          type: 'horizontal',
          points: [
            { x: startX, y },
            { x: startX + segmentLength, y }
          ],
          y: y
        });
      }
      
      // Vertical paths
      for (let col = 0; col < cols; col++) {
        const x = col * gridSize;
        // Create segments along the vertical grid line
        const segmentLength = canvas.height / 3; // Approx 1/3 of the screen height for a segment
        const startY = Math.random() * (canvas.height - segmentLength);
        paths.push({
          type: 'vertical',
          points: [
            { x, y: startY },
            { x, y: startY + segmentLength }
          ],
          x: x
        });
      }
      
      return paths;
    };

    let paths = []; // Declare paths here
    const initializePaths = () => {
      paths = createGridPaths();
    };
    initializePaths();
    // Re-initialize paths on resize for dynamic grid segments
    window.addEventListener('resize', initializePaths);


    // Particle class
    class Particle {
      constructor() {
        this.reset();
        this.trailLength = 40; // Maintain trail length
        this.trail = [];
      }

      reset() {
        // Choose random path segment
        this.path = paths[Math.floor(Math.random() * paths.length)];
        this.progress = 0; // Progress along the chosen segment (0 to 1)
        this.speed = 0.005 + Math.random() * 0.005; // Varied speeds
        
        // Randomly choose start/end direction for the segment
        this.direction = Math.random() < 0.5 ? 1 : -1; // 1 for forward, -1 for backward

        if (this.path.type === 'horizontal') {
            this.startPoint = this.direction === 1 ? this.path.points[0] : this.path.points[1];
            this.endPoint = this.direction === 1 ? this.path.points[1] : this.path.points[0];
        } else { // vertical
            this.startPoint = this.direction === 1 ? this.path.points[0] : this.path.points[1];
            this.endPoint = this.direction === 1 ? this.path.points[1] : this.path.points[0];
        }

        this.x = this.startPoint.x;
        this.y = this.startPoint.y;

        this.size = 2 + Math.random() * 2; // Particle size
        this.color = `rgba(150, 150, 150, ${0.5 + Math.random() * 0.5})`; // Muted grey color
        this.glowColor = `rgba(180, 180, 180, 0.7)`;
        
        this.trail = [];
      }

      update() {
        this.progress += this.speed;
        
        // Calculate position along path segment
        if (this.progress >= 1) {
            this.reset(); // Reset when particle reaches end of segment
            return;
        }

        const currentX = this.startPoint.x + (this.endPoint.x - this.startPoint.x) * this.progress;
        const currentY = this.startPoint.y + (this.endPoint.y - this.startPoint.y) * this.progress;

        this.x = currentX;
        this.y = currentY;

        // Add current position to trail
        this.trail.push({ x: this.x, y: this.y });
        if (this.trail.length > this.trailLength) {
          this.trail.shift();
        }
      }

      draw(ctx) {
        // Draw trail
        this.trail.forEach((point, index) => {
          // Adjust alpha and size for tapering effect
          const normalizedIndex = index / this.trail.length;
          const alpha = Math.pow(normalizedIndex, 2) * 0.7; // Steeper fade, fixed alpha
          const size = Math.pow(normalizedIndex, 1.5) * this.size * 0.5; // Tapering size
          
          ctx.beginPath();
          ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(150, 150, 150, ${alpha})`; // Muted grey for trail
          ctx.fill();
          
          // Add glow effect for trail
          ctx.shadowColor = this.glowColor;
          ctx.shadowBlur = 8; // Slightly less blur for trail
          ctx.fill();
          ctx.shadowBlur = 0;
        });

        // Draw main particle (head of the beam)
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.glowColor;
        ctx.shadowBlur = 15; // More blur for the head
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    // Create particles
    const numParticles = 20; // Reduced number of particles
    particlesRef.current = Array.from({ length: numParticles }, () => new Particle());

    // Stagger particle start times
    particlesRef.current.forEach((particle, index) => {
      particle.progress = (index / numParticles) * 0.8; // Spread them out
    });

    // Animation loop
    const animate = () => {
      // Clear canvas with a solid background color to prevent previous frames from lingering
      ctx.fillStyle = 'rgb(17, 24, 39)'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particlesRef.current.forEach((particle) => {
        particle.update();
        particle.draw(ctx);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('resize', initializePaths); // Clean up
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[500px] bg-gray-900 overflow-hidden">
      {/* Canvas for animated background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: 'rgb(17, 24, 39)' }} 
      />

      {/* Removed Gradient overlay for depth */}
    </div>
  );
};

export default AnimatedBackground;
