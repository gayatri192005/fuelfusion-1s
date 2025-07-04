"use client"

import { useEffect, useState } from "react"
import "../styles/Hero.css"

const Hero = ({ onGetStarted }) => {
  const [stats, setStats] = useState({
    customers: 0,
    cities: 0,
    hours: 0,
  })

  useEffect(() => {
    // Animate counters
    const animateCounter = (target, key, duration = 2000) => {
      const step = target / (duration / 16)
      let current = 0

      const timer = setInterval(() => {
        current += step
        if (current >= target) {
          setStats((prev) => ({ ...prev, [key]: target }))
          clearInterval(timer)
        } else {
          setStats((prev) => ({ ...prev, [key]: Math.floor(current) }))
        }
      }, 16)
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(50000, "customers")
          animateCounter(100, "cities")
          animateCounter(24, "hours")
          observer.disconnect()
        }
      })
    })

    const heroElement = document.querySelector(".hero-stats")
    if (heroElement) {
      observer.observe(heroElement)
    }

    return () => observer.disconnect()
  }, [])

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(0) + "K+"
    }
    return num.toLocaleString("en-IN")
  }

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge">
              <span className="badge-icon">🚀</span>
              <span>Revolutionary Fuel Delivery in India</span>
            </div>

            <h1 className="hero-title">
              <span className="gradient-text">Premium Fuel</span>
              <br />
              Delivered to Your Doorstep
            </h1>

            <p className="hero-description">
              Skip the petrol pump queues. Get premium fuel delivered anywhere in India, anytime with our eco-friendly
              electric fleet. Available in Mumbai, Delhi, Bangalore, and 50+ cities.
            </p>

            <div className="hero-actions">
              <button className="btn btn-primary btn-large" onClick={onGetStarted}>
                Order Fuel Now
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12h14m-7-7l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button className="btn btn-secondary btn-large">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <polygon points="5,3 19,12 5,21" fill="currentColor" />
                </svg>
                Watch Demo
              </button>
            </div>

            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">{formatNumber(stats.customers)}</span>
                <span className="stat-label">Happy Customers</span>
              </div>
              <div className="stat">
                <span className="stat-number">{stats.cities}+</span>
                <span className="stat-label">Cities Covered</span>
              </div>
              <div className="stat">
                <span className="stat-number">{stats.hours}/7</span>
                <span className="stat-label">Hours Service</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="floating-card" style={{ animationDelay: "0s" }}>
              <div className="card-icon">⚡</div>
              <span>Delivery in 30 mins</span>
            </div>
            <div className="floating-card" style={{ animationDelay: "1s" }}>
              <div className="card-icon">🌱</div>
              <span>100% Eco-friendly</span>
            </div>
            <div className="floating-card" style={{ animationDelay: "2s" }}>
              <div className="card-icon">🛡️</div>
              <span>Safe & Secure</span>
            </div>
            <div className="hero-image">
              <div className="fuel-truck">
                <svg width="200" height="120" viewBox="0 0 200 120" fill="none">
                  <rect x="20" y="60" width="120" height="40" rx="8" fill="var(--primary-blue)" />
                  <circle cx="50" cy="110" r="15" fill="var(--gray-800)" />
                  <circle cx="110" cy="110" r="15" fill="var(--gray-800)" />
                  <rect x="140" y="70" width="40" height="30" rx="4" fill="var(--secondary-teal)" />
                  <path
                    d="M30 60 L30 40 L80 40 L80 60"
                    stroke="var(--primary-blue-light)"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
