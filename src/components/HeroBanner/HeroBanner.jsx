import { useState, useEffect } from 'react'
import './HeroBanner.css'

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      id: 1,
      desktopImage: 'https://cdn.shopify.com/s/files/1/0689/3450/0502/files/banner-desktop-envio.jpg?v=1764965840',
      mobileImage: 'https://cdn.shopify.com/s/files/1/0689/3450/0502/files/banner-mobile-envio.jpg?v=1764965841',
      link: '/collections/skincare',
      alt: 'Envío gratis banner'
    },
    {
      id: 2,
      desktopImage: 'https://cdn.shopify.com/s/files/1/0689/3450/0502/files/Euphoria_awards_desktop_2.png?v=1769205041',
      mobileImage: 'https://cdn.shopify.com/s/files/1/0689/3450/0502/files/Euphoria_awards_mobile_2.png?v=1769205066',
      link: '/euphoria-awards',
      alt: 'Euphoria Awards 2025'
    },
    {
      id: 3,
      desktopImage: 'https://cdn.shopify.com/s/files/1/0689/3450/0502/files/banner-desktop-ritual-de-belleza.jpg?v=1764965839',
      mobileImage: 'https://cdn.shopify.com/s/files/1/0689/3450/0502/files/banner-mobile-ritual-de-belleza.jpg?v=1764965840',
      link: '/collections/skincare',
      alt: 'Ritual de belleza'
    },
    {
      id: 4,
      desktopImage: 'https://cdn.shopify.com/s/files/1/0689/3450/0502/files/banner_sueter_desktop_1.jpg?v=1766510277',
      mobileImage: 'https://cdn.shopify.com/s/files/1/0689/3450/0502/files/Banner_sueter_mobile.jpg?v=1766510291',
      link: '/merch',
      alt: 'Merch Euphoria'
    }
  ]

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [slides.length])

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <section className="hero-banner">
      <div className="hero-slider">
        {slides.map((slide, index) => (
          <a
            key={slide.id}
            href={slide.link}
            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
          >
            <picture>
              <source media="(min-width: 768px)" srcSet={slide.desktopImage} />
              <img 
                src={slide.mobileImage} 
                alt={slide.alt}
                className="hero-image"
              />
            </picture>
          </a>
        ))}

        {/* Navigation Arrows */}
        <button 
          className="hero-arrow hero-arrow-prev"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6"/>
          </svg>
        </button>
        <button 
          className="hero-arrow hero-arrow-next"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </button>

        {/* Dots Navigation */}
        <div className="hero-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`hero-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default HeroBanner
