"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, MapPin, Phone, MessageCircle, Navigation, Fuel, CheckCircle, Truck } from "lucide-react"
import Link from "next/link"

export default function TrackingPage() {
  const [currentStep, setCurrentStep] = useState(2)
  const [estimatedTime, setEstimatedTime] = useState(12)

  useEffect(() => {
    const interval = setInterval(() => {
      setEstimatedTime((prev) => Math.max(0, prev - 1))
    }, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  const steps = [
    {
      id: 1,
      title: "Order Confirmed",
      description: "Your fuel order has been confirmed",
      time: "2:30 PM",
      completed: true,
    },
    {
      id: 2,
      title: "Driver Assigned",
      description: "Mike is on his way to you",
      time: "2:35 PM",
      completed: true,
    },
    {
      id: 3,
      title: "En Route",
      description: "Driver is heading to your location",
      time: "2:40 PM",
      completed: currentStep >= 3,
    },
    {
      id: 4,
      title: "Arrived",
      description: "Driver has arrived at your location",
      time: "Est. 2:52 PM",
      completed: currentStep >= 4,
    },
    {
      id: 5,
      title: "Fuel Delivered",
      description: "Your fuel has been delivered successfully",
      time: "Est. 3:00 PM",
      completed: currentStep >= 5,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-lg font-semibold">Track Delivery</h1>
              <p className="text-sm text-gray-600">Order #FF003</p>
            </div>
          </div>
          <Badge className="bg-green-100 text-green-800">En Route</Badge>
        </div>
      </header>

      <main className="p-4 space-y-6">
        {/* Live Map Placeholder */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-0">
            <div className="h-48 bg-gradient-to-br from-blue-100 to-green-100 rounded-t-lg relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Navigation className="h-12 w-12 text-blue-600 mx-auto mb-2 animate-pulse" />
                  <p className="text-sm font-medium text-blue-800">Live GPS Tracking</p>
                  <p className="text-xs text-blue-600">Driver is 2.3 miles away</p>
                </div>
              </div>
              {/* Simulated route line */}
              <div className="absolute top-1/4 left-1/4 w-1/2 h-0.5 bg-blue-600 transform rotate-45"></div>
              <div className="absolute top-1/3 right-1/4 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <Truck className="h-4 w-4 text-white" />
              </div>
              <div className="absolute bottom-1/4 left-1/3 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                <MapPin className="h-3 w-3 text-white" />
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Estimated Arrival</p>
                  <p className="text-2xl font-bold text-green-600">{estimatedTime} min</p>
                </div>
                <Button variant="outline" size="sm">
                  <Navigation className="h-4 w-4 mr-2" />
                  View Full Map
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Driver Info */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=48&width=48" />
                  <AvatarFallback>MJ</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">Mike Johnson</h3>
                  <p className="text-sm text-gray-600">Certified Fuel Technician</p>
                  <div className="flex items-center text-sm text-yellow-600">
                    <span className="mr-1">⭐</span>
                    <span>4.9 (127 deliveries)</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <MessageCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Details */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Fuel className="h-5 w-5 mr-2" />
              Order Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Fuel Type</span>
              <span className="font-medium">Premium Gasoline</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Quantity</span>
              <span className="font-medium">10 gallons</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Vehicle</span>
              <span className="font-medium">Silver Honda Civic (XYZ789)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Location</span>
              <span className="font-medium">789 Pine Street</span>
            </div>
            <div className="border-t pt-3">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>$43.49</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Delivery Progress */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Delivery Progress</CardTitle>
            <CardDescription>Track your order status in real-time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-start space-x-3">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      step.completed
                        ? "bg-green-600 text-white"
                        : currentStep === step.id
                          ? "bg-blue-600 text-white animate-pulse"
                          : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    {step.completed ? (
                      <CheckCircle className="h-3 w-3" />
                    ) : (
                      <span className="text-xs font-medium">{step.id}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p
                        className={`font-medium ${
                          step.completed
                            ? "text-green-800"
                            : currentStep === step.id
                              ? "text-blue-800"
                              : "text-gray-600"
                        }`}
                      >
                        {step.title}
                      </p>
                      <span className="text-xs text-gray-500">{step.time}</span>
                    </div>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contact */}
        <Card className="border-0 shadow-lg border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-red-800">Need Help?</h3>
                <p className="text-sm text-red-600">24/7 emergency support available</p>
              </div>
              <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-100">
                <Phone className="h-4 w-4 mr-2" />
                Call Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
