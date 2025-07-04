import "./../styles/Footer.css"

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p>© {new Date().getFullYear()} Fuel Fusion. All rights reserved.</p>
        <nav>
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#how">How It Works</a>
        </nav>
      </div>
    </footer>
  )
}
