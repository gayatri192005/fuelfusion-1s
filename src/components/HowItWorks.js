import "../styles/HowItWorks.css"

const STEPS = [
  {
    step: "1",
    title: "Place Order",
    subtitle: "Choose fuel type, quantity and location.",
  },
  {
    step: "2",
    title: "Track Delivery",
    subtitle: "Real-time GPS updates right in the app.",
  },
  {
    step: "3",
    title: "Pay Securely",
    subtitle: "Complete payment digitally—₹, UPI or card.",
  },
  {
    step: "4",
    title: "Fuel Delivered",
    subtitle: "Certified personnel refuel your vehicle safely.",
  },
]

export default function HowItWorks() {
  return (
    <section className="hiw">
      <h2 className="section-title">How It Works</h2>
      <ol className="timeline">
        {STEPS.map(({ step, title, subtitle }) => (
          <li key={step} className="timeline-item">
            <span className="badge">{step}</span>
            <div className="content">
              <h3>{title}</h3>
              <p>{subtitle}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
