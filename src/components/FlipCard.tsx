import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface FlipCardProps {
  frontContent: React.ReactNode
  backContent: React.ReactNode
  className?: string
  width?: string
  height?: string
  flipDuration?: number
  perspective?: number
}

const FlipCard: React.FC<FlipCardProps> = ({
  frontContent,
  backContent,
  className = '',
  width = '300px',
  height = '200px',
  flipDuration = 0.6,
  perspective = 1000
}) => {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleMouseEnter = () => {
    setIsFlipped(true)
  }

  const handleMouseLeave = () => {
    setIsFlipped(false)
  }

  return (
    <div
      className={`flip-card-container cursor-target ${className}`}
      style={{
        width,
        height,
        perspective: `${perspective}px`,
        cursor: 'pointer'
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="flip-card-inner"
        animate={{
          rotateY: isFlipped ? 180 : 0
        }}
        transition={{
          duration: flipDuration,
          ease: "easeInOut"
        }}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          textAlign: 'center',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Front of card */}
        <motion.div
          className="flip-card-front"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '12px',
            padding: '2rem',
            background: 'linear-gradient(135deg, rgba(30, 64, 175, 0.1), rgba(5, 150, 105, 0.1))',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            color: '#fff'
          }}
        >
          {frontContent}
        </motion.div>

        {/* Back of card */}
        <motion.div
          className="flip-card-back"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '12px',
            padding: '2rem',
            background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.2), rgba(30, 64, 175, 0.2))',
            border: '1px solid rgba(5, 150, 105, 0.3)',
            backdropFilter: 'blur(10px)',
            color: '#fff'
          }}
        >
          {backContent}
        </motion.div>
      </motion.div>
    </div>
  )
}

export default FlipCard 