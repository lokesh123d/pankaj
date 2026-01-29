import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import './ProductCard.css'

const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useCart()

  const {
    id,
    handle,
    image,
    brand,
    name,
    title,
    rating,
    price,
    compareAtPrice,
    reviewCount
  } = product

  // Use title if name is not provided
  const displayName = name || title

  // Generate star rating
  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <span key={i} className="star star-full">★</span>
        )
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <span key={i} className="star star-half">★</span>
        )
      } else {
        stars.push(
          <span key={i} className="star star-empty">☆</span>
        )
      }
    }
    return stars
  }

  // Calculate discount percentage
  const discountPercent = compareAtPrice 
    ? Math.round((1 - price / compareAtPrice) * 100) 
    : null

  const productLink = `/product/${handle || id}`

  return (
    <article className="product-card">
      {/* Discount Badge */}
      {discountPercent && (
        <span className="product-card-badge">{discountPercent}% OFF</span>
      )}

      {/* Product Image */}
      <Link to={productLink} className="product-card-image-wrapper">
        <img 
          src={image} 
          alt={displayName}
          className="product-card-image"
          loading="lazy"
        />
        {/* Quick Add Button (shows on hover) */}
        <button 
          className="product-card-quick-add"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            addToCart(product)
          }}
        >
          Add to Cart
        </button>
      </Link>

      {/* Product Info */}
      <div className="product-card-info">
        {/* Brand */}
        <span className="product-card-brand">{brand}</span>

        {/* Name */}
        <h3 className="product-card-name">
          <Link to={productLink}>{displayName}</Link>
        </h3>

        {/* Rating */}
        {rating && (
          <div className="product-card-rating">
            <div className="stars">
              {renderStars(rating)}
            </div>
            <span className="rating-value">({rating})</span>
          </div>
        )}

        {/* Price */}
        <div className="product-card-price">
          <span className="price-current">
            ₹{price.toLocaleString('en-IN')}
          </span>
          {compareAtPrice && compareAtPrice > price && (
            <span className="price-compare">
              ₹{compareAtPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>
      </div>

      {/* Wishlist Button */}
      <button 
        className={`product-card-wishlist ${isInWishlist(id) ? 'active' : ''}`}
        onClick={() => toggleWishlist(product)}
        aria-label="Add to wishlist"
        style={{ color: isInWishlist(id) ? '#ef4444' : 'var(--color-gray-400)' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={isInWishlist(id) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
        </svg>
      </button>
    </article>
  )
}

export default ProductCard
