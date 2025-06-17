"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Fuel, MapPin, Clock, Plus, History, User, Bell, Car, CreditCard, Star, Truck, Navigation } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("home")

  const recentOrders = [
    {
      id: "FF001",
      date: "Today, 2:30 PM",
      fuel: "Premium Gasoline",
      amount: "15 gallons",
      location: "123 Main St, Downtown",
      status: "Delivered",
      price: "$52.50",
    },
    {
      id: "FF002",
      date: "Yesterday, 4:15 PM",
      fuel: "Regular Gasoline",
      amount: "12 gallons",
      location: "456 Oak Ave, Midtown",
      status: "Delivered",
      price: "$38.40",
    },
  ]

  const TabButton = ({ id, icon: Icon, label, isActive, onClick }: any) => (
    <button
      onClick={() => onClick(id)}
      className={`flex flex-col items-center p-3 rounded-lg transition-colors ${
        isActive ? "bg-gradient-to-r from-blue-600 to-green-600 text-white" : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      <Icon className="h-5 w-5 mb-1" />
      <span className="text-xs">{label}</span>
    </button>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-semibold">Good afternoon, John!</h1>
              <p className="text-sm text-gray-600">Ready for your next fuel delivery?</p>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <Bell className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 pb-20">
        {activeTab === "home" && (
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <Link href="/order">
                <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-600 to-green-600 text-white cursor-pointer hover:shadow-xl transition-shadow">
                  <CardContent className="p-6 text-center">
                    <Plus className="h-8 w-8 mx-auto mb-2" />
                    <h3 className="font-semibold">Order Fuel</h3>
                    <p className="text-sm opacity-90">Quick delivery</p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/emergency">
                <Card className="border-0 shadow-lg cursor-pointer hover:shadow-xl transition-shadow">
                  <CardContent className="p-6 text-center">
                    <Truck className="h-8 w-8 mx-auto mb-2 text-red-600" />
                    <h3 className="font-semibold">Emergency</h3>
                    <p className="text-sm text-gray-600">24/7 support</p>
                  </CardContent>
                </Card>
              </Link>
            </div>

            {/* Current Delivery Status */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Navigation className="h-5 w-5 mr-2 text-green-600" />
                  Active Delivery
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-medium">Premium Gasoline - 10 gallons</p>
                    <p className="text-sm text-gray-600">Arriving in 12 minutes</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">En Route</Badge>
                </div>
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    789 Pine St, Your Location
                  </div>
                </div>
                <Button className="w-full mt-4" variant="outline">
                  Track Delivery
                </Button>
              </CardContent>
            </Card>

            {/* Recent Orders */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Your fuel delivery history</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <Fuel className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{order.fuel}</p>
                        <p className="text-xs text-gray-600">{order.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-sm">{order.price}</p>
                      <Badge variant="secondary" className="text-xs">
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  View All Orders
                </Button>
              </CardContent>
            </Card>

            {/* Fuel Savings */}
            <Card className="border-0 shadow-lg bg-gradient-to-r from-green-50 to-blue-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-green-800">Eco Impact</h3>
                    <p className="text-sm text-green-600">CO₂ saved this month</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-800">24.5 lbs</p>
                    <div className="flex items-center text-sm text-green-600">
                      <Star className="h-4 w-4 mr-1" />
                      Great job!
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "orders" && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Order History</h2>
            {recentOrders.map((order) => (
              <Card key={order.id} className="border-0 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <Fuel className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">{order.fuel}</p>
                        <p className="text-sm text-gray-600">Order #{order.id}</p>
                      </div>
                    </div>
                    <Badge variant="secondary">{order.status}</Badge>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      {order.date}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      {order.location}
                    </div>
                    <div className="flex items-center">
                      <Fuel className="h-4 w-4 mr-2" />
                      {order.amount} - {order.price}
                    </div>
                  </div>
                  <div className="flex space-x-2 mt-4">
                    <Button variant="outline" size="sm" className="flex-1">
                      Reorder
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      Receipt
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "profile" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Profile</h2>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-6">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="/placeholder.svg?height=64&width=64" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">John Doe</h3>
                    <p className="text-gray-600">john.doe@email.com</p>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Car className="h-5 w-5 text-gray-600" />
                      <span>My Vehicles</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      Manage
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="h-5 w-5 text-gray-600" />
                      <span>Payment Methods</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      Manage
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-gray-600" />
                      <span>Saved Addresses</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      Manage
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t px-4 py-2">
        <div className="flex justify-around">
          <TabButton id="home" icon={Fuel} label="Home" isActive={activeTab === "home"} onClick={setActiveTab} />
          <TabButton
            id="orders"
            icon={History}
            label="Orders"
            isActive={activeTab === "orders"}
            onClick={setActiveTab}
          />
          <TabButton
            id="profile"
            icon={User}
            label="Profile"
            isActive={activeTab === "profile"}
            onClick={setActiveTab}
          />
        </div>
      </nav>
    </div>
  )
}
