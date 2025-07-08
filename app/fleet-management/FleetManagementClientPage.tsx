"use client"

import * as React from "react"
import Link from "next/link"
import { Truck, Plus, Download } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import { cn } from "@/lib/utils"

/* -------------------------------------------------------------------------- */
/* Types */
/* -------------------------------------------------------------------------- */
type Status = "active" | "maintenance" | "idle"

interface Vehicle {
  id: string
  name: string
  type: string
  driver: string
  fuelLevel: number // %
  fuelCapacity: number // maximum litres
  location: string
  status: Status
  lastRefill: string // ISO date
  nextService: string // ISO date
  monthlyConsumption: number // litres this month
  efficiency: number // km / litre
}

interface FleetStats {
  totalVehicles: number
  activeVehicles: number
  totalFuelConsumed: number // litres
  averageEfficiency: number // km / litre
  maintenanceAlerts: number
  monthlyCost: number // ₹
}

type VehicleUpdate = {
  id: string
  driver: string
  fuelLevel: number // %
  lastRefuel: string
}

const mockFleet: VehicleUpdate[] = [
  { id: "MH12-AA-1234", driver: "Ravi", fuelLevel: 42, lastRefuel: "2025-07-01" },
  { id: "MH12-BB-5678", driver: "Sneha", fuelLevel: 71, lastRefuel: "2025-07-04" },
  { id: "MH12-CC-9012", driver: "Vikram", fuelLevel: 15, lastRefuel: "2025-07-06" },
]

/* -------------------------------------------------------------------------- */
/* Helper utilities                                                           */
/* -------------------------------------------------------------------------- */
function statusColor(status: Status) {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-700"
    case "maintenance":
      return "bg-yellow-100 text-yellow-700"
    case "idle":
      return "bg-gray-100 text-gray-700"
    default:
      return "bg-gray-100 text-gray-700"
  }
}

function fuelTextColor(level: number) {
  if (level < 25) return "text-red-600"
  if (level < 50) return "text-yellow-600"
  return "text-green-600"
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value)
}

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

interface StatsCardProps {
  label: string
  value: React.ReactNode
  icon: React.ReactNode
}
function StatsCard({ label, value, icon }: StatsCardProps) {
  return (
    <Card>
      <div className="flex items-center justify-between p-4">
        <div>
          <p className="text-sm text-gray-600">{label}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        {icon}
      </div>
    </Card>
  )
}

