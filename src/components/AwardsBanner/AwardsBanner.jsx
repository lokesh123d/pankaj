import { Link } from 'react-router-dom'
import './AwardsBanner.css'

const AwardsBanner = () => {
  return (
    <section className="awards-banner-section">
      <div className="container">
        <div className="awards-banner">
          <div className="awards-content">
            <h2 className="awards-title">Visit Pankaj Dresses</h2>
            <p className="awards-text">
              Experience the best of Indian fashion at our automated store in Jaunpur. 
              Wide range of Sarees, Lehengas, and Readymade Garments available.
            </p>
            <div className="awards-actions">
              <a 
                href="https://maps.app.goo.gl/g1Z4G8Xy7M1" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-dark"
              >
                Get Directions
              </a>
              <Link to="/about" className="btn btn-outline">
                About Us
              </Link>
            </div>
          </div>
          <div className="awards-image">
            <img 
              src="https://lh3.googleusercontent.com/p/AF1QipNLk7KvYr5u7yyNZMRyw-9dbLrnEhfoU-N5TbD0=s1600" 
              alt="Pankaj Dresses Store Front" 
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default AwardsBanner
