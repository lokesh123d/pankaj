import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useProducts, getBestSellers } from '../../hooks/useProducts'
import ProductCard from '../ProductCard/ProductCard'
import './ProductCarousel.css'

const ProductCarousel = () => {
  const carouselRef = useRef(null)
  const { products, loading, error } = useProducts()

  // Get best sellers
  const bestSellers = getBestSellers(products)

  // Add display properties
  const displayProducts = bestSellers.map((product, index) => ({
    ...product,
    compareAtPrice: index % 3 === 0 ? Math.round(product.price * 1.3) : null
  }))

  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 300
      const newScrollPosition = carouselRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount)
      carouselRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      })
    }
  }

  if (loading) {
    return (
      <section className="product-carousel-section">
        <div className="container">
          <div className="product-carousel-header">
            <h2 className="section-title">Our <em>Best Sellers</em></h2>
          </div>
          <div className="carousel-loading">
            <div className="loading-spinner"></div>
            <p>Loading products...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="product-carousel-section">
        <div className="container">
          <div className="product-carousel-header">
            <h2 className="section-title">Our <em>Best Sellers</em></h2>
          </div>
          <div className="carousel-error">
            <p>Error loading products. Please try again later.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="product-carousel-section">
      <div className="container">
        {/* Section Header */}
        <div className="product-carousel-header">
          <h2 className="section-title">
            Our <em>Best Sellers</em>
          </h2>
          <p className="section-subtitle">
            Top picks loved by our customers across India
          </p>
        </div>

        {/* Carousel */}
        <div className="product-carousel-wrapper">
          {/* Navigation Arrows */}
          <button 
            className="carousel-arrow carousel-arrow-left"
            onClick={() => scroll('left')}
            aria-label="Scroll left"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </button>

          <div className="product-carousel" ref={carouselRef}>
            {displayProducts.map((product) => (
              <div key={product.id} className="product-carousel-item">
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <button 
            className="carousel-arrow carousel-arrow-right"
            onClick={() => scroll('right')}
            aria-label="Scroll right"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </button>
        </div>

        {/* CTA Button */}
        <div className="product-carousel-cta">
          <Link to="/collections/all" className="btn btn-primary">
            VIEW ALL PRODUCTS
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ProductCarousel
