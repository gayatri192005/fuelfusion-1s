import "../styles/Footer.css"

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="inner">
        <div className="branding">
          <img src="/placeholder-logo.png" alt="Fuel Fusion logo" width="120" height="32" />
          <p>Empowering India’s mobility—fuel delivered when you need it.</p>
        </div>

        <div className="links">
          <h4>Company</h4>
          <ul>
            <li>
              <a href="#about">About Us</a>
            </li>
            <li>
              <a href="#careers">Careers</a>
            </li>
            <li>
              <a href="#blog">Blog</a>
            </li>
          </ul>
        </div>

        <div className="links">
          <h4>Support</h4>
          <ul>
            <li>
              <a href="#help">Help Centre</a>
            </li>
            <li>
              <a href="#contact">Contact Us</a>
            </li>
            <li>
              <a href="#policy">Privacy Policy</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="bottom">© {new Date().getFullYear()} Fuel Fusion. All rights reserved.</div>
    </footer>
  )
}
