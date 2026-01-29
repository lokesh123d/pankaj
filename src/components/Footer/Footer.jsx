import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'
import './Footer.css'

const Footer = () => {
  const footerLinks = {
    shop: {
      title: 'Shop',
      links: [
        { label: "Men's Clothing", href: '/collections/mens-clothing' },
        { label: "Women's Clothing", href: '/collections/womens-clothing' },
        { label: 'Kids Wear', href: '/collections/kids-wear' },
        { label: 'Ethnic Wear', href: '/collections/ethnic-wear' },
        { label: 'Sarees', href: '/collections/sarees' },
        { label: 'Sale', href: '/collections/sale' }
      ]
    },
    help: {
      title: 'Help',
      links: [
        { label: 'Contact Us', href: '/contact' },
        { label: 'Visit Store', href: '/stores' },
        { label: 'Shipping Info', href: '/shipping' },
        { label: 'Returns & Exchange', href: '/returns' },
        { label: 'Track Order', href: '/track-order' },
        { label: 'Size Guide', href: '/size-guide' }
      ]
    },
    about: {
      title: 'Company',
      links: [
        { label: 'About Pankaj Dresses', href: '/about' },
        { label: 'Our Story', href: '/story' },
        { label: 'Careers', href: '/careers' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Privacy Policy', href: '/privacy' }
      ]
    }
  }

  const paymentMethods = [
    { name: 'Visa', icon: '💳' },
    { name: 'Mastercard', icon: '💳' },
    { name: 'UPI', icon: '📱' },
    { name: 'Paytm', icon: '💰' },
    { name: 'Cash', icon: '💵' }
  ]

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer */}
        <div className="footer-main">
          {/* Brand Column */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <img src={logo} alt="Pankaj Dresses" className="footer-logo-img" />
              <span className="footer-logo-text-plain">PANKAJ DRESSES</span>
            </Link>
            <p className="footer-tagline">
              Your trusted destination for quality fashion since 1990. 
              Sarees, Lehengas, Suiting, Shirting & Readymade Garments.
            </p>
            <div className="footer-contact">
              <a href="https://maps.app.goo.gl/g1Z4G8Xy7M1" target="_blank" rel="noopener noreferrer" className="footer-contact-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                Pankaj Dresses, Jaunpur, Uttar Pradesh
              </a>
              <a href="tel:+919876543210" className="footer-contact-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                +91 98765 43210
              </a>
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key} className="footer-links-column">
              <h4 className="footer-links-title">{section.title}</h4>
              <ul className="footer-links-list">
                {section.links.map((link, index) => (
                  <li key={index}>
                    <Link to={link.href} className="footer-link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            {/* Copyright */}
            <p className="footer-copyright">
              © {new Date().getFullYear()} Pankaj Dresses. All rights reserved.
            </p>

            {/* Legal Links */}
            <div className="footer-legal">
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
            </div>

            {/* Payment Methods */}
            <div className="footer-payments">
              <span className="payment-label">We Accept:</span>
              {paymentMethods.map((method, index) => (
                <span key={index} className="payment-icon" title={method.name}>
                  {method.icon}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
