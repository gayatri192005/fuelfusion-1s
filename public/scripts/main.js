// Global variables
let currentUser = null
let isLoading = false

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
  setupEventListeners()
  animateCounters()
  checkAuthStatus()
})

// Initialize application
function initializeApp() {
  console.log("🚀 Fuel Fusion App Initialized")

  // Check if user is logged in
  const userData = localStorage.getItem("fuelFusionUser")
  if (userData) {
    currentUser = JSON.parse(userData)
    console.log("User logged in:", currentUser.firstName)
  }

  // Initialize animations
  initializeAnimations()
}

// Setup event listeners
function setupEventListeners() {
  // Auth form submissions
  const loginForm = document.getElementById("loginForm")
  const registerForm = document.getElementById("registerForm")

  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin)
  }

  if (registerForm) {
    registerForm.addEventListener("submit", handleRegister)
  }

  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", toggleMobileMenu)
  }

  // Payment method selection
  const paymentOptions = document.querySelectorAll(".payment-option")
  paymentOptions.forEach((option) => {
    option.addEventListener("click", function () {
      selectPaymentMethod(this)
    })
  })

  // Close modal when clicking outside
  window.addEventListener("click", (event) => {
    const modal = document.getElementById("authModal")
    if (event.target === modal) {
      closeAuthModal()
    }
  })
}

// Authentication functions
async function handleLogin(event) {
  event.preventDefault()

  const phone = document.getElementById("loginPhone").value
  const password = document.getElementById("loginPassword").value

  if (!validatePhone(phone)) {
    showNotification("Please enter a valid 10-digit mobile number", "error")
    return
  }

  showLoading(true)

  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone: "+91" + phone, password }),
    })

    const data = await response.json()

    if (data.success) {
      currentUser = data.user
      localStorage.setItem("fuelFusionUser", JSON.stringify(currentUser))
      showNotification("Login successful! Welcome back.", "success")
      closeAuthModal()

      // Redirect to dashboard after a short delay
      setTimeout(() => {
        window.location.href = "/dashboard"
      }, 1500)
    } else {
      showNotification(data.message, "error")
    }
  } catch (error) {
    console.error("Login error:", error)
    showNotification("Login failed. Please try again.", "error")
  } finally {
    showLoading(false)
  }
}

async function handleRegister(event) {
  event.preventDefault()

  const firstName = document.getElementById("firstName").value
  const lastName = document.getElementById("lastName").value
  const phone = document.getElementById("registerPhone").value
  const email = document.getElementById("email").value
  const city = document.getElementById("city").value
  const password = document.getElementById("registerPassword").value
  const termsAccepted = document.getElementById("terms").checked

  // Validation
  if (!validatePhone(phone)) {
    showNotification("Please enter a valid 10-digit mobile number", "error")
    return
  }

  if (!validateEmail(email)) {
    showNotification("Please enter a valid email address", "error")
    return
  }

  if (password.length < 6) {
    showNotification("Password must be at least 6 characters long", "error")
    return
  }

  if (!termsAccepted) {
    showNotification("Please accept the Terms of Service and Privacy Policy", "error")
    return
  }

  showLoading(true)

  try {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        phone: "+91" + phone,
        email,
        city,
        password,
      }),
    })

    const data = await response.json()

    if (data.success) {
      currentUser = data.user
      localStorage.setItem("fuelFusionUser", JSON.stringify(currentUser))
      showNotification("Account created successfully! Welcome to Fuel Fusion.", "success")
      closeAuthModal()

      // Redirect to dashboard after a short delay
      setTimeout(() => {
        window.location.href = "/dashboard"
      }, 1500)
    } else {
      showNotification(data.message, "error")
    }
  } catch (error) {
    console.error("Registration error:", error)
    showNotification("Registration failed. Please try again.", "error")
  } finally {
    showLoading(false)
  }
}

