import React from 'react';
import Particles from '../bits/Backgrounds/Particles/Particles';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      {/* Removed footer-base-background div, footer itself will handle solid background */}
      <div className="footer__background">
        <Particles
          particleCount={40}
          particleColors={["#B0B0B0"]} /* Adjusted particle color for subtlety */
        />
      </div>
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>FindAlpha.io</h3>
            <p>Empowering data-driven investment decisions with AI-powered insights for funds and ETFs.</p>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="app.findalpha.io" target="_blank" rel="noopener noreferrer">Find Alpha App</a></li>
              <li><a href="docs.findalpha.io" target="_blank" rel="noopener noreferrer">Documentation</a></li>
              <li><a href="/contact" target="_blank" rel="noopener noreferrer">Contact</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Connect</h3>
            <div className="social-links">
              <a href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i> Twitter/X</a>
              <a href="www.linkedin.com/in/marcocostajohn" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i> LinkedIn</a>
            </div>
          </div>


        </div>
        <div className="footer-bottom">
          <p>© 2025 FindAlpha.io. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;