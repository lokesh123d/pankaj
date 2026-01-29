import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import './CartPage.css'

const CartPage = () => {
  const navigate = useNavigate()
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getCartTotal 
  } = useCart()

  const subtotal = getCartTotal()
  const shipping = subtotal >= 999 ? 0 : 99
  const total = subtotal + shipping

  if (cartItems.length === 0) {
    return (
      <div className="app">
        <Header />
        <main className="cart-page">
          <div className="container">
            <h1 className="cart-title">Shopping Cart</h1>
            <div className="empty-cart">
              <div className="empty-cart-icon">🛒</div>
              <h2>Your cart is empty</h2>
              <p>Looks like you haven't added anything to your cart yet.</p>
              <Link to="/" className="btn btn-primary">Continue Shopping</Link>
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
      <main className="cart-page">
        <div className="container">
          <h1 className="cart-title">Shopping Cart</h1>

          <div className="cart-container">
            {/* Cart Items */}
            <div className="cart-items">
              {/* Header */}
              <div className="cart-header">
                <span className="cart-header-product">Product</span>
                <span className="cart-header-price">Price</span>
                <span className="cart-header-quantity">Quantity</span>
                <span className="cart-header-total">Total</span>
              </div>

              {/* Items */}
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  {/* Product Info */}
                  <div className="cart-item-product">
                    <Link to={`/product/${item.id}`} className="cart-item-image">
                      <img src={item.image} alt={item.title} />
                    </Link>
                    <div className="cart-item-details">
                      <Link to={`/product/${item.id}`} className="cart-item-name">
                        {item.title}
                      </Link>
                      <span className="cart-item-brand">{item.brand}</span>
                      <button 
                        className="cart-item-remove"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="cart-item-price">
                    ₹{item.price.toLocaleString('en-IN')}
                  </div>

                  {/* Quantity */}
                  <div className="cart-item-quantity">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      +
                    </button>
                  </div>

                  {/* Total */}
                  <div className="cart-item-total">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </div>
                </div>
              ))}

              {/* Clear Cart */}
              <div className="cart-actions">
                <button className="btn-clear-cart" onClick={clearCart}>
                  Clear Cart
                </button>
                <Link to="/" className="btn-continue">
                  Continue Shopping
                </Link>
              </div>
            </div>

            {/* Cart Summary */}
            <div className="cart-summary">
              <h3 className="summary-title">Order Summary</h3>
              
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              
              <div className="summary-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
              </div>

              {subtotal < 999 && (
                <div className="summary-note">
                  Add ₹{(999 - subtotal).toLocaleString('en-IN')} more for FREE shipping
                </div>
              )}

              <div className="summary-divider"></div>

              <div className="summary-row summary-total">
                <span>Total</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>

              <button className="btn-checkout" onClick={() => navigate('/checkout')}>
                Proceed to Checkout
              </button>

              <div className="payment-methods">
                <span>We Accept:</span>
                <div className="payment-icons">
                  <span>💳</span>
                  <span>📱</span>
                  <span>💰</span>
                  <span>💵</span>
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

export default CartPage