// Validation functions
function validatePhone(phone) {
  const phoneRegex = /^[6-9]\d{9}$/
  return phoneRegex.test(phone)
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Modal functions
function openAuthModal() {
  const modal = document.getElementById("authModal")
  modal.classList.add("active")
  document.body.style.overflow = "hidden"
}

function closeAuthModal() {
  const modal = document.getElementById("authModal")
  modal.classList.remove("active")
  document.body.style.overflow = "auto"
}

function switchTab(tabName) {
  // Update tab buttons
  const tabButtons = document.querySelectorAll(".tab-btn")
  tabButtons.forEach((btn) => btn.classList.remove("active"))
  event.target.classList.add("active")

  // Update forms
  const forms = document.querySelectorAll(".auth-form")
  forms.forEach((form) => form.classList.remove("active"))

  const targetForm = tabName === "login" ? "loginForm" : "registerForm"
  document.getElementById(targetForm).classList.add("active")
}

// Password toggle
function togglePassword(inputId) {
  const input = document.getElementById(inputId)
  const button = input.nextElementSibling
  const icon = button.querySelector("i")

  if (input.type === "password") {
    input.type = "text"
    icon.classList.remove("fa-eye")
    icon.classList.add("fa-eye-slash")
  } else {
    input.type = "password"
    icon.classList.remove("fa-eye-slash")
    icon.classList.add("fa-eye")
  }
}

// Loading functions
function showLoading(show) {
  const overlay = document.getElementById("loadingOverlay")
  if (show) {
    overlay.classList.add("active")
    isLoading = true
  } else {
    overlay.classList.remove("active")
    isLoading = false
  }
}

// Notification system
function showNotification(message, type = "info") {
  // Create notification element
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `

  document.body.appendChild(notification)

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.style.animation = "slideOutRight 0.3s ease"
      setTimeout(() => notification.remove(), 300)
    }
  }, 5000)
}

function getNotificationIcon(type) {
  switch (type) {
    case "success":
      return "fa-check-circle"
    case "error":
      return "fa-exclamation-circle"
    case "warning":
      return "fa-exclamation-triangle"
    default:
      return "fa-info-circle"
  }
}

function getNotificationColor(type) {
  switch (type) {
    case "success":
      return "#10b981"
    case "error":
      return "#ef4444"
    case "warning":
      return "#f59e0b"
    default:
      return "#3b82f6"
  }
}

// Animation functions
function animateCounters() {
  const counters = document.querySelectorAll("[data-count]")

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target
        const target = Number.parseInt(counter.getAttribute("data-count"))
        const duration = 2000 // 2 seconds
        const step = target / (duration / 16) // 60fps
        let current = 0

        const timer = setInterval(() => {
          current += step
          if (current >= target) {
            counter.textContent = target.toLocaleString()
            clearInterval(timer)
          } else {
            counter.textContent = Math.floor(current).toLocaleString()
          }
        }, 16)

        observer.unobserve(counter)
      }
    })
  })

  counters.forEach((counter) => observer.observe(counter))
}

function initializeAnimations() {
  // Add CSS for animations
  const style = document.createElement("style")
  style.textContent = `
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(100px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideOutRight {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(100px);
            }
        }
        
        .notification {
            animation: slideInRight 0.3s ease;
        }
    `
  document.head.appendChild(style)
}

// Mobile menu toggle
function toggleMobileMenu() {
  const navMenu = document.querySelector(".nav-menu")
  if (navMenu) {
    navMenu.classList.toggle("active")
  }
}

// Payment method selection
function selectPaymentMethod(element) {
  // Remove selected class from all options
  const paymentOptions = document.querySelectorAll(".payment-option")
  paymentOptions.forEach((option) => option.classList.remove("selected"))

  // Add selected class to clicked option
  element.classList.add("selected")

  // Update radio button
  const radio = element.querySelector('input[type="radio"]')
  if (radio) {
    radio.checked = true
  }
}

// Demo video function
function playDemo() {
  showNotification("Demo video coming soon!", "info")
}

// Check authentication status
function checkAuthStatus() {
  const userData = localStorage.getItem("fuelFusionUser")
  if (userData && (window.location.pathname === "/" || window.location.pathname === "/index.html")) {
    // User is logged in but on landing page, show option to go to dashboard
    const getStartedBtns = document.querySelectorAll('button[onclick="openAuthModal()"]')
    getStartedBtns.forEach((btn) => {
      btn.textContent = "Go to Dashboard"
      btn.onclick = () => (window.location.href = "/dashboard")
    })
  }
}

// Utility functions
function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount)
}

function formatDate(dateString) {
  return new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateString))
}

// Forgot password function
function showForgotPassword() {
  showNotification("Password reset feature coming soon! Please contact support.", "info")
}

// Emergency call function
function callEmergency() {
  if (confirm("Do you want to call our 24/7 emergency support?")) {
    window.location.href = "tel:+911800123456"
  }
}

// Navigation functions
function navigateToOrder() {
  if (currentUser) {
    window.location.href = "/order"
  } else {
    openAuthModal()
  }
}

function goBack() {
  window.history.back()
}

// Show help function
function showHelp() {
  showNotification("Need help? Call us at 1800-123-456 or chat with our support team.", "info")
}

// Logout function
function logout() {
  if (confirm("Are you sure you want to logout?")) {
    localStorage.removeItem("fuelFusionUser")
    currentUser = null
    showNotification("Logged out successfully!", "success")
    setTimeout(() => {
      window.location.href = "/"
    }, 1500)
  }
}

// Export functions for global access
window.openAuthModal = openAuthModal
window.closeAuthModal = closeAuthModal
window.switchTab = switchTab
window.togglePassword = togglePassword
window.playDemo = playDemo
window.showForgotPassword = showForgotPassword
window.callEmergency = callEmergency
window.navigateToOrder = navigateToOrder
window.goBack = goBack
window.showHelp = showHelp
window.logout = logout
window.selectPaymentMethod = selectPaymentMethod
window.toggleMobileMenu = toggleMobileMenu
