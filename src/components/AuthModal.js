"use client"

import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import "../styles/AuthModal.css"

export default function AuthModal() {
  const { showAuthModal, closeAuthModal, login, register } = useAuth()

  const [isLogin, setIsLogin] = useState(true)
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  if (!showAuthModal) return null

  const handleChange = (e) => setFormState({ ...formState, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const { name, email, password } = formState
    const creds = { name, email, password }

    const result = isLogin ? await login({ email, password }) : await register(creds)

    if (!result.success) setError(result.message || "Something went wrong")
    setLoading(false)
  }

  return (
    <div className="auth-backdrop" onClick={closeAuthModal}>
      <div
        className="auth-modal"
        onClick={(e) => {
          /* stop bubbling so backdrop click closes */
          e.stopPropagation()
        }}
      >
        <button className="auth-close" onClick={closeAuthModal}>
          ×
        </button>

        <div className="auth-toggle">
          <button className={isLogin ? "active" : ""} onClick={() => setIsLogin(true)}>
            Login
          </button>
          <button className={!isLogin ? "active" : ""} onClick={() => setIsLogin(false)}>
            Sign&nbsp;Up
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input type="text" name="name" placeholder="Name" value={formState.name} onChange={handleChange} required />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formState.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formState.password}
            onChange={handleChange}
            minLength={6}
            required
          />

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Please wait…" : isLogin ? "Login" : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  )
}
