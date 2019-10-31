import React from 'react'
import PropTypes from 'prop-types'
import { Item, Label } from 'semantic-ui-react'
import AddProductToCart from './AddProductToCart'

const ProductSummary = ({ 
  name, mediaUrl, _id, price, sku,
}) => (
  <Item.Group>
    <Item>
      <Item.Image size="medium" src={mediaUrl} />
      <Item.Content>
        <Item.Header>{name}</Item.Header>
        <Item.Description>
          <p>${price}</p>
          <Label>SKU: {sku}</Label>
        </Item.Description>
        <Item.Extra>
          <AddProductToCart productId={_id} />
        </Item.Extra>
      </Item.Content>
    </Item>
  </Item.Group>
)

export default ProductSummary


ProductSummary.propTypes = {
  name: PropTypes.string.isRequired,
  // description: PropTypes.string.isRequired,
  sku: PropTypes.string.isRequired,
  mediaUrl: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  _id: PropTypes.string.isRequired,
}
