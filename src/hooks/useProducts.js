import { useState, useEffect } from 'react'

const API_URL = 'https://fakestoreapi.com/products'

// Custom hook to fetch products
export const useProducts = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true)
                const response = await fetch(API_URL)
                if (!response.ok) {
                    throw new Error('Failed to fetch products')
                }
                const data = await response.json()

                // Transform API data to match our component structure
                const transformedProducts = data.map(product => ({
                    id: product.id,
                    handle: `product-${product.id}`,
                    title: product.title,
                    name: product.title,
                    category: product.category,
                    price: Math.round(product.price * 83), // Convert USD to INR
                    originalPrice: product.price,
                    image: product.image,
                    description: product.description,
                    rating: product.rating.rate,
                    reviewCount: product.rating.count,
                    brand: getBrandFromCategory(product.category)
                }))

                setProducts(transformedProducts)
                setError(null)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [])

    return { products, loading, error }
}

// Get brand name based on category
const getBrandFromCategory = (category) => {
    const brands = {
        "men's clothing": 'URBAN MEN',
        "women's clothing": 'STYLE DIVA',
        "jewelery": 'JEWEL CRAFT',
        "electronics": 'TECH ZONE'
    }
    return brands[category] || 'EUPHORIA'
}

// Get category display info
export const getCategoryInfo = () => {
    return [
        {
            id: "men's clothing",
            title: "Men's Clothing",
            description: 'Shirts, Jackets, T-Shirts & more',
            image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png',
            color: '#e3f2fd'
        },
        {
            id: "women's clothing",
            title: "Women's Clothing",
            description: 'Dresses, Jackets, Tops & more',
            image: 'https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_t.png',
            color: '#fce4ec'
        },
        {
            id: 'jewelery',
            title: 'Jewelry',
            description: 'Rings, Bracelets, Earrings',
            image: 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_t.png',
            color: '#fff3e0'
        },
        {
            id: 'electronics',
            title: 'Electronics',
            description: 'Gadgets, Accessories & more',
            image: 'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_t.png',
            color: '#e8f5e9'
        }
    ]
}

// Filter products by category
export const getProductsByCategory = (products, category) => {
    return products.filter(p => p.category === category)
}

// Get featured products (first 5)
export const getFeaturedProducts = (products) => {
    return products.slice(0, 5)
}

// Get best sellers (products 5-15)
export const getBestSellers = (products) => {
    return products.slice(5, 15)
}
