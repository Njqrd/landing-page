import React from 'react'
import Waves from '../bits/Backgrounds/Waves/Waves'
import './Footer.css'

const Footer: React.FC = () => {
  const footerLinks = {
    product: [
      { name: 'Features', href: '#features' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'API', href: '#api' },
      { name: 'Documentation', href: '#docs' }
    ],
    company: [
      { name: 'About', href: '#about' },
      { name: 'Blog', href: '#blog' },
      { name: 'Careers', href: '#careers' },
      { name: 'Press', href: '#press' }
    ],
    support: [
      { name: 'Help Center', href: '#help' },
      { name: 'Contact', href: '#contact' },
      { name: 'Status', href: '#status' },
      { name: 'Security', href: '#security' }
    ],
    legal: [
      { name: 'Privacy', href: '#privacy' },
      { name: 'Terms', href: '#terms' },
      { name: 'Cookie Policy', href: '#cookies' },
      { name: 'GDPR', href: '#gdpr' }
    ]
  }

  const socialIcons = [
    { icon: '🐦', name: 'Twitter', href: '#twitter' },
    { icon: '💼', name: 'LinkedIn', href: '#linkedin' },
    { icon: '📘', name: 'Facebook', href: '#facebook' },
    { icon: '📷', name: 'Instagram', href: '#instagram' }
  ]

  return (
    <footer className="footer">
      {/* Wave Background */}
      <div className="footer__background">
        <Waves 
          colorStops={["#1E40AF", "#059669", "#1E40AF"]}
          amplitude={0.3}
          blend={0.4}
        />
      </div>

      {/* Footer Content */}
      <div className="footer__container">
        {/* Main Footer Content */}
        <div className="footer__content">
          {/* Company Info */}
          <div className="footer__company">
            <div className="footer__logo">
              <h3 className="footer__logo-text">Find Alpha IO</h3>
              <p className="footer__tagline">
                The future of cross-border fund analysis
              </p>
            </div>
            
            {/* Newsletter Signup */}
            <div className="footer__newsletter">
              <h4 className="footer__newsletter-title">Stay Updated</h4>
              <p className="footer__newsletter-subtitle">
                Get the latest insights on global ETF analysis
              </p>
              <div className="footer__newsletter-form">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="footer__newsletter-input"
                />
                <button className="footer__newsletter-button cursor-target">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          <div className="footer__links">
            <div className="footer__link-group">
              <h4 className="footer__link-title">Product</h4>
              <ul className="footer__link-list">
                {footerLinks.product.map((link, index) => (
                  <li key={index} className="footer__link-item">
                    <a href={link.href} className="footer__link cursor-target">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer__link-group">
              <h4 className="footer__link-title">Company</h4>
              <ul className="footer__link-list">
                {footerLinks.company.map((link, index) => (
                  <li key={index} className="footer__link-item">
                    <a href={link.href} className="footer__link cursor-target">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer__link-group">
              <h4 className="footer__link-title">Support</h4>
              <ul className="footer__link-list">
                {footerLinks.support.map((link, index) => (
                  <li key={index} className="footer__link-item">
                    <a href={link.href} className="footer__link cursor-target">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer__link-group">
              <h4 className="footer__link-title">Legal</h4>
              <ul className="footer__link-list">
                {footerLinks.legal.map((link, index) => (
                  <li key={index} className="footer__link-item">
                    <a href={link.href} className="footer__link cursor-target">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer__bottom">
          <div className="footer__bottom-content">
            <div className="footer__copyright">
              <p>© 2024 Find Alpha IO. All rights reserved.</p>
            </div>
            
            <div className="footer__social">
              {socialIcons.map((social, index) => (
                <a 
                  key={index}
                  href={social.href}
                  className="footer__social-link cursor-target"
                  aria-label={social.name}
                >
                  <span className="footer__social-icon">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 