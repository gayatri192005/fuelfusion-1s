import "../styles/Features.css"

const DATA = [
  {
    title: "On-Demand Refuelling",
    desc: "Order fuel anytime, anywhere and our truck arrives at your location.",
  },
  {
    title: "Live GPS Tracking",
    desc: "Track your delivery vehicle in real-time directly from the app.",
  },
  {
    title: "Secure Digital Payments",
    desc: "Pay seamlessly via UPI, cards or net-banking—no cash needed.",
  },
  {
    title: "Eco-Friendly Operations",
    desc: "Optimised routes reduce CO₂ emissions and save costs.",
  },
]

export default function Features() {
  return (
    <section className="features">
      <h2 className="section-title">Key Features</h2>
      <div className="features-grid">
        {DATA.map((item) => (
          <div key={item.title} className="card">
            <h3 className="card-title">{item.title}</h3>
            <p className="card-desc">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
