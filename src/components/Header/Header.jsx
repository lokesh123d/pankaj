import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { useProducts } from '../../hooks/useProducts'
import logo from '../../assets/logo.png'
import './Header.css'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const searchInputRef = useRef(null)
  
  const { getCartCount, wishlistItems } = useCart()
  const { products } = useProducts()
  const navigate = useNavigate()

  // Focus input when search opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isSearchOpen])

  // Handle live suggestions
  useEffect(() => {
    if (searchQuery.trim().length > 1 && products.length > 0) {
      const lowerQuery = searchQuery.toLowerCase()
      const matches = products.filter(product => 
        product.title.toLowerCase().includes(lowerQuery) || 
        product.category.toLowerCase().includes(lowerQuery)
      ).slice(0, 5) // Limit to top 5 matches
      setSuggestions(matches)
    } else {
      setSuggestions([])
    }
  }, [searchQuery, products])

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: "Men's Clothing", href: '/collections/mens-clothing' },
    { label: "Women's Clothing", href: '/collections/womens-clothing' },
    { label: 'Jewelry', href: '/collections/jewelery' },
    { label: 'Electronics', href: '/collections/electronics' },
    { label: 'Sale', href: '/collections/sale', highlight: true },
  ]

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setIsSearchOpen(false)
      setSearchQuery('')
      setSuggestions([])
    }
  }

  const handleSuggestionClick = (productId) => {
    navigate(`/product/${productId}`)
    setIsSearchOpen(false)
    setSearchQuery('')
    setSuggestions([])
  }

  return (
    <>
      {/* Main Header */}
      <header className="header">
        <div className="header-container">
          {/* Mobile Menu Button - Left on Mobile */}
          <button 
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>

          {/* Logo - Center on Mobile */}
          <Link to="/" className="logo">
            <img src={logo} alt="Pankaj Dresses" className="logo-img" />
            <span className="logo-text">PANKAJ DRESSES</span>
          </Link>

          {/* Desktop Navigation - Hidden on Mobile */}
          <nav className={`nav ${isMenuOpen ? 'active' : ''}`}>
            <div className="mobile-nav-header">
              <h3>Menu</h3>
              <button className="mobile-nav-close" onClick={() => setIsMenuOpen(false)}>✕</button>
            </div>
            <ul className="nav-list">
              {navLinks.map((link, index) => (
                <li key={index} className="nav-item">
                  <Link 
                    to={link.href} 
                    className={`nav-link ${link.highlight ? 'nav-link-highlight' : ''}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Header Actions */}
          <div className="header-actions">
            {/* Search */}
            <button 
              className="header-action-btn"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
            </button>

            {/* Wishlist / Account */}
            <Link to="/wishlist" className="header-action-btn" aria-label="Wishlist">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
              </svg>
              {wishlistItems.length > 0 && (
                <span className="cart-count">{wishlistItems.length}</span>
              )}
            </Link>

            {/* Cart */}
            <Link to="/cart" className="header-action-btn cart-btn" aria-label="Cart">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                <path d="M3 6h18"></path>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              <span className="cart-count">{getCartCount()}</span>
            </Link>
          </div>
        </div>

        {/* Search Overlay */}
        {isSearchOpen && (
          <div className="search-overlay">
            <div className="search-container">
              <form onSubmit={handleSearchSubmit}>
                <div className="search-input-wrapper">
                  <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </svg>
                  <input 
                    ref={searchInputRef}
                    type="text" 
                    placeholder="Search for products..." 
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button 
                    type="button"
                    className="search-close-btn"
                    onClick={() => {
                      setIsSearchOpen(false)
                      setSearchQuery('')
                      setSuggestions([])
                    }}
                  >
                    ✕
                  </button>
                </div>
              </form>

              {/* Suggestions List */}
              {suggestions.length > 0 && (
                <div className="search-suggestions">
                  <p className="suggestions-label">Top Results</p>
                  <ul className="suggestions-list">
                    {suggestions.map((product) => (
                      <li key={product.id} onClick={() => handleSuggestionClick(product.id)}>
                        <div className="suggestion-item">
                          <img src={product.image} alt={product.title} className="suggestion-img" />
                          <div className="suggestion-info">
                            <span className="suggestion-title">{product.title}</span>
                            <span className="suggestion-price">₹{Math.round(product.price * 83).toLocaleString('en-IN')}</span>
                          </div>
                        </div>
                      </li>
                    ))}
                    <li className="view-all-results" onClick={handleSearchSubmit}>
                      View all results for "{searchQuery}"
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </header>


      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setIsMenuOpen(false)}></div>
      )}
    </>
  )
}

export default Header
