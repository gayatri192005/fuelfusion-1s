const express = require("express")
const http = require("http")
const socketIo = require("socket.io")
const cors = require("cors")
const path = require("path")
const fs = require("fs").promises

const app = express()
const server = http.createServer(app)
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
})

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.static("public"))

// In-memory database (replace with actual database in production)
let users = []
let orders = []
const fuelPrices = {
  mumbai: {
    regular: 102.5,
    premium: 108.75,
    diesel: 89.25,
  },
  delhi: {
    regular: 96.72,
    premium: 102.45,
    diesel: 87.62,
  },
  bangalore: {
    regular: 101.94,
    premium: 107.68,
    diesel: 88.94,
  },
  chennai: {
    regular: 99.5,
    premium: 105.25,
    diesel: 86.75,
  },
}

// Load data from files
async function loadData() {
  try {
    const usersData = await fs.readFile("data/users.json", "utf8")
    users = JSON.parse(usersData)
  } catch (error) {
    console.log("No existing users data found, starting fresh")
    users = []
  }

  try {
    const ordersData = await fs.readFile("data/orders.json", "utf8")
    orders = JSON.parse(ordersData)
  } catch (error) {
    console.log("No existing orders data found, starting fresh")
    orders = []
  }
}

// Save data to files
async function saveUsers() {
  try {
    await fs.mkdir("data", { recursive: true })
    await fs.writeFile("data/users.json", JSON.stringify(users, null, 2))
  } catch (error) {
    console.error("Error saving users:", error)
  }
}

async function saveOrders() {
  try {
    await fs.mkdir("data", { recursive: true })
    await fs.writeFile("data/orders.json", JSON.stringify(orders, null, 2))
  } catch (error) {
    console.error("Error saving orders:", error)
  }
}

// Authentication endpoints
app.post("/api/auth/register", async (req, res) => {
  try {
    const { firstName, lastName, phone, email, city, password } = req.body

    // Check if user already exists
    const existingUser = users.find((u) => u.phone === phone || u.email === email)
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this phone number or email",
      })
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      firstName,
      lastName,
      phone,
      email,
      city,
      password, // In production, hash this password
      createdAt: new Date().toISOString(),
      wallet: 0,
      orders: [],
    }

    users.push(newUser)
    await saveUsers()

    // Remove password from response
    const { password: _, ...userResponse } = newUser

    res.json({
      success: true,
      message: "Account created successfully",
      user: userResponse,
    })
  } catch (error) {
    console.error("Registration error:", error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
})

app.post("/api/auth/login", async (req, res) => {
  try {
    const { phone, password } = req.body

    // Find user
    const user = users.find((u) => u.phone === phone && u.password === password)
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid phone number or password",
      })
    }

    // Remove password from response
    const { password: _, ...userResponse } = user

    res.json({
      success: true,
      message: "Login successful",
      user: userResponse,
    })
  } catch (error) {
    console.error("Login error:", error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
})

// Fuel prices endpoint
app.get("/api/fuel-prices/:city", (req, res) => {
  const { city } = req.params
  const prices = fuelPrices[city.toLowerCase()]

  if (!prices) {
    return res.status(404).json({
      success: false,
      message: "City not found",
    })
  }

  res.json({
    success: true,
    city: city,
    prices: prices,
    lastUpdated: new Date().toISOString(),
  })
})

