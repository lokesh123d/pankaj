import { Link } from 'react-router-dom'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import './OrderSuccessPage.css'

const OrderSuccessPage = () => {
  return (
    <div className="app">
      <Header />
      <main className="order-success-page">
        <div className="container">
          <div className="success-card">
            <div className="success-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            
            <h1 className="success-title">Order Placed Successfully!</h1>
            <p className="success-message">
              Thank you for shopping with Pankaj Dresses. Your order has been confirmed and will be shipped soon.
            </p>
            
            <div className="order-details">
              <p>Order ID: <span className="order-id">#{Math.floor(Math.random() * 1000000)}</span></p>
              <p>Estimated Delivery: <span className="delivery-date">3-5 Business Days</span></p>
            </div>

            <div className="success-actions">
              <Link to="/" className="btn btn-primary">Continue Shopping</Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default OrderSuccessPage
