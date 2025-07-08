import "../styles/Features.css"

export default function Features() {
  const list = [
    { title: "On-Demand Delivery", desc: "Fuel delivered anywhere, anytime." },
    { title: "Eco-Friendly Fleet", desc: "Electric bowsers reduce CO₂ by 20%." },
    { title: "Smart Pricing", desc: "Transparent rates starting at just ₹99 visit fee." },
  ]
  return (
    <section className="features">
      <h2>Key Features</h2>
      <div className="grid">
        {list.map((f) => (
          <article key={f.title}>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
