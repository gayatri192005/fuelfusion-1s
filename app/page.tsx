"use client"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Fuel, MapPin, Clock, Shield, Leaf, Smartphone, Star, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-lg">
              <Fuel className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Fuel Fusion
            </span>
          </div>
          <Link href="/auth">
            <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
              Get Started
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">🚀 Revolutionary Fuel Delivery</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Fuel Delivered to Your Doorstep
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Skip the gas station queues. Get premium fuel delivered anywhere, anytime with our eco-friendly electric
            fleet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
              >
                Order Fuel Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Fuel Fusion?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="bg-blue-100 p-3 rounded-lg w-fit">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle>24/7 Availability</CardTitle>
              <CardDescription>
                Get fuel delivered anytime, anywhere. No more worrying about station hours.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="bg-green-100 p-3 rounded-lg w-fit">
                <MapPin className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle>Doorstep Delivery</CardTitle>
              <CardDescription>Fuel delivered directly to your location. Perfect for busy schedules.</CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="bg-purple-100 p-3 rounded-lg w-fit">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle>Enhanced Safety</CardTitle>
              <CardDescription>Avoid unsafe areas and late-night station visits. Stay secure.</CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="bg-green-100 p-3 rounded-lg w-fit">
                <Leaf className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle>Eco-Friendly Fleet</CardTitle>
              <CardDescription>Our electric delivery vehicles reduce carbon footprint.</CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="bg-blue-100 p-3 rounded-lg w-fit">
                <Smartphone className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle>Smart App Experience</CardTitle>
              <CardDescription>Real-time tracking, secure payments, and seamless ordering.</CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="bg-yellow-100 p-3 rounded-lg w-fit">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
              <CardTitle>Premium Service</CardTitle>
              <CardDescription>Roadside assistance, maintenance checks, and 24/7 support.</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Order via App</h3>
              <p className="text-gray-600">
                Select fuel type, quantity, and delivery location through our user-friendly app.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-time Tracking</h3>
              <p className="text-gray-600">
                Track your delivery in real-time with GPS and get accurate arrival estimates.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Fuel Delivered</h3>
              <p className="text-gray-600">Our certified technician safely delivers premium fuel to your vehicle.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Skip the Gas Station?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of satisfied customers who've made the switch.</p>
          <Link href="/auth">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
              Start Your First Delivery
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-lg">
                  <Fuel className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">Fuel Fusion</span>
              </div>
              <p className="text-gray-400">Revolutionizing fuel delivery with convenience and sustainability.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Fuel Delivery</li>
                <li>Emergency Service</li>
                <li>Roadside Assistance</li>
                <li>Fleet Solutions</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Safety Guidelines</li>
                <li>Terms of Service</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Careers</li>
                <li>Press</li>
                <li>Sustainability</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Fuel Fusion. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
