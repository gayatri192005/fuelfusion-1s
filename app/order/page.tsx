"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin, Fuel, Clock, CreditCard, Car, Plus, Minus, Shield } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function OrderPage() {
  const [step, setStep] = useState(1)
  const [fuelType, setFuelType] = useState("")
  const [quantity, setQuantity] = useState(10)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const fuelTypes = [
    { id: "regular", name: "Regular Gasoline", price: 3.2, octane: "87" },
    { id: "premium", name: "Premium Gasoline", price: 3.6, octane: "91" },
    { id: "super", name: "Super Premium", price: 3.9, octane: "93" },
    { id: "diesel", name: "Diesel", price: 3.4, octane: "N/A" },
  ]

  const selectedFuel = fuelTypes.find((f) => f.id === fuelType)
  const totalPrice = selectedFuel ? (selectedFuel.price * quantity).toFixed(2) : "0.00"

  const handlePlaceOrder = async () => {
    setIsLoading(true)
    // Simulate order placement
    setTimeout(() => {
      setIsLoading(false)
      router.push("/tracking")
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b px-4 py-4">
        <div className="flex items-center space-x-3">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold">Order Fuel</h1>
        </div>
      </header>

      {/* Progress Indicator */}
      <div className="bg-white px-4 py-3 border-b">
        <div className="flex items-center justify-between">
          <div className={`flex items-center space-x-2 ${step >= 1 ? "text-blue-600" : "text-gray-400"}`}>
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                step >= 1 ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              1
            </div>
            <span className="text-sm">Fuel</span>
          </div>
          <div className={`flex items-center space-x-2 ${step >= 2 ? "text-blue-600" : "text-gray-400"}`}>
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                step >= 2 ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              2
            </div>
            <span className="text-sm">Location</span>
          </div>
          <div className={`flex items-center space-x-2 ${step >= 3 ? "text-blue-600" : "text-gray-400"}`}>
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                step >= 3 ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              3
            </div>
            <span className="text-sm">Payment</span>
          </div>
        </div>
      </div>

      <main className="p-4 space-y-6">
        {step === 1 && (
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Fuel className="h-5 w-5 mr-2" />
                  Select Fuel Type
                </CardTitle>
                <CardDescription>Choose the fuel type for your vehicle</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {fuelTypes.map((fuel) => (
                  <div
                    key={fuel.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                      fuelType === fuel.id ? "border-blue-600 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setFuelType(fuel.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{fuel.name}</h3>
                        <p className="text-sm text-gray-600">Octane {fuel.octane}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${fuel.price}/gal</p>
                        {fuel.id === "premium" && (
                          <Badge className="bg-yellow-100 text-yellow-800 text-xs">Recommended</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Quantity</CardTitle>
                <CardDescription>How many gallons do you need?</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center space-x-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <div className="text-center">
                    <div className="text-3xl font-bold">{quantity}</div>
                    <div className="text-sm text-gray-600">gallons</div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.min(50, quantity + 1))}
                    disabled={quantity >= 50}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-4 text-center">
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Math.min(50, Number.parseInt(e.target.value) || 1)))}
                    className="w-24 mx-auto text-center"
                    min="1"
                    max="50"
                  />
                </div>
              </CardContent>
            </Card>

            {selectedFuel && (
              <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-green-50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">Order Summary</h3>
                      <p className="text-sm text-gray-600">
                        {quantity} gallons of {selectedFuel.name}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">${totalPrice}</p>
                      <p className="text-sm text-gray-600">Total</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Button
              className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
              onClick={() => setStep(2)}
              disabled={!fuelType}
            >
              Continue to Location
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Delivery Location
                </CardTitle>
                <CardDescription>Where should we deliver your fuel?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Street Address</Label>
                  <Input id="address" placeholder="123 Main Street" defaultValue="789 Pine Street" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="City" defaultValue="Downtown" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input id="zip" placeholder="12345" defaultValue="12345" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instructions">Delivery Instructions (Optional)</Label>
                  <Textarea id="instructions" placeholder="e.g., Park in driveway, call when arrived" rows={3} />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Car className="h-5 w-5 mr-2" />
                  Vehicle Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="make">Make</Label>
                    <Input id="make" placeholder="Toyota" defaultValue="Honda" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="model">Model</Label>
                    <Input id="model" placeholder="Camry" defaultValue="Civic" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="color">Color</Label>
                  <Input id="color" placeholder="Blue" defaultValue="Silver" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="license">License Plate</Label>
                  <Input id="license" placeholder="ABC123" defaultValue="XYZ789" />
                </div>
              </CardContent>
            </Card>

            <div className="flex space-x-4">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                Back
              </Button>
              <Button
                className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                onClick={() => setStep(3)}
              >
                Continue to Payment
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Payment Method
                </CardTitle>
                <CardDescription>Choose your payment method</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border-2 border-blue-600 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium">•••• •••• •••• 4242</p>
                        <p className="text-sm text-gray-600">Expires 12/25</p>
                      </div>
                    </div>
                    <Badge>Default</Badge>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Payment Method
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Delivery Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select defaultValue="asap">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asap">As soon as possible (30-45 min)</SelectItem>
                    <SelectItem value="1hour">Within 1 hour</SelectItem>
                    <SelectItem value="2hours">Within 2 hours</SelectItem>
                    <SelectItem value="schedule">Schedule for later</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-green-50">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>
                    {quantity} gallons of {selectedFuel?.name}
                  </span>
                  <span>${totalPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>$4.99</span>
                </div>
                <div className="flex justify-between">
                  <span>Service Fee</span>
                  <span>$2.50</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${(Number.parseFloat(totalPrice) + 4.99 + 2.5).toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg border-green-200 bg-green-50">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-800">Safe & Secure</p>
                    <p className="text-sm text-green-600">
                      Certified technicians, insured delivery, contactless service
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex space-x-4">
              <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                Back
              </Button>
              <Button
                className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                onClick={handlePlaceOrder}
                disabled={isLoading}
              >
                {isLoading ? "Placing Order..." : "Place Order"}
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
