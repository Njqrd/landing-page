import React from 'react'
import LightRays from '../bits/Backgrounds/LightRays/LightRays'
import ShinyText from '../bits/TextAnimations/ShinyText/ShinyText'

const LightingHeroSection: React.FC = () => {
  return (
    <section className="lighting-hero-section">
      {/* Light Rays Background */}
      <div className="hero-background">
        <LightRays 
          raysOrigin="top-center"
          raysColor={'#ffffff'}
          raysSpeed={0.5}
          lightSpread={0.1}
          rayLength={2}
          pulsating={false}
          fadeDistance={1}
          saturation={0.8}
          followMouse={true}
          mouseInfluence={1}
          noiseAmount={0}
          distortion={0}
        //   className="lighting-rays-background"
        />
      </div>

      {/* Hero Content */}
      <div className="hero-content">
        {/* Logo */}
        <div className="hero-logo">
          <h1 className="logo-text">Find Alpha IO</h1>
        </div>

        {/* Main Shiny Text */}
        <div className="hero-shiny-text">
          <ShinyText
            text="Shining a new light on investment comparisons"
            disabled={false}
            speed={3}
            className="hero-shiny-text-component"
          />
        </div>
      </div>

      {/* Floating Scroll Down Text */}
      <div className="scroll-down-indicator">
        <div className="scroll-text">Scroll Down</div>
        <div className="scroll-arrow">↓</div>
      </div>
    </section>
  )
}

export default LightingHeroSection