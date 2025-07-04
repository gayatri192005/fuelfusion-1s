"use client"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import Header from "../components/Header"
import Hero from "../components/Hero"
import Features from "../components/Features"
import HowItWorks from "../components/HowItWorks"
import Pricing from "../components/Pricing"
import Footer from "../components/Footer"
import "../styles/LandingPage.css"

const LandingPage = () => {
  const { user, openAuthModal } = useAuth()
  const navigate = useNavigate()

  const handleGetStarted = () => {
    if (user) {
      navigate("/dashboard")
    } else {
      openAuthModal()
    }
  }

  return (
    <div className="landing-page">
      <Header onGetStarted={handleGetStarted} />
      <Hero onGetStarted={handleGetStarted} />
      <Features />
      <HowItWorks />
      <Pricing />
      <Footer />
    </div>
  )
}

export default LandingPage