// Orders endpoints
app.post("/api/orders", async (req, res) => {
  try {
    const { userId, fuelType, quantity, address, vehicle, paymentMethod, deliveryTime } = req.body

    // Find user
    const user = users.find((u) => u.id === userId)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    // Get fuel price
    const cityPrices = fuelPrices[user.city.toLowerCase()]
    if (!cityPrices) {
      return res.status(400).json({
        success: false,
        message: "Service not available in your city",
      })
    }

    const fuelPrice = cityPrices[fuelType]
    const fuelCost = fuelPrice * quantity
    const deliveryFee = fuelCost >= 500 ? 0 : 49
    const serviceFee = 25
    const totalAmount = fuelCost + deliveryFee + serviceFee

    // Create order
    const newOrder = {
      id: "FF" + Date.now(),
      userId,
      fuelType,
      quantity,
      fuelPrice,
      fuelCost,
      deliveryFee,
      serviceFee,
      totalAmount,
      address,
      vehicle,
      paymentMethod,
      deliveryTime,
      status: "confirmed",
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 45 * 60000).toISOString(), // 45 minutes from now
      driver: null,
    }

    orders.push(newOrder)
    await saveOrders()

    // Simulate driver assignment after 2 seconds
    setTimeout(() => {
      const order = orders.find((o) => o.id === newOrder.id)
      if (order) {
        order.status = "driver_assigned"
        order.driver = {
          name: "Rajesh Kumar",
          phone: "+91 98765 43210",
          rating: 4.8,
          vehicle: "Electric Delivery Van - MH12AB3456",
        }

        // Emit real-time update
        io.emit("orderUpdate", {
          orderId: order.id,
          status: "driver_assigned",
          driver: order.driver,
        })
      }
    }, 2000)

    res.json({
      success: true,
      message: "Order placed successfully",
      order: newOrder,
    })
  } catch (error) {
    console.error("Order creation error:", error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
})

app.get("/api/orders/:userId", (req, res) => {
  try {
    const { userId } = req.params
    const userOrders = orders.filter((o) => o.userId === userId)

    res.json({
      success: true,
      orders: userOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    })
  } catch (error) {
    console.error("Get orders error:", error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
})

app.get("/api/orders/track/:orderId", (req, res) => {
  try {
    const { orderId } = req.params
    const order = orders.find((o) => o.id === orderId)

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      })
    }

    // Simulate live tracking data
    const trackingData = {
      orderId: order.id,
      status: order.status,
      driver: order.driver,
      estimatedArrival: order.estimatedDelivery,
      currentLocation: {
        lat: 19.076 + (Math.random() - 0.5) * 0.01,
        lng: 72.8777 + (Math.random() - 0.5) * 0.01,
      },
      deliveryLocation: {
        lat: 19.076,
        lng: 72.8777,
      },
      distance: Math.floor(Math.random() * 5) + 1 + " km",
      timeline: [
        {
          status: "confirmed",
          time: order.createdAt,
          description: "Order confirmed and payment received",
        },
        {
          status: "driver_assigned",
          time: new Date(new Date(order.createdAt).getTime() + 2 * 60000).toISOString(),
          description: "Driver assigned and heading to fuel station",
        },
        {
          status: "en_route",
          time: new Date(new Date(order.createdAt).getTime() + 15 * 60000).toISOString(),
          description: "Driver is on the way to your location",
        },
      ],
    }

    res.json({
      success: true,
      tracking: trackingData,
    })
  } catch (error) {
    console.error("Order tracking error:", error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
})

// WebSocket connections for real-time updates
io.on("connection", (socket) => {
  console.log("User connected:", socket.id)

  socket.on("joinOrder", (orderId) => {
    socket.join(orderId)
    console.log(`User ${socket.id} joined order ${orderId}`)
  })

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id)
  })
})

// Simulate order status updates
setInterval(() => {
  orders.forEach((order) => {
    if (order.status === "driver_assigned") {
      order.status = "en_route"
      io.emit("orderUpdate", {
        orderId: order.id,
        status: "en_route",
        message: "Driver is on the way to your location",
      })
    } else if (order.status === "en_route") {
      // Randomly update some orders to delivered
      if (Math.random() < 0.1) {
        order.status = "delivered"
        order.deliveredAt = new Date().toISOString()
        io.emit("orderUpdate", {
          orderId: order.id,
          status: "delivered",
          message: "Fuel delivered successfully!",
        })
      }
    }
  })
}, 30000) // Check every 30 seconds

// Serve static files
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"))
})

app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "dashboard.html"))
})

app.get("/order", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "order.html"))
})

// Initialize data and start server
loadData().then(() => {
  const PORT = process.env.PORT || 3000
  server.listen(PORT, () => {
    console.log(`🚀 Fuel Fusion server running on port ${PORT}`)
    console.log(`📱 Visit http://localhost:${PORT} to access the app`)
  })
})

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("Shutting down gracefully...")
  await saveUsers()
  await saveOrders()
  server.close(() => {
    console.log("Server closed")
    process.exit(0)
  })
})
