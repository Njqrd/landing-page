import React, { useRef, useEffect, useState } from 'react';
import './InteractiveSpotlight.css';

interface InteractiveSpotlightProps {
  text?: string;
}

const InteractiveSpotlight: React.FC<InteractiveSpotlightProps> = ({ text = "Find Alpha" }) => {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [glowColor, setGlowColor] = useState("255, 255, 255"); // White color for spotlight

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!spotlightRef.current || !textRef.current) return;

      const textRect = textRef.current.getBoundingClientRect();
      const textCenterX = textRect.left + textRect.width / 2;
      const textCenterY = textRect.top + textRect.height / 2;

      // Calculate distance from mouse to the center of the text
      const distanceX = e.clientX - textCenterX;
      const distanceY = e.clientY - textCenterY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      // Map distance to opacity: closer = more opaque, further = less opaque (but never fully transparent if within range)
      // Max distance for full opacity: 100px from center. Beyond that, opacity decreases.
      const maxDistanceForEffect = 300; // Adjust this value to control how far the mouse can be for the effect
      const minOpacity = 0.3; // Minimum opacity when mouse is far but still within effect range
      const maxOpacity = 1.0; // Maximum opacity when mouse is close

      let opacity = 0;
      if (distance < maxDistanceForEffect) {
        opacity = maxOpacity - (distance / maxDistanceForEffect) * (maxOpacity - minOpacity);
        opacity = Math.max(opacity, minOpacity); // Ensure it doesn't go below minOpacity
      } else {
        opacity = 0; // Completely transparent if mouse is too far
      }


      spotlightRef.current.style.opacity = `${opacity}`;
      spotlightRef.current.style.transform = `translate(-50%, -50%) translate(${e.clientX}px, ${e.clientY}px)`;
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="interactive-spotlight-container">
      <div className="interactive-spotlight-text" ref={textRef}>
        {text}
      </div>
      <div
        ref={spotlightRef}
        className="interactive-spotlight-blob"
        style={{
          background: `radial-gradient(circle,
            rgba(${glowColor}, 0.15) 0%,
            rgba(${glowColor}, 0.08) 15%,
            rgba(${glowColor}, 0.04) 25%,
            rgba(${glowColor}, 0.02) 40%,
            rgba(${glowColor}, 0.01) 65%,
            transparent 70%
          )`,
        }}
      ></div>
    </div>
  );
};

export default InteractiveSpotlight;
