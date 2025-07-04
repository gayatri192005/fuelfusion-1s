export const FEATURES = {
  // Core Features
  SMART_SCHEDULING: true,
  RECURRING_DELIVERIES: true,
  FUEL_QUALITY_TRACKING: true,
  VEHICLE_INTEGRATION: true,

  // AI Features
  DEMAND_PREDICTION: true,
  PRICE_OPTIMIZATION: true,
  ROUTE_OPTIMIZATION: true,

  // Green Features
  CARBON_TRACKING: true,
  ECO_REWARDS: true,

  // Social Features
  FUEL_SHARING: true,
  REFERRAL_PROGRAM: true,

  // Payment Features
  CRYPTO_PAYMENTS: false, // Beta
  FUEL_CREDITS: true,

  // Emergency Features
  EMERGENCY_DELIVERY: true,
  PANIC_BUTTON: true,

  // Voice & AI
  VOICE_ORDERING: true,
  WHATSAPP_BOT: true,

  // B2B Features
  FLEET_MANAGEMENT: true,
  CORPORATE_BILLING: true,
} as const

export type FeatureKey = keyof typeof FEATURES
