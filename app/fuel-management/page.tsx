"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Fuel, Droplets, Gauge, CheckCircle, TrendingUp, Calendar, Bell, Zap, Leaf } from "lucide-react"
import Link from "next/link"

interface FuelQuality {
  octaneRating: number
  purityLevel: number
  contaminants: string[]
  expiryDate: string
  qualityScore: number
}

interface VehicleData {
  id: string
  name: string
  fuelLevel: number
  fuelCapacity: number
  efficiency: number
  lastRefill: string
  nextService: string
  carbonSaved: number
}

export default function FuelManagementPage() {
  const [vehicles, setVehicles] = useState<VehicleData[]>([
    {
      id: "1",
      name: "Honda Civic",
      fuelLevel: 25,
      fuelCapacity: 50,
      efficiency: 15.2,
      lastRefill: "2024-01-15",
      nextService: "2024-02-15",
      carbonSaved: 12.5,
    },
    {
      id: "2",
      name: "Maruti Swift",
      fuelLevel: 80,
      fuelCapacity: 42,
      efficiency: 18.5,
      lastRefill: "2024-01-18",
      nextService: "2024-03-10",
      carbonSaved: 8.3,
    },
  ])

  const [fuelQuality, setFuelQuality] = useState<FuelQuality>({
    octaneRating: 91,
    purityLevel: 98.5,
    contaminants: [],
    expiryDate: "2024-06-15",
    qualityScore: 95,
  })

  const [recurringOrders, setRecurringOrders] = useState([
    {
      id: "1",
      vehicleId: "1",
      frequency: "weekly",
      amount: 20,
      nextDelivery: "2024-01-22",
      active: true,
    },
  ])

  const totalCarbonSaved = vehicles.reduce((sum, vehicle) => sum + vehicle.carbonSaved, 0)
  const averageEfficiency = vehicles.reduce((sum, vehicle) => sum + vehicle.efficiency, 0) / vehicles.length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Button>
            </Link>
            <h1 className="text-xl font-semibold">Smart Fuel Management</h1>
          </div>
          <Button className="bg-gradient-to-r from-blue-600 to-green-600">
            <Bell className="h-4 w-4 mr-2" />
            Smart Alerts
          </Button>
        </div>
      </header>

      <main className="p-4 space-y-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Vehicles</p>
                  <p className="text-2xl font-bold">{vehicles.length}</p>
                </div>
                <Fuel className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg Efficiency</p>
                  <p className="text-2xl font-bold">{averageEfficiency.toFixed(1)} km/L</p>
                </div>
                <Gauge className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Carbon Saved</p>
                  <p className="text-2xl font-bold">{totalCarbonSaved.toFixed(1)} kg</p>
                </div>
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Fuel Quality</p>
                  <p className="text-2xl font-bold">{fuelQuality.qualityScore}%</p>
                </div>
                <CheckCircle className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="vehicles" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="vehicles">My Vehicles</TabsTrigger>
            <TabsTrigger value="quality">Fuel Quality</TabsTrigger>
            <TabsTrigger value="recurring">Auto Refill</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Vehicles Tab */}
          <TabsContent value="vehicles" className="space-y-4">
            <div className="grid gap-4">
              {vehicles.map((vehicle) => (
                <Card key={vehicle.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Fuel className="h-5 w-5" />
                        {vehicle.name}
                      </CardTitle>
                      <Badge variant={vehicle.fuelLevel < 30 ? "destructive" : "secondary"}>
                        {vehicle.fuelLevel < 30 ? "Low Fuel" : "Good"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Fuel Level</span>
                        <span>
                          {vehicle.fuelLevel}L / {vehicle.fuelCapacity}L
                        </span>
                      </div>
                      <Progress value={(vehicle.fuelLevel / vehicle.fuelCapacity) * 100} />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Efficiency</p>
                        <p className="font-semibold">{vehicle.efficiency} km/L</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Carbon Saved</p>
                        <p className="font-semibold text-green-600">{vehicle.carbonSaved} kg</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Last Refill</p>
                        <p className="font-semibold">{new Date(vehicle.lastRefill).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Next Service</p>
                        <p className="font-semibold">{new Date(vehicle.nextService).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <Fuel className="h-4 w-4 mr-2" />
                        Order Fuel
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <Calendar className="h-4 w-4 mr-2" />
                        Schedule
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Fuel Quality Tab */}
          <TabsContent value="quality" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Droplets className="h-5 w-5" />
                  Fuel Quality Analysis
                </CardTitle>
                <CardDescription>Real-time fuel quality monitoring and verification</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Octane Rating</span>
                      <Badge variant="secondary">{fuelQuality.octaneRating}</Badge>
                    </div>
                    <Progress value={fuelQuality.octaneRating} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Purity Level</span>
                      <Badge variant="secondary">{fuelQuality.purityLevel}%</Badge>
                    </div>
                    <Progress value={fuelQuality.purityLevel} className="h-2" />
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Quality Indicators</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">No Water Contamination</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Additive Levels Normal</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Temperature Stable</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Density Within Range</span>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-medium text-green-800">Excellent Quality</span>
                  </div>
                  <p className="text-sm text-green-700">
                    Your fuel meets all quality standards. Expiry:{" "}
                    {new Date(fuelQuality.expiryDate).toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Recurring Orders Tab */}
          <TabsContent value="recurring" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Auto Refill Settings
                </CardTitle>
                <CardDescription>Set up automatic fuel deliveries based on your usage patterns</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recurringOrders.map((order) => {
                  const vehicle = vehicles.find((v) => v.id === order.vehicleId)
                  return (
                    <div key={order.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-medium">{vehicle?.name}</h4>
                          <p className="text-sm text-gray-600">
                            {order.amount}L every {order.frequency}
                          </p>
                        </div>
                        <Badge variant={order.active ? "default" : "secondary"}>
                          {order.active ? "Active" : "Paused"}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Next Delivery:</span>
                        <span className="font-medium">{new Date(order.nextDelivery).toLocaleDateString()}</span>
                      </div>

                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                        <Button size="sm" variant="outline">
                          {order.active ? "Pause" : "Resume"}
                        </Button>
                      </div>
                    </div>
                  )
                })}

                <Button className="w-full bg-transparent" variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Add New Auto Refill
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Fuel Consumption Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">This Month</span>
                      <span className="font-semibold">145L</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Last Month</span>
                      <span className="font-semibold">162L</span>
                    </div>
                    <div className="flex justify-between items-center text-green-600">
                      <span className="text-sm">Savings</span>
                      <span className="font-semibold">-10.5%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Leaf className="h-5 w-5" />
                    Environmental Impact
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">CO₂ Reduced</span>
                      <span className="font-semibold text-green-600">{totalCarbonSaved.toFixed(1)} kg</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Trees Equivalent</span>
                      <span className="font-semibold text-green-600">{Math.floor(totalCarbonSaved / 22)} trees</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Eco Score</span>
                      <Badge className="bg-green-100 text-green-800">Excellent</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
