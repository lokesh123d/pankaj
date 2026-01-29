import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import './WishlistPage.css'

const WishlistPage = () => {
  const { wishlistItems, toggleWishlist, addToCart } = useCart()

  const handleAddToCart = (product) => {
    addToCart(product)
    toggleWishlist(product)
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="app">
        <Header />
        <main className="wishlist-page">
          <div className="container">
            <h1 className="wishlist-title">My Wishlist</h1>
            <div className="empty-wishlist">
              <div className="empty-wishlist-icon">❤️</div>
              <h2>Your wishlist is empty</h2>
              <p>Save your favorite items here to buy them later.</p>
              <Link to="/" className="btn btn-primary">Start Shopping</Link>
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
      <main className="wishlist-page">
        <div className="container">
          <h1 className="wishlist-title">My Wishlist ({wishlistItems.length} items)</h1>

          <div className="wishlist-grid">
            {wishlistItems.map((item) => (
              <div key={item.id} className="wishlist-item">
                {/* Remove Button */}
                <button 
                  className="wishlist-remove"
                  onClick={() => toggleWishlist(item)}
                  aria-label="Remove from wishlist"
                >
                  ✕
                </button>

                {/* Product Image */}
                <Link to={`/product/${item.id}`} className="wishlist-item-image">
                  <img src={item.image} alt={item.title} />
                </Link>

                {/* Product Info */}
                <div className="wishlist-item-info">
                  <span className="wishlist-item-brand">{item.brand}</span>
                  <h3 className="wishlist-item-name">
                    <Link to={`/product/${item.id}`}>{item.title}</Link>
                  </h3>
                  <span className="wishlist-item-price">₹{item.price.toLocaleString('en-IN')}</span>
                  
                  <button 
                    className="wishlist-add-to-cart"
                    onClick={() => handleAddToCart(item)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default WishlistPage
