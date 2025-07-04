"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mic, MicOff, Volume2, MessageCircle, Fuel, MapPin, CreditCard, CheckCircle } from "lucide-react"
import Link from "next/link"

interface VoiceCommand {
  text: string
  confidence: number
  timestamp: Date
}

interface OrderDetails {
  fuelType?: string
  quantity?: number
  location?: string
  paymentMethod?: string
  confirmed?: boolean
}

export default function VoiceOrderPage() {
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [commands, setCommands] = useState<VoiceCommand[]>([])
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({})
  const [currentStep, setCurrentStep] = useState(0)
  const [isSupported, setIsSupported] = useState(false)

  const recognitionRef = useRef<any>(null)
  const synthRef = useRef<any>(null)

  const orderSteps = [
    "What type of fuel would you like? Say 'regular', 'premium', or 'diesel'",
    "How many liters do you need?",
    "Where should we deliver the fuel?",
    "How would you like to pay? Say 'UPI', 'card', or 'cash'",
    "Please confirm your order",
  ]

  useEffect(() => {
    // Check if browser supports speech recognition
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      setIsSupported(true)

      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = true
      recognitionRef.current.interimResults = true
      recognitionRef.current.lang = "en-IN"

      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = ""
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript
          }
        }

        if (finalTranscript) {
          setTranscript(finalTranscript)
          processVoiceCommand(finalTranscript)
        }
      }

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error)
        setIsListening(false)
      }

      recognitionRef.current.onend = () => {
        setIsListening(false)
      }
    }

    // Initialize speech synthesis
    if ("speechSynthesis" in window) {
      synthRef.current = window.speechSynthesis
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [])

  const speak = (text: string) => {
    if (synthRef.current && !isSpeaking) {
      setIsSpeaking(true)
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = "en-IN"
      utterance.rate = 0.9
      utterance.onend = () => setIsSpeaking(false)
      synthRef.current.speak(utterance)
    }
  }

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true)
      recognitionRef.current.start()

      if (currentStep < orderSteps.length) {
        speak(orderSteps[currentStep])
      }
    }
  }

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }

  const processVoiceCommand = (command: string) => {
    const newCommand: VoiceCommand = {
      text: command,
      confidence: 0.9,
      timestamp: new Date(),
    }

    setCommands((prev) => [...prev, newCommand])

    const lowerCommand = command.toLowerCase()

    // Process based on current step
    switch (currentStep) {
      case 0: // Fuel type
        if (lowerCommand.includes("regular") || lowerCommand.includes("normal")) {
          setOrderDetails((prev) => ({ ...prev, fuelType: "Regular Petrol" }))
          speak("Regular petrol selected. How many liters do you need?")
          setCurrentStep(1)
        } else if (lowerCommand.includes("premium")) {
          setOrderDetails((prev) => ({ ...prev, fuelType: "Premium Petrol" }))
          speak("Premium petrol selected. How many liters do you need?")
          setCurrentStep(1)
        } else if (lowerCommand.includes("diesel")) {
          setOrderDetails((prev) => ({ ...prev, fuelType: "Diesel" }))
          speak("Diesel selected. How many liters do you need?")
          setCurrentStep(1)
        }
        break

      case 1: // Quantity
        const quantity = extractNumber(lowerCommand)
        if (quantity) {
          setOrderDetails((prev) => ({ ...prev, quantity }))
          speak(`${quantity} liters noted. Where should we deliver the fuel?`)
          setCurrentStep(2)
        }
        break

      case 2: // Location
        if (lowerCommand.includes("current location") || lowerCommand.includes("here")) {
          setOrderDetails((prev) => ({ ...prev, location: "Current Location" }))
          speak("Current location selected. How would you like to pay?")
          setCurrentStep(3)
        } else {
          setOrderDetails((prev) => ({ ...prev, location: command }))
          speak("Location noted. How would you like to pay?")
          setCurrentStep(3)
        }
        break

      case 3: // Payment
        if (lowerCommand.includes("upi")) {
          setOrderDetails((prev) => ({ ...prev, paymentMethod: "UPI" }))
          speak("UPI payment selected. Let me confirm your order.")
          setCurrentStep(4)
          confirmOrder()
        } else if (lowerCommand.includes("card")) {
          setOrderDetails((prev) => ({ ...prev, paymentMethod: "Card" }))
          speak("Card payment selected. Let me confirm your order.")
          setCurrentStep(4)
          confirmOrder()
        } else if (lowerCommand.includes("cash")) {
          setOrderDetails((prev) => ({ ...prev, paymentMethod: "Cash on Delivery" }))
          speak("Cash on delivery selected. Let me confirm your order.")
          setCurrentStep(4)
          confirmOrder()
        }
        break

      case 4: // Confirmation
        if (lowerCommand.includes("yes") || lowerCommand.includes("confirm")) {
          setOrderDetails((prev) => ({ ...prev, confirmed: true }))
          speak("Order confirmed! Your fuel will be delivered within 30 minutes.")
        } else if (lowerCommand.includes("no") || lowerCommand.includes("cancel")) {
          speak("Order cancelled. You can start over anytime.")
          resetOrder()
        }
        break
    }
  }

  const extractNumber = (text: string): number | null => {
    const numbers = text.match(/\d+/)
    return numbers ? Number.parseInt(numbers[0]) : null
  }

  const confirmOrder = () => {
    const { fuelType, quantity, location, paymentMethod } = orderDetails
    const confirmText = `Please confirm: ${quantity} liters of ${fuelType} to be delivered at ${location}, payment via ${paymentMethod}. Say yes to confirm or no to cancel.`
    speak(confirmText)
  }

  const resetOrder = () => {
    setOrderDetails({})
    setCurrentStep(0)
    setCommands([])
    setTranscript("")
  }

  if (!isSupported) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center">
            <MicOff className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h2 className="text-xl font-semibold mb-2">Voice Ordering Not Supported</h2>
            <p className="text-gray-600 mb-4">
              Your browser doesn't support voice recognition. Please use a modern browser like Chrome or Edge.
            </p>
            <Link href="/order">
              <Button>Use Regular Order Form</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
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
            <h1 className="text-xl font-semibold">Voice Fuel Ordering</h1>
          </div>
          <Badge variant="secondary">
            Step {currentStep + 1} of {orderSteps.length}
          </Badge>
        </div>
      </header>

      <main className="p-4 space-y-6">
        {/* Voice Control */}
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Voice Assistant
            </CardTitle>
            <CardDescription>Speak naturally to place your fuel order</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="relative">
              <Button
                size="lg"
                className={`w-32 h-32 rounded-full ${
                  isListening ? "bg-red-500 hover:bg-red-600 animate-pulse" : "bg-blue-500 hover:bg-blue-600"
                }`}
                onClick={isListening ? stopListening : startListening}
                disabled={isSpeaking}
              >
                {isListening ? <Mic className="h-8 w-8" /> : <MicOff className="h-8 w-8" />}
              </Button>

              {isListening && <div className="absolute inset-0 rounded-full border-4 border-red-300 animate-ping" />}
            </div>

            <div className="space-y-2">
              <p className="font-medium">{isListening ? "Listening..." : "Tap to start voice ordering"}</p>
              <p className="text-sm text-gray-600">
                {isSpeaking ? "Assistant is speaking..." : "Say 'Hey Fuel Fusion' to begin"}
              </p>
            </div>

            <div className="flex justify-center gap-2">
              <Button variant="outline" size="sm" onClick={() => speak(orderSteps[currentStep])} disabled={isSpeaking}>
                <Volume2 className="h-4 w-4 mr-2" />
                Repeat Question
              </Button>
              <Button variant="outline" size="sm" onClick={resetOrder}>
                Reset Order
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Order Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Fuel className={`h-5 w-5 ${orderDetails.fuelType ? "text-green-600" : "text-gray-400"}`} />
                <div>
                  <p className="text-sm text-gray-600">Fuel Type</p>
                  <p className="font-medium">{orderDetails.fuelType || "Not selected"}</p>
                </div>
                {orderDetails.fuelType && <CheckCircle className="h-4 w-4 text-green-600" />}
              </div>

              <div className="flex items-center gap-3">
                <Fuel className={`h-5 w-5 ${orderDetails.quantity ? "text-green-600" : "text-gray-400"}`} />
                <div>
                  <p className="text-sm text-gray-600">Quantity</p>
                  <p className="font-medium">
                    {orderDetails.quantity ? `${orderDetails.quantity} liters` : "Not specified"}
                  </p>
                </div>
                {orderDetails.quantity && <CheckCircle className="h-4 w-4 text-green-600" />}
              </div>

              <div className="flex items-center gap-3">
                <MapPin className={`h-5 w-5 ${orderDetails.location ? "text-green-600" : "text-gray-400"}`} />
                <div>
                  <p className="text-sm text-gray-600">Location</p>
                  <p className="font-medium">{orderDetails.location || "Not specified"}</p>
                </div>
                {orderDetails.location && <CheckCircle className="h-4 w-4 text-green-600" />}
              </div>

              <div className="flex items-center gap-3">
                <CreditCard className={`h-5 w-5 ${orderDetails.paymentMethod ? "text-green-600" : "text-gray-400"}`} />
                <div>
                  <p className="text-sm text-gray-600">Payment</p>
                  <p className="font-medium">{orderDetails.paymentMethod || "Not selected"}</p>
                </div>
                {orderDetails.paymentMethod && <CheckCircle className="h-4 w-4 text-green-600" />}
              </div>
            </div>

            {orderDetails.confirmed && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="font-medium text-green-800">Order Confirmed!</span>
                </div>
                <p className="text-sm text-green-700 mt-1">
                  Your fuel delivery has been scheduled. You'll receive updates via SMS.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Voice Commands History */}
        {commands.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Voice Commands</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {commands.map((command, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm">{command.text}</span>
                    <Badge variant="outline" className="text-xs">
                      {Math.round(command.confidence * 100)}%
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Voice Commands</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <div className="p-2 bg-blue-50 rounded">
                <strong>"Order 20 liters of premium petrol"</strong>
              </div>
              <div className="p-2 bg-blue-50 rounded">
                <strong>"Deliver to current location"</strong>
              </div>
              <div className="p-2 bg-blue-50 rounded">
                <strong>"Pay with UPI"</strong>
              </div>
              <div className="p-2 bg-blue-50 rounded">
                <strong>"Cancel order"</strong>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
