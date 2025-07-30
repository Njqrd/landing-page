import React from 'react'
import Aurora from '../bits/Backgrounds/Aurora/Aurora'
import TextType from '../bits/TextAnimations/TextType/TextType'
import GlassIcons from '../bits/Components/GlassIcons/GlassIcons'
import { useTheme } from '../context/ThemeContext'

const HeroSection: React.FC = () => {
  const { currentTheme, colors } = useTheme();
  
  // Hero section typewriter texts
  const heroTexts = [
    "Compare ETFs Across Borders",
    "Unified Global Benchmarks", 
    "Professional-Grade Analytics"
  ]

  // CTA buttons configuration
  const ctaButtons = [
    {
      icon: <span>🚀</span>,
      color: "blue",
      label: "Start Free Trial",
      customClass: "cta-primary"
    },
    {
      icon: <span>📺</span>,
      color: "green", 
      label: "Watch Demo",
      customClass: "cta-secondary"
    }
  ]

  // Theme-aware Aurora colors
  const auroraColors = [
    colors.chartColors.primary,
    colors.meanColor,
    colors.chartColors.primary
  ];

  return (
    <section className="hero-section">
      {/* Aurora Background */}
      <div className="hero-background">
        <Aurora 
          colorStops={auroraColors}
          amplitude={0.8}
          blend={0.6}
          flip={currentTheme === 'light'}
        />
      </div>

      {/* Hero Content */}
      <div className="hero-content">
        {/* Logo */}
        <div className="hero-logo">
          <h1 className="logo-text">Find Alpha IO</h1>
        </div>

        {/* Main Typewriter Text */}
        <div className="hero-typewriter">
          <TextType
            text={heroTexts}
            typingSpeed={80}
            pauseDuration={3000}
            deletingSpeed={50}
            loop={true}
            className="hero-typewriter-text"
            showCursor={true}
            cursorCharacter="|"
            cursorClassName="hero-cursor"
          />
        </div>

        {/* Value Propositions */}
        <div className="hero-value-props">
          <div className="value-prop">
            <span className="value-icon">🚀</span>
            <span>Streamline Global ETF Comparisons</span>
          </div>
          <div className="value-prop">
            <span className="value-icon">📊</span>
            <span>Unified Benchmarks & Currency Handling</span>
          </div>
          <div className="value-prop">
            <span className="value-icon">🎯</span>
            <span>Built for Financial Professionals</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="hero-cta">
          <GlassIcons 
            items={ctaButtons}
            className="hero-cta-buttons"
          />
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <div className="scroll-arrow">↓</div>
          <span className="scroll-text">Scroll to explore</span>
        </div>
      </div>
    </section>
  )
}

export default HeroSection 