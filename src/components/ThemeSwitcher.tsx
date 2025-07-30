import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';
import './ThemeSwitcher.css';

const ThemeSwitcher: React.FC = () => {
  const { currentTheme, toggleTheme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = () => {
    setIsAnimating(true);
    toggleTheme();
    
    // Reset animation state after animation completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div className="theme-switcher">
      <button 
        className={`theme-toggle-btn ${isAnimating ? 'animating' : ''}`}
        onClick={handleToggle}
        aria-label={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} theme`}
        title={`Current theme: ${currentTheme}. Click to switch to ${currentTheme === 'light' ? 'dark' : 'light'}`}
      >
        {currentTheme === 'light' ? (
          <FaMoon className="theme-icon" />
        ) : (
          <FaSun className="theme-icon" />
        )}
      </button>
    </div>
  );
};

export default ThemeSwitcher; 