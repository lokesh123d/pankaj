import { Link } from 'react-router-dom'
import { useProducts, getCategoryInfo, getProductsByCategory } from '../../hooks/useProducts'
import './CategoryGrid.css'

const CategoryGrid = () => {
  const { products } = useProducts()
  const categoryInfo = getCategoryInfo()

  // Add product count from fetched data
  const displayCategories = categoryInfo.map(cat => {
    const categoryProducts = getProductsByCategory(products, cat.id)
    return {
      ...cat,
      count: categoryProducts.length,
      link: `/collections/${cat.id.replace("'s ", "-").replace(" ", "-")}`
    }
  })

  return (
    <section className="category-grid-section">
      <div className="container">
        <div className="category-grid-header">
          <h2 className="section-title">
            Shop by <em>Category</em>
          </h2>
          <p className="section-subtitle">
            Find the perfect product for every need
          </p>
        </div>

        <div className="category-grid">
          {displayCategories.map((category) => (
            <Link 
              key={category.id} 
              to={category.link}
              className="category-card"
              style={{ '--category-bg': category.color }}
            >
              <div className="category-card-image">
                <img src={category.image} alt={category.title} />
              </div>
              <div className="category-card-content">
                <h3 className="category-card-title">{category.title}</h3>
                <p className="category-card-description">{category.description}</p>
                <span className="category-card-count">{category.count} Products</span>
                <span className="category-card-link">
                  Explore →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategoryGrid
