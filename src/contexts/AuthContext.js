"use client"

import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showAuthModal, setShowAuthModal] = useState(false)

  useEffect(() => {
    // Check for stored user data
    const storedUser = localStorage.getItem("fuelFusionUser")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (credentials) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      })

      const data = await response.json()

      if (data.success) {
        setUser(data.user)
        localStorage.setItem("fuelFusionUser", JSON.stringify(data.user))
        setShowAuthModal(false)
        return { success: true }
      } else {
        return { success: false, message: data.message }
      }
    } catch (error) {
      return { success: false, message: "Login failed. Please try again." }
    }
  }

  const register = async (userData) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })

      const data = await response.json()

      if (data.success) {
        setUser(data.user)
        localStorage.setItem("fuelFusionUser", JSON.stringify(data.user))
        setShowAuthModal(false)
        return { success: true }
      } else {
        return { success: false, message: data.message }
      }
    } catch (error) {
      return { success: false, message: "Registration failed. Please try again." }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("fuelFusionUser")
  }

  const openAuthModal = () => setShowAuthModal(true)
  const closeAuthModal = () => setShowAuthModal(false)

  const value = {
    user,
    isLoading,
    showAuthModal,
    login,
    register,
    logout,
    openAuthModal,
    closeAuthModal,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
