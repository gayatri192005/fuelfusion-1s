"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Leaf, TreePine, Award, TrendingDown, Calendar, Target, Share2, Gift, Zap } from "lucide-react"
import Link from "next/link"

interface CarbonData {
  totalSaved: number
  monthlyTarget: number
  currentMonth: number
  treesEquivalent: number
  rank: number
  totalUsers: number
  achievements: Achievement[]
  monthlyData: MonthlyData[]
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlocked: boolean
  unlockedDate?: string
  points: number
}

interface MonthlyData {
  month: string
  carbonSaved: number
  fuelDelivered: number
  tripsAvoided: number
}

export default function CarbonTrackerPage() {
  const [carbonData, setCarbonData] = useState<CarbonData>({
    totalSaved: 45.8,
    monthlyTarget: 15,
    currentMonth: 12.3,
    treesEquivalent: 2,
    rank: 156,
    totalUsers: 50000,
    achievements: [
      {
        id: "1",
        title: "Eco Warrior",
        description: "Saved 10kg of CO₂",
        icon: "🌱",
        unlocked: true,
        unlockedDate: "2024-01-15",
        points: 100,
      },
      {
        id: "2",
        title: "Tree Hugger",
        description: "Equivalent to planting 1 tree",
        icon: "🌳",
        unlocked: true,
        unlockedDate: "2024-01-20",
        points: 200,
      },
      {
        id: "3",
        title: "Carbon Crusher",
        description: "Saved 50kg of CO₂",
        icon: "💚",
        unlocked: false,
        points: 500,
      },
      {
        id: "4",
        title: "Green Champion",
        description: "Top 10% in your city",
        icon: "🏆",
        unlocked: false,
        points: 1000,
      },
    ],
    monthlyData: [
      { month: "Oct", carbonSaved: 8.5, fuelDelivered: 45, tripsAvoided: 12 },
      { month: "Nov", carbonSaved: 11.2, fuelDelivered: 52, tripsAvoided: 15 },
      { month: "Dec", carbonSaved: 13.8, fuelDelivered: 48, tripsAvoided: 18 },
      { month: "Jan", carbonSaved: 12.3, fuelDelivered: 50, tripsAvoided: 16 },
    ],
  })

  const [ecoTips] = useState([
    "Use our route optimization to reduce delivery emissions by 15%",
    "Schedule bulk deliveries to minimize multiple trips",
    "Choose premium fuel for better engine efficiency",
    "Regular vehicle maintenance improves fuel efficiency by 10%",
  ])

  const progressPercentage = (carbonData.currentMonth / carbonData.monthlyTarget) * 100
  const totalPoints = carbonData.achievements.filter((a) => a.unlocked).reduce((sum, a) => sum + a.points, 0)

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
            <h1 className="text-xl font-semibold">Carbon Footprint Tracker</h1>
          </div>
          <Button className="bg-green-600 hover:bg-green-700">
            <Share2 className="h-4 w-4 mr-2" />
            Share Impact
          </Button>
        </div>
      </header>

      <main className="p-4 space-y-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-700">Total CO₂ Saved</p>
                  <p className="text-2xl font-bold text-green-800">{carbonData.totalSaved} kg</p>
                </div>
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-700">Trees Equivalent</p>
                  <p className="text-2xl font-bold text-blue-800">{carbonData.treesEquivalent}</p>
                </div>
                <TreePine className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-700">City Rank</p>
                  <p className="text-2xl font-bold text-purple-800">#{carbonData.rank}</p>
                </div>
                <Award className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-700">Eco Points</p>
                  <p className="text-2xl font-bold text-orange-800">{totalPoints}</p>
                </div>
                <Zap className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Monthly Carbon Goal
            </CardTitle>
            <CardDescription>Track your progress towards this month's carbon reduction target</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-gray-600">
                {carbonData.currentMonth}kg / {carbonData.monthlyTarget}kg
              </span>
            </div>
            <Progress value={progressPercentage} className="h-3" />

            <div className="flex justify-between text-sm">
              <span className="text-green-600">
                {progressPercentage >= 100
                  ? "🎉 Goal Achieved!"
                  : `${(carbonData.monthlyTarget - carbonData.currentMonth).toFixed(1)}kg to go`}
              </span>
              <span className="text-gray-600">{Math.round(progressPercentage)}% complete</span>
            </div>

            {progressPercentage >= 100 && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-green-800 font-medium">Congratulations! 🎉</p>
                <p className="text-green-700 text-sm">You've exceeded your monthly carbon reduction goal!</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Tabs defaultValue="impact" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="impact">Impact</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            <TabsTrigger value="tips">Eco Tips</TabsTrigger>
          </TabsList>

          {/* Impact Tab */}
          <TabsContent value="impact" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingDown className="h-5 w-5" />
                  Environmental Impact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-800">{carbonData.totalSaved}kg</div>
                    <div className="text-sm text-green-600">CO₂ Emissions Avoided</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-800">
                      {carbonData.monthlyData.reduce((sum, data) => sum + data.tripsAvoided, 0)}
                    </div>
                    <div className="text-sm text-blue-600">Petrol Pump Trips Avoided</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-800">
                      {Math.round(carbonData.totalSaved * 2.3)} km
                    </div>
                    <div className="text-sm text-purple-600">Driving Distance Saved</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Monthly Breakdown</h4>
                  <div className="space-y-2">
                    {carbonData.monthlyData.map((data, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Calendar className="h-4 w-4 text-gray-600" />
                          <span className="font-medium">{data.month} 2024</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-green-600">{data.carbonSaved}kg CO₂</span>
                          <span className="text-blue-600">{data.fuelDelivered}L delivered</span>
                          <span className="text-purple-600">{data.tripsAvoided} trips saved</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {carbonData.achievements.map((achievement) => (
                <Card
                  key={achievement.id}
                  className={achievement.unlocked ? "border-green-200 bg-green-50" : "border-gray-200"}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <h3 className={`font-medium ${achievement.unlocked ? "text-green-800" : "text-gray-600"}`}>
                          {achievement.title}
                        </h3>
                        <p className={`text-sm ${achievement.unlocked ? "text-green-600" : "text-gray-500"}`}>
                          {achievement.description}
                        </p>
                        {achievement.unlocked && achievement.unlockedDate && (
                          <p className="text-xs text-green-500 mt-1">
                            Unlocked on {new Date(achievement.unlockedDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <Badge variant={achievement.unlocked ? "default" : "secondary"}>{achievement.points} pts</Badge>
                        {achievement.unlocked && (
                          <div className="text-green-600 mt-1">
                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Leaderboard Tab */}
          <TabsContent value="leaderboard" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Mumbai Eco Champions
                </CardTitle>
                <CardDescription>See how you rank among other eco-conscious users in your city</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold">
                        1
                      </div>
                      <div>
                        <p className="font-medium">Rahul S.</p>
                        <p className="text-sm text-gray-600">156.8 kg CO₂ saved</p>
                      </div>
                    </div>
                    <Badge className="bg-yellow-500">Champion</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-400 text-white rounded-full flex items-center justify-center font-bold">
                        2
                      </div>
                      <div>
                        <p className="font-medium">Priya M.</p>
                        <p className="text-sm text-gray-600">142.3 kg CO₂ saved</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">
                        3
                      </div>
                      <div>
                        <p className="font-medium">Amit K.</p>
                        <p className="text-sm text-gray-600">128.9 kg CO₂ saved</p>
                      </div>
                    </div>
                    <Badge className="bg-orange-500">Bronze</Badge>
                  </div>

                  <div className="border-t pt-3">
                    <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                          {carbonData.rank}
                        </div>
                        <div>
                          <p className="font-medium">You</p>
                          <p className="text-sm text-gray-600">{carbonData.totalSaved} kg CO₂ saved</p>
                        </div>
                      </div>
                      <Badge variant="outline">Your Rank</Badge>
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-center text-sm text-gray-600">
                  You're in the top {Math.round((carbonData.rank / carbonData.totalUsers) * 100)}% of users in Mumbai!
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Eco Tips Tab */}
          <TabsContent value="tips" className="space-y-4">
            <div className="grid gap-4">
              {ecoTips.map((tip, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <p className="text-sm">{tip}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <CardContent className="p-6 text-center">
                <Gift className="h-12 w-12 mx-auto mb-4 text-green-600" />
                <h3 className="font-semibold text-green-800 mb-2">Eco Rewards Program</h3>
                <p className="text-sm text-green-700 mb-4">
                  Earn points for every kilogram of CO₂ you save and redeem them for discounts on future orders!
                </p>
                <Button className="bg-green-600 hover:bg-green-700">View Rewards</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
