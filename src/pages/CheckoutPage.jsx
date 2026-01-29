import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import './CheckoutPage.css'

const CheckoutPage = () => {
  const navigate = useNavigate()
  const { cartItems, getCartTotal, clearCart } = useCart()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'cod'
  })

  // Calculate totals
  const subtotal = getCartTotal()
  const shipping = subtotal >= 999 ? 0 : 99
  const total = subtotal + shipping

  // If cart is empty, redirect to home
  if (cartItems.length === 0) {
    navigate('/')
    return null
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate order processing
    setTimeout(() => {
      clearCart()
      navigate('/order-success')
    }, 1500)
  }

  return (
    <div className="app">
      <Header />
      <main className="checkout-page">
        <div className="container">
          <h1 className="checkout-title">Checkout</h1>

          <div className="checkout-container">
            {/* Left Column - Shipping Form */}
            <div className="checkout-form-section">
              <form id="checkout-form" onSubmit={handleSubmit}>
                {/* Contact Info */}
                <div className="form-group-section">
                  <h2 className="form-section-title">Contact Information</h2>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        required 
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Phone Number</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone" 
                        required 
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="form-group-section">
                  <h2 className="form-section-title">Shipping Address</h2>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="firstName">First Name</label>
                      <input 
                        type="text" 
                        id="firstName" 
                        name="firstName" 
                        required 
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName">Last Name</label>
                      <input 
                        type="text" 
                        id="lastName" 
                        name="lastName" 
                        required 
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input 
                      type="text" 
                      id="address" 
                      name="address" 
                      required 
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Street address, Flat, House no."
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="city">City</label>
                      <input 
                        type="text" 
                        id="city" 
                        name="city" 
                        required 
                        value={formData.city}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="state">State</label>
                      <input 
                        type="text" 
                        id="state" 
                        name="state" 
                        required 
                        value={formData.state}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="pincode">Pincode</label>
                      <input 
                        type="text" 
                        id="pincode" 
                        name="pincode" 
                        required 
                        value={formData.pincode}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="form-group-section">
                  <h2 className="form-section-title">Payment Method</h2>
                  <div className="payment-options">
                    <label className={`payment-option ${formData.paymentMethod === 'cod' ? 'selected' : ''}`}>
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="cod" 
                        checked={formData.paymentMethod === 'cod'}
                        onChange={handleChange}
                      />
                      <span className="payment-label">
                        <span>Cash on Delivery (COD)</span>
                        <span className="payment-icon">💵</span>
                      </span>
                    </label>

                    <label className={`payment-option ${formData.paymentMethod === 'upi' ? 'selected' : ''}`}>
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="upi" 
                        checked={formData.paymentMethod === 'upi'}
                        onChange={handleChange}
                      />
                      <span className="payment-label">
                        <span>UPI (Google Pay / PhonePe)</span>
                        <span className="payment-icon">📱</span>
                      </span>
                    </label>
                    
                    <label className={`payment-option ${formData.paymentMethod === 'card' ? 'selected' : ''}`}>
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="card" 
                        checked={formData.paymentMethod === 'card'}
                        onChange={handleChange}
                      />
                      <span className="payment-label">
                        <span>Credit / Debit Card</span>
                        <span className="payment-icon">💳</span>
                      </span>
                    </label>
                  </div>
                </div>
                
                <button type="submit" className="btn-place-order">
                  Place Order
                </button>
              </form>
            </div>

            {/* Right Column - Order Summary */}
            <div className="checkout-summary-section">
              <div className="checkout-summary-card">
                <h3 className="summary-title">Order Summary</h3>
                <div className="summary-items">
                  {cartItems.map((item) => (
                    <div key={item.id} className="summary-item">
                      <div className="summary-item-image">
                        <img src={item.image} alt={item.title} />
                        <span className="summary-item-qty">{item.quantity}</span>
                      </div>
                      <div className="summary-item-info">
                        <p className="summary-item-title">{item.title}</p>
                        <p className="summary-item-price">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="summary-divider"></div>
                
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                </div>
                
                <div className="summary-divider"></div>
                
                <div className="summary-row summary-total">
                  <span>Total</span>
                  <span>₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default CheckoutPage
