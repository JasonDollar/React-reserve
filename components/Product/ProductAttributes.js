import React from 'react'
import { Header, Button } from 'semantic-ui-react'
import PropTypes from 'prop-types'


const ProductAttributes = ({ description }) => (
  <>
    <Header as="h3">About this product</Header>
    <p>{description}</p>
    <Button icon="trash alternate outline" color="red" content="Delete Product" />
  </>
)

export default ProductAttributes

ProductAttributes.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  sku: PropTypes.string.isRequired,
  mediaUrl: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
}
