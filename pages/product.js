import React from 'react'
import axios from 'axios'

const Product = ({ product }) => (
  <div>
    product page
  </div>
)

Product.getInitialProps = async ({ query: { _id } }) => {
  const url = 'http://localhost:3000/api/product'
  // params  instead of using query in url
  const payload = { params: { _id } }
  const res = await axios.get(url, payload)
  return { product: res.data.product }
}

export default Product
