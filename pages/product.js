import React from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'

import ProductSummary from '../components/Product/ProductSummary'
import ProductAttributes from '../components/Product/ProductAttributes'

const Product = ({ product }) => (
  <>
    <ProductSummary {...product} />
    <ProductAttributes {...product} />
  </>
)

Product.getInitialProps = async ({ query: { _id } }) => {
  const url = 'http://localhost:3000/api/product'
  // params  instead of using query in url
  const payload = { params: { _id } }
  const res = await axios.get(url, payload)
  // console.log(res)
  return { product: res.data.product }
}

export default Product

Product.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    sku: PropTypes.string.isRequired,
    mediaUrl: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }),
}

Product.defaultProps = {
  product: null,
}