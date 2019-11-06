import React from 'react'
import { Button, Segment, Divider } from 'semantic-ui-react'

const CartSummary = () => {
  const value = 0

  return (
    <>
      <Divider />
      <Segment clearing size="large">
        <strong>Sub total:</strong> ${(value / 100).toFixed(2)}
        <Button icon="cart" color="teal" floated="right" content="Checkout" disabled={value <= 0} />
      </Segment>
    </>
  )
}

export default CartSummary