export default function FleetManagementClientPage() {
  /* --------------------------- Sample in-memory data ---------------------- */
  const [vehicles, setVehicles] = React.useState<Vehicle[]>([
    {
      id: "1",
      name: "Delivery Van 01",
      type: "Commercial Van",
      driver: "Rajesh Kumar",
      fuelLevel: 35,
      fuelCapacity: 60,
      location: "Bandra West",
      status: "active",
      lastRefill: "2025-06-18",
      nextService: "2025-07-15",
      monthlyConsumption: 180,
      efficiency: 12.5,
    },
    {
      id: "2",
      name: "Truck 02",
      type: "Heavy Truck",
      driver: "Suresh Patel",
      fuelLevel: 80,
      fuelCapacity: 200,
      location: "Andheri East",
      status: "active",
      lastRefill: "2025-06-19",
      nextService: "2025-08-01",
      monthlyConsumption: 450,
      efficiency: 8.2,
    },
    {
      id: "3",
      name: "Sedan 03",
      type: "Sedan",
      driver: "Priya Sharma",
      fuelLevel: 15,
      fuelCapacity: 45,
      location: "Powai",
      status: "maintenance",
      lastRefill: "2025-06-16",
      nextService: "2025-06-25",
      monthlyConsumption: 120,
      efficiency: 16.8,
    },
  ])

  const [stats] = React.useState<FleetStats>({
    totalVehicles: vehicles.length,
    activeVehicles: vehicles.filter((v) => v.status === "active").length,
    totalFuelConsumed: vehicles.reduce((t, v) => t + v.monthlyConsumption, 0),
    averageEfficiency: vehicles.reduce((t, v) => t + v.efficiency, 0) / vehicles.length,
    maintenanceAlerts: vehicles.filter((v) => v.status === "maintenance").length,
    monthlyCost: 67500,
  })

  const [selected, setSelected] = React.useState<string[]>([])
  const toggleSelect = (id: string) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))

  /* ------------------------------------------------------------------------ */
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white border-b px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                {/* simple left arrow */}
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
            <Button className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Vehicle
            </Button>
          </div>
        </div>
      </header>

      <main className="p-4 flex-1 space-y-6">
        {/* Fleet overview cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            label="Total Vehicles"
            value={stats.totalVehicles}
            icon={<Truck className="h-6 w-6 text-blue-600" />}
          />
          <StatsCard
            label="Active Vehicles"
            value={stats.activeVehicles}
            icon={<Truck className="h-6 w-6 text-green-600" />}
          />
          <StatsCard
            label="Monthly Fuel (L)"
            value={stats.totalFuelConsumed}
            icon={
              <svg className="h-6 w-6 text-indigo-600" fill="currentColor">
                <circle cx="12" cy="12" r="10" />
              </svg>
            }
          />
          <StatsCard
            label="Monthly Cost"
            value={formatCurrency(stats.monthlyCost)}
            icon={
              <svg className="h-6 w-6 text-teal-600" fill="currentColor">
                <path d="M4 12h16M4 8h16M4 16h16" />
              </svg>
            }
          />
        </section>

        {/* Vehicle table */}
        <section className="overflow-auto rounded-lg border bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">
                  <input
                    type="checkbox"
                    checked={selected.length === vehicles.length}
                    onChange={() => setSelected(selected.length === vehicles.length ? [] : vehicles.map((v) => v.id))}
                  />
                </th>
                <th className="p-3 text-left">Vehicle</th>
                <th className="p-3 text-left">Driver</th>
                <th className="p-3">Fuel</th>
                <th className="p-3">Status</th>
                <th className="p-3">Next Service</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((v) => (
                <tr key={v.id} className="border-b last:border-b-0 even:bg-gray-50">
                  <td className="p-3">
                    <input type="checkbox" checked={selected.includes(v.id)} onChange={() => toggleSelect(v.id)} />
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    <p className="font-medium">{v.name}</p>
                    <p className="text-xs text-gray-500">{v.type}</p>
                  </td>
                  <td className="p-3 whitespace-nowrap">{v.driver}</td>
                  <td className="p-3 text-center">
                    <span className={cn("font-semibold", fuelTextColor(v.fuelLevel))}>
                      {v.fuelLevel} / {v.fuelCapacity} L
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <span
                      className={cn("inline-block rounded-full px-2 py-0.5 text-xs font-medium", statusColor(v.status))}
                    >
                      {v.status}
                    </span>
                  </td>
                  <td className="p-3 text-center">{v.nextService}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Mock Fleet Cards */}
        <section className="grid md:grid-cols-3 gap-4">
          {mockFleet.map((v) => (
            <Card key={v.id} className="p-4 space-y-2">
              <h2 className="font-medium">{v.id}</h2>
              <p>
                <span className="font-semibold">Driver:</span> {v.driver}
              </p>
              <p>
                <span className="font-semibold">Fuel:</span> {v.fuelLevel}%
              </p>
              <p className="text-sm text-muted-foreground">Last refuel&nbsp;·&nbsp;{v.lastRefuel}</p>
              <Button size="sm" className="w-full">
                Schedule Re-fuel
              </Button>
            </Card>
          ))}
        </section>
      </main>

      {/* Bulk-order bar */}
      {selected.length > 0 && (
        <div className="sticky bottom-0 bg-white border-t p-4 flex items-center justify-between">
          <span className="font-medium">
            {selected.length} vehicle{selected.length > 1 && "s"} selected
          </span>
          <Button size="sm" className="bg-blue-600 text-white">
            Order Fuel for Selection
          </Button>
        </div>
      )}
    </div>
  )
}
