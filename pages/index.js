import React, { useEffect } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'


const Home = ({ products }) => {
  // useEffect(() => {
  //   getProducts()
  // }, [])

  // const getProducts = async () => {
  //   const res = await axios.get('http://localhost:3000/api/products')
  //   console.log(res.data)
  // } 
  console.log(products.length)

  return (
    <>home</>
  )
}

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

