import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import LandingPage from "./pages/LandingPage"
import Dashboard from "./pages/Dashboard"
import OrderPage from "./pages/OrderPage"
import TrackingPage from "./pages/TrackingPage"
import AuthModal from "./components/AuthModal"
import Notification from "./components/Notification"
import "./styles/App.css"

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/tracking/:orderId" element={<TrackingPage />} />
          </Routes>
          <AuthModal />
          <Notification />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
