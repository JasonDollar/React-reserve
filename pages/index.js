import React, { useEffect } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import ProductList from '../components/Index/ProductList'


const Home = ({ products }) => (
  <ProductList products={products} />
)

Home.getInitialProps = async () => {
  const res = await axios.get('http://localhost:3000/api/products')
  return { products: res.data.products }
}

Home.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      sku: PropTypes.string.isRequired,
      mediaUrl: PropTypes.string.isRequired,

    }).isRequired,
  ).isRequired,
}

export default Home

