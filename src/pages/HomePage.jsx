import Header from '../components/Header/Header'
import HeroSection from '../components/HeroSection/HeroSection'
import AwardsBanner from '../components/AwardsBanner/AwardsBanner'
import CategoryGrid from '../components/CategoryGrid/CategoryGrid'
import ProductCarousel from '../components/ProductCarousel/ProductCarousel'
import Newsletter from '../components/Newsletter/Newsletter'
import Footer from '../components/Footer/Footer'
import SEO from '../components/SEO'

const HomePage = () => {
  return (
    <div className="app">
      <SEO 
        title="Home"
        description="Welcome to Pankaj Dresses, Jaunpur's premier destination for ethnic and western fashion. Shop sarees, lehengas, and stylish daily wear."
      />
      <Header />
      <main>
        <HeroSection />
        <AwardsBanner />
        <CategoryGrid />
        <ProductCarousel />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}

export default HomePage
