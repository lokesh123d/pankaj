import { Helmet } from 'react-helmet-async'

const SEO = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title ? `${title} | Pankaj Dresses` : 'Pankaj Dresses - Premium Fashion in Jaunpur'}</title>
      <meta name="description" content={description || "Discover the latest trends in men's and women's fashion at Pankaj Dresses. Shop ethnic wear, sarees, lehengas, and western clothing online."} />
      {keywords && <meta name="keywords" content={keywords} />}
    </Helmet>
  )
}

export default SEO
