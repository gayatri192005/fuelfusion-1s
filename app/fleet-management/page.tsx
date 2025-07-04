"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Truck, Plus, Download } from "lucide-react"
import Link from "next/link"

interface Vehicle {
  id: string
  name: string
  type: string
  driver: string
  fuelLevel: number
  fuelCapacity: number
  location: string
  status: "active" | "maintenance" | "idle"
  lastRefill: string
  nextService: string
  monthlyConsumption: number
  efficiency: number
}

interface FleetStats {
  totalVehicles: number
  activeVehicles: number
  totalFuelConsumed: number
  averageEfficiency: number
  maintenanceAlerts: number
  monthlyCost: number
}

export default function FleetManagementPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
      id: "1",
      name: "Delivery Van 01",
      type: "Commercial Van",
      driver: "Rajesh Kumar",
      fuelLevel: 35,
      fuelCapacity: 60,
      location: "Bandra West",
      status: 'active',
      lastRefill: "2024-01-18",
      nextService: "2024-02-15",
      monthlyConsumption: 180,
      efficiency: 12.5
    },
    {
      id: "2",
      name: "Truck 02",
      type: "Heavy Truck",
      driver: "Suresh Patel",
      fuelLevel: 80,
      fuelCapacity: 200,
      location: "Andheri East",
      status: 'active',
      lastRefill: "2024-01-19",
      nextService: "2024-03-01",
      monthlyConsumption: 450,
      efficiency: 8.2
    },
    {
      id: "3",
      name: "Car 03",
      type: "Sedan",
      driver: "Priya Sharma",
      fuelLevel: 15,
      fuelCapacity: 45,
      location: "Powai",
      status: 'maintenance',
      lastRefill: "2024-01-16",
      nextService: "2024-01-25",
      monthlyConsumption: 120,
      efficiency: 16.8
    }
  ])

  const [fleetStats] = useState<FleetStats>({
    totalVehicles: 3,
    activeVehicles: 2,
    totalFuelConsumed: 750,
    averageEfficiency: 12.5,
    maintenanceAlerts: 1,
    monthlyCost: 67500
  })

  const [selectedVehicles, setSelectedVehicles] = useState<string[]>([])
  const [showBulkOrder, setShowBulkOrder] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'maintenance': return 'bg-yellow-100 text-yellow-800'
      case 'idle': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getFuelLevelColor = (level: number, capacity: number) => {
    const percentage = (level / capacity) * 100
    if (percentage < 25) return 'text-red-600'
    if (percentage < 50) return 'text-yellow-600'
    return 'text-green-600'
  }

  const toggleVehicleSelection = (vehicleId: string) => {
    setSelectedVehicles(prev => 
      prev.includes(vehicleId) 
        ? prev.filter(id => id !== vehicleId)
        : [...prev, vehicleId]
    )
  }

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
            <h1 className="text-xl font-semibold">Fleet Management</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-green-600">
              <Plus className="h-4 w-4 mr-2" />
              Add Vehicle
            </Button>
          </div>
        </div>
      </header>

      <main className="p-4 space-y-6">
        {/* Fleet Overview */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Vehicles</p>
                  <p className="text-2xl font-bold">{fleetStats.totalVehicles}</p>
                </div>
                <Truck className="h-8 w-8 text-blue-600" />
              </div\
