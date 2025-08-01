import React, { useState, useEffect, useRef } from 'react';
import './ShinyText.css';

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
  revealOnHover?: boolean; // New prop for cursor-based reveal
}

const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  disabled = false,
  speed = 5,
  className = '',
  revealOnHover = false,
}) => {
  const animationDuration = `${speed}s`;
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!revealOnHover || !textRef.current) return;

    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [revealOnHover]);

  const getCharStyle = (charIndex: number) => {
    if (!revealOnHover || !mousePosition || !textRef.current) {
      return {};
    }

    const charElement = textRef.current.children[charIndex] as HTMLElement;
    if (!charElement) return {};

    const rect = charElement.getBoundingClientRect();
    const charCenterX = rect.left + rect.width / 2;
    // const charCenterY = rect.top + rect.height / 2; // Not needed for X-only reveal

    const distance = Math.abs(mousePosition.x - charCenterX); // Only consider X distance

    // Adjust these values to control the reveal effect
    const maxDistance = 150; // Characters beyond this distance will be fully transparent (adjusted for X-only)
    const minOpacity = 0;
    const maxOpacity = 1;

    const opacity = Math.max(minOpacity, maxOpacity - (distance / maxDistance));

    return { opacity: opacity };
  };

  return (
    <div
      className={`shiny-text ${disabled ? 'disabled' : ''} ${className}`}
      style={{ animationDuration }}
      ref={textRef}
    >
      {revealOnHover ? (
        text.split('').map((char, index) => (
          <span key={index} style={getCharStyle(index)}>
            {char}
          </span>
        ))
      ) : (
        text
      )}
    </div>
  );
};

export default ShinyText;
