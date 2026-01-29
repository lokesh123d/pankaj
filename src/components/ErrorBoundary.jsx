import { Component } from 'react'
import { Link } from 'react-router-dom'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f9fafb',
          textAlign: 'center',
          padding: '2rem'
        }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#1f2937' }}>Something went wrong.</h1>
          <p style={{ color: '#4b5563', marginBottom: '2rem' }}>We apologize for the inconvenience. Please try refreshing the page.</p>
          <a href="/" style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#c5a3ff',
            color: '#ffffff',
            borderRadius: '0.5rem',
            textDecoration: 'none',
            fontWeight: '600'
          }}>
            Return to Home
          </a>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
