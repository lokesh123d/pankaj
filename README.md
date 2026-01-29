# Euphoria India - Fashion & Clothing E-commerce Clone

A React-based UI clone of a modern fashion e-commerce website for India.

## 🚀 Quick Start

```bash
# Navigate to project folder
cd euphoria-clone

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:5173/` (or next available port).

---

## 📁 Project Structure

```
euphoria-clone/
├── index.html              # Main HTML entry point
├── package.json            # Project dependencies
├── vite.config.js          # Vite configuration
└── src/
    ├── main.jsx            # React entry point
    ├── App.jsx             # Main App component
    ├── App.css             # App layout styles
    ├── index.css           # Global styles & design system
    └── components/
        ├── Header/         # Navigation & search
        ├── HeroSection/    # Featured products hero
        ├── ProductCard/    # Reusable product card
        ├── ProductCarousel/# Best sellers carousel
        ├── CategoryGrid/   # Shop by category
        ├── AwardsBanner/   # Sale promotional banner
        ├── Newsletter/     # Email subscription
        └── Footer/         # Links & contact
```

---

## 📦 Components Documentation

### 1. Header
**File:** `src/components/Header/Header.jsx`

| Feature | Description |
|---------|-------------|
| Announcement Bar | "FREE Shipping on orders over ₹999" |
| Navigation | Men, Women, Kids, Ethnic Wear, Western, Accessories, Sale |
| Search | Search overlay with input field |
| Actions | Search, Account, Cart icons |
| Mobile | Hamburger menu with slide-in drawer |

---

### 2. HeroSection
**File:** `src/components/HeroSection/HeroSection.jsx`

| Feature | Description |
|---------|-------------|
| Layout | Split - text left, products right |
| Title | "Trending Fashion" |
| Products | 5 featured clothing items |
| Navigation | Dot indicators, prev/next arrows |
| Auto-play | Slides every 5 seconds |

**Products include:**
- Floral Summer Dress
- Classic Cotton Kurta Set
- Classic Denim Jacket
- Embroidered Silk Saree
- Premium Cotton Formal Shirt

---

### 3. ProductCard
**File:** `src/components/ProductCard/ProductCard.jsx`

| Feature | Description |
|---------|-------------|
| Image | Hover zoom effect |
| Badge | Discount percentage (if applicable) |
| Rating | 5-star display |
| Price | Indian Rupee (₹) format |
| Variants | Color selector dots |
| Actions | Add to Cart, Wishlist |

**Props:**
```jsx
product: {
  handle: string,      // URL slug
  image: string,       // Image URL
  brand: string,       // Brand name
  name: string,        // Product name
  rating: number,      // 1-5 rating
  price: number,       // Price in INR
  compareAtPrice: number,  // Original price (for discount)
  variants: [{ name, color }]
}
```

---

### 4. ProductCarousel
**File:** `src/components/ProductCarousel/ProductCarousel.jsx`

| Feature | Description |
|---------|-------------|
| Title | "Our Best Sellers" |
| Products | 12 clothing items |
| Navigation | Left/right scroll arrows |
| Scroll | Smooth horizontal scroll |
| CTA | "VIEW ALL PRODUCTS" button |

---

### 5. CategoryGrid
**File:** `src/components/CategoryGrid/CategoryGrid.jsx`

| Category | Description |
|----------|-------------|
| Men | Shirts, T-shirts, Trousers & more |
| Women | Dresses, Tops, Kurtas & more |
| Ethnic Wear | Sarees, Kurtas, Lehengas |
| Western | Jeans, Jackets, Dresses |
| Kids | Boys & Girls fashion |
| Accessories | Bags, Watches, Jewelry |

---

### 6. AwardsBanner (Sale Banner)
**File:** `src/components/AwardsBanner/AwardsBanner.jsx`

| Feature | Description |
|---------|-------------|
| Style | Purple gradient background |
| Title | "End of Season Sale" |
| Offer | "Up to 50% off on selected styles" |
| CTA | "Shop Now" button |

---

### 7. Newsletter
**File:** `src/components/Newsletter/Newsletter.jsx`

| Feature | Description |
|---------|-------------|
| Title | "Join the Euphoria Family" |
| Offer | 10% off first order |
| Form | Email input + Subscribe button |
| Social | Instagram, Facebook, Twitter, YouTube |
| Success | Confirmation message after submit |

---

### 8. Footer
**File:** `src/components/Footer/Footer.jsx`

| Section | Links |
|---------|-------|
| Shop | Men, Women, Kids, Ethnic, Western, Accessories |
| Help | Contact, FAQ, Shipping, Returns, Track Order, Size Guide |
| Company | About Us, Careers, Blog, Store Locator, Affiliate |
| Contact | support@euphoria.in, 1800-123-456 |
| Payments | Visa, Mastercard, UPI, Paytm, COD |

---

## 🎨 Design System

### Colors
| Variable | Value | Usage |
|----------|-------|-------|
| `--color-primary` | `#c5a3ff` | Brand purple |
| `--color-primary-dark` | `#a47be8` | Hover states |
| `--color-star` | `#fbbf24` | Star ratings |

### Typography
| Font | Usage |
|------|-------|
| **Playfair Display** | Headings, titles |
| **Roboto** | Body text, UI |

### Currency
All prices displayed in **Indian Rupees (₹)** with Indian number formatting.

---

## ✅ Features

- [x] Responsive design (mobile, tablet, desktop)
- [x] Sticky navigation header
- [x] Mobile hamburger menu
- [x] Product cards with hover effects
- [x] Discount badges
- [x] Star ratings
- [x] Color variant selectors
- [x] Category grid
- [x] Sale promotional banner
- [x] Newsletter signup
- [x] Social media links
- [x] Indian Rupee pricing (₹)
- [x] Indian payment methods (UPI, Paytm, COD)

---

## 📝 Notes

- This is a **UI-only** implementation (no backend)
- Images from Unsplash (placeholder fashion images)
- Forms are simulated (no actual submission)
- All features are interactive but not connected to a backend

---

## 📄 License

For educational purposes only.
