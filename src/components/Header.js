"use client"

import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import "../styles/Header.css"

const Header = ({ onGetStarted }) => {
  const { user } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="header">
      <div className="container">
        <nav className="navbar">
          <div className="nav-brand">
            <div className="brand-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" fill="url(#gradient)" />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--primary-blue)" />
                    <stop offset="100%" stopColor="var(--secondary-teal)" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="brand-text">Fuel Fusion</span>
          </div>

          <div className={`nav-menu ${isMobileMenuOpen ? "active" : ""}`}>
            <a href="#features" className="nav-link">
              Features
            </a>
            <a href="#how-it-works" className="nav-link">
              How It Works
            </a>
            <a href="#pricing" className="nav-link">
              Pricing
            </a>
            <button className="btn btn-primary" onClick={onGetStarted}>
              {user ? "Dashboard" : "Get Started"}
            </button>
          </div>

          <button className="mobile-menu-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Header
