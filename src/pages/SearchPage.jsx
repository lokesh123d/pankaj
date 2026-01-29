import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts'
import { useCart } from '../context/CartContext'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import './SearchPage.css'

const SearchPage = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const { products, loading, error } = useProducts()
  const { addToCart, toggleWishlist, isInWishlist } = useCart()
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    if (products.length > 0 && query) {
      const results = products.filter(product => 
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
      )
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }, [query, products])

  // Generate star rating
  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={`star ${i < fullStars ? 'star-full' : 'star-empty'}`}>★</span>
      )
    }
    return stars
  }

  if (loading) {
    return (
      <div className="app">
        <Header />
        <main className="search-page">
          <div className="container">
            <div className="search-loading">
              <div className="loading-spinner"></div>
              <p>Searching products...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="app">
        <Header />
        <main className="search-page">
          <div className="container">
            <div className="search-error">
              <p>Error loading products. Please try again later.</p>
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
      <Header />
      <main className="search-page">
        <div className="container">
          {/* Breadcrumb */}
          <nav className="breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Search</span>
          </nav>

          {/* Search Header */}
          <div className="search-header-section">
            <h1 className="search-title">Search Results for "{query}"</h1>
            <p className="search-count">{searchResults.length} Products Found</p>
          </div>

          {/* Products Grid */}
          {searchResults.length > 0 ? (
            <div className="products-grid">
              {searchResults.map((product) => (
                <div key={product.id} className="product-card-grid">
                  {/* Wishlist Button */}
                  <button 
                    className={`product-wishlist ${isInWishlist(product.id) ? 'active' : ''}`}
                    onClick={() => toggleWishlist(product)}
                    aria-label="Add to wishlist"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={isInWishlist(product.id) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                    </svg>
                  </button>

                  {/* Product Image */}
                  <Link to={`/product/${product.id}`} className="product-image">
                    <img src={product.image} alt={product.title} />
                  </Link>

                  {/* Product Info */}
                  <div className="product-info">
                    <span className="product-brand">{product.brand}</span>
                    <h3 className="product-name">
                      <Link to={`/product/${product.id}`}>{product.title}</Link>
                    </h3>
                    
                    {/* Rating */}
                    <div className="product-rating">
                      {renderStars(product.rating)}
                      <span className="rating-count">({product.reviewCount})</span>
                    </div>

                    {/* Price */}
                    <div className="product-price">
                      <span className="price-current">₹{product.price.toLocaleString('en-IN')}</span>
                    </div>

                    {/* Add to Cart Button */}
                    <button 
                      className="add-to-cart-btn"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-products">
              <div className="no-results-icon">🔍</div>
              <h2>No products found</h2>
              <p>We couldn't find any matches for "{query}". Try checking your spelling or using different keywords.</p>
              <Link to="/" className="btn btn-primary">Browse All Products</Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default SearchPage
