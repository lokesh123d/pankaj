import { useParams, Link } from 'react-router-dom'
import { useProducts, getProductsByCategory, getCategoryInfo } from '../hooks/useProducts'
import { useCart } from '../context/CartContext'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import './CollectionPage.css'

const CollectionPage = () => {
  const { category } = useParams()
  const { products, loading, error } = useProducts()
  const { addToCart, toggleWishlist, isInWishlist } = useCart()

  // Map URL params to actual category names
  const categoryMap = {
    'mens-clothing': "men's clothing",
    'womens-clothing': "women's clothing",
    'jewelery': 'jewelery',
    'electronics': 'electronics',
    'sale': 'sale',
    'new-arrivals': 'new-arrivals',
    'all': 'all'
  }

  const actualCategory = categoryMap[category] || category
  const categoryInfo = getCategoryInfo()
  const currentCategoryInfo = categoryInfo.find(c => c.id === actualCategory)

  // Filter products
  let filteredProducts = products
  if (actualCategory !== 'all' && actualCategory !== 'sale' && actualCategory !== 'new-arrivals') {
    filteredProducts = getProductsByCategory(products, actualCategory)
  }

  // For sale, add discount
  if (actualCategory === 'sale') {
    filteredProducts = products.slice(0, 8).map(p => ({
      ...p,
      compareAtPrice: Math.round(p.price * 1.3)
    }))
  }

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

  const getCategoryTitle = () => {
    if (actualCategory === 'all') return 'All Products'
    if (actualCategory === 'sale') return 'Sale'
    if (actualCategory === 'new-arrivals') return 'New Arrivals'
    return currentCategoryInfo?.title || category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())
  }

  if (loading) {
    return (
      <div className="app">
        <Header />
        <main className="collection-page">
          <div className="container">
            <div className="collection-loading">
              <div className="loading-spinner"></div>
              <p>Loading products...</p>
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
        <main className="collection-page">
          <div className="container">
            <div className="collection-error">
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
      <main className="collection-page">
        <div className="container">
          {/* Breadcrumb */}
          <nav className="breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>{getCategoryTitle()}</span>
          </nav>

          {/* Collection Header */}
          <div className="collection-header">
            <h1 className="collection-title">{getCategoryTitle()}</h1>
            <p className="collection-count">{filteredProducts.length} Products</p>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <div key={product.id} className="product-card-grid">
                  {/* Discount Badge */}
                  {product.compareAtPrice && (
                    <span className="product-badge">
                      {Math.round((1 - product.price / product.compareAtPrice) * 100)}% OFF
                    </span>
                  )}

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
                      {product.compareAtPrice && (
                        <span className="price-compare">₹{product.compareAtPrice.toLocaleString('en-IN')}</span>
                      )}
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
              <p>No products found in this category.</p>
              <Link to="/collections/all" className="btn btn-primary">View All Products</Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default CollectionPage
