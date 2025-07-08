import "../styles/HowItWorks.css"

export default function HowItWorks() {
  const steps = ["Place Order", "We Dispatch", "We Refuel", "You Drive"]
  return (
    <section className="how-it-works">
      <h2>How It Works</h2>
      <ol>
        {steps.map((s, i) => (
          <li key={s}>
            <span>{i + 1}</span>
            {s}
          </li>
        ))}
      </ol>
    </section>
  )
}
