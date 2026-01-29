import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './HeroSection.css'

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const banners = [
    {
      id: 1,
      image: "https://lh3.googleusercontent.com/p/AF1QipNLk7KvYr5u7yyNZMRyw-9dbLrnEhfoU-N5TbD0=s1600",
      title: "Pankaj Dresses",
      subtitle: "Jaunpur's Premium Fashion Destination",
      link: "/collections/ethnic-wear",
      buttonText: "Visit Store"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=2574&auto=format&fit=crop",
      title: "Royal Silk Sarees",
      subtitle: "Handpicked Banarasi & Kanjivaram Collection",
      link: "/collections/sarees",
      buttonText: "Shop Silk"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1583391733958-e026b1462063?q=80&w=2670&auto=format&fit=crop",
      title: "Wedding Elegance",
      subtitle: "Bridal Lehengas & Heavy Sarees",
      link: "/collections/ethnic-wear",
      buttonText: "View Wedding Collection"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1621644781709-6ba77d4da0fa?q=80&w=2070&auto=format&fit=crop",
      title: "Festive Glamour",
      subtitle: "Shine bright with our latest festive arrivals",
      link: "/collections/sarees",
      buttonText: "Shop Festive"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1509319117193-42d13dae470b?q=80&w=2670&auto=format&fit=crop",
      title: "Contemporary Chic",
      subtitle: "Modern designs for the modern woman",
      link: "/collections/womens-clothing",
      buttonText: "Explore More"
    }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length)
  }

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [banners.length])

  return (
    <section className="hero-slider">
      {banners.map((banner, index) => (
        <div 
          key={banner.id} 
          className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
        >
          <div className="hero-slide-image">
            <img src={banner.image} alt={banner.title} />
            <div className="hero-overlay"></div>
          </div>
          
          <div className="hero-slide-content container">
            <h2 className="hero-slide-title">{banner.title}</h2>
            <p className="hero-slide-subtitle">{banner.subtitle}</p>
            <Link to={banner.link} className="hero-slide-btn">
              {banner.buttonText}
            </Link>
          </div>
        </div>
      ))}

      {/* Navigation */}
      <div className="hero-slider-nav">
        <button className="slider-arrow prev" onClick={prevSlide}>❮</button>
        <button className="slider-arrow next" onClick={nextSlide}>❯</button>
      </div>

      {/* Dots */}
      <div className="hero-slider-dots">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  )
}

export default HeroSection
