import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts'
import { useCart } from '../context/CartContext'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import SEO from '../components/SEO'
import './ProductPage.css'

const ProductPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { products, loading, error } = useProducts()
  const { addToCart, toggleWishlist, isInWishlist } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)

  const product = products.find(p => p.id === parseInt(id))

  // Generate star rating
  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<span key={i} className="star star-full">★</span>)
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<span key={i} className="star star-half">★</span>)
      } else {
        stars.push(<span key={i} className="star star-empty">☆</span>)
      }
    }
    return stars
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const handleBuyNow = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
    navigate('/cart')
  }

  if (loading) {
    return (
      <div className="app">
        <Header />
        <main className="product-page">
          <div className="container">
            <div className="product-loading">
              <div className="loading-spinner"></div>
              <p>Loading product...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="app">
        <Header />
        <main className="product-page">
          <div className="container">
            <div className="product-error">
              <h2>Product Not Found</h2>
              <p>The product you're looking for doesn't exist.</p>
              <Link to="/" className="btn btn-primary">Go Home</Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="app">
      <SEO 
        title={product.title} 
        description={product.description?.substring(0, 160)}
      />
      <Header />
      <main className="product-page">
        <div className="container">
          {/* Breadcrumb */}
          <nav className="breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to={`/collections/${product.category.replace("'s ", "-").replace(" ", "-")}`}>
              {product.category}
            </Link>
            <span>/</span>
            <span>{product.title}</span>
          </nav>

          <div className="product-container">
            {/* Product Image */}
            <div className="product-gallery">
              <div className="product-main-image">
                <img src={product.image} alt={product.title} />
              </div>
            </div>

            {/* Product Details */}
            <div className="product-details">
              <span className="product-brand">{product.brand}</span>
              <h1 className="product-title">{product.title}</h1>

              {/* Rating */}
              <div className="product-rating">
                <div className="stars">
                  {renderStars(product.rating)}
                </div>
                <span className="rating-text">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="product-price">
                <span className="price-current">₹{product.price.toLocaleString('en-IN')}</span>
                <span className="price-tax">Inclusive of all taxes</span>
              </div>

              {/* Description */}
              <div className="product-description">
                <h3>Description</h3>
                <p>{product.description}</p>
              </div>

              {/* Quantity */}
              <div className="product-quantity">
                <span className="quantity-label">Quantity:</span>
                <div className="quantity-controls">
                  <button 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                  >
                    −
                  </button>
                  <span className="quantity-value">{quantity}</span>
                  <button onClick={() => setQuantity(q => q + 1)}>+</button>
                </div>
              </div>

              {/* Actions */}
              <div className="product-actions">
                <button 
                  className={`btn-add-to-cart ${addedToCart ? 'added' : ''}`}
                  onClick={handleAddToCart}
                >
                  {addedToCart ? '✓ Added to Cart' : 'Add to Cart'}
                </button>
                <button className="btn-buy-now" onClick={handleBuyNow}>
                  Buy Now
                </button>
                <button 
                  className={`btn-wishlist ${isInWishlist(product.id) ? 'active' : ''}`}
                  onClick={() => toggleWishlist(product)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={isInWishlist(product.id) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                  </svg>
                </button>
              </div>

              {/* Features */}
              <div className="product-features">
                <div className="feature">
                  <span className="feature-icon">🚚</span>
                  <span>Free Shipping on orders over ₹999</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">↩️</span>
                  <span>Easy 7-day returns</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">💳</span>
                  <span>Secure payment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default ProductPage
