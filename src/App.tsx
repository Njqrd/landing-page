import React from 'react'
import './App.css'
import LandingPage from './components/LandingPage'
import { ThemeProvider } from './context/ThemeContext'
import TargetCursor from './bits/Animations/TargetCursor/TargetCursor'

function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <TargetCursor 
          targetSelector=".cursor-target"
          spinDuration={2}
          hideDefaultCursor={true}
        />
        <LandingPage />
      </div>
    </ThemeProvider>
  )
}

export default App
