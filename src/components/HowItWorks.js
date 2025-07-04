import "./../styles/HowItWorks.css"

export default function HowItWorks() {
  const steps = [
    { num: 1, title: "Place an Order", desc: "Tell us the fuel type and quantity." },
    { num: 2, title: "We Dispatch", desc: "Nearest fuel-truck heads your way." },
    { num: 3, title: "Refuel & Relax", desc: "Pay securely and you’re good to go!" },
  ]

  return (
    <section id="how" className="how">
      <h2 className="how__title">How It Works</h2>
      <ol className="how__list">
        {steps.map((s) => (
          <li key={s.num}>
            <span className="step-num">{s.num}</span>
            <div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
