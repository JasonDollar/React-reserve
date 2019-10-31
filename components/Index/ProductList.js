import React from 'react'
import { Card } from 'semantic-ui-react'
import PropTypes from 'prop-types'


const ProductList = ({ products }) => {
  const mapProductsToItems = productsArg => productsArg.map(item => ({
    header: item.name,
    image: item.mediaUrl,
    meta: `$${item.price}`,
    color: 'teal',
    fluid: true,
    childKey: item._id,
    href: `/products?_id=${item._id}`,
  }))

  return (
    <Card.Group stackable itemsPerRow="3" centered items={mapProductsToItems(products)} />

  )
}

export default ProductList

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      sku: PropTypes.string.isRequired,
      mediaUrl: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
}