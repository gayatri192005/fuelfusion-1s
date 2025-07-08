import type { Metadata } from "next"
import FleetManagementClientPage from "./FleetManagementClientPage"

export const metadata: Metadata = {
  title: "Fleet Management • Fuel Fusion",
  description: "Monitor and manage your entire fleet’s refuelling from a single dashboard.",
}

export default function FleetManagementPage() {
  return <FleetManagementClientPage />
}
