import React from 'react'
import { Segment } from 'semantic-ui-react'
import CartItemList from '../components/Cart/CartItemList'
import CartSummary from '../components/Cart/CartSummary'

const Cart = () => (
  <Segment>
    <CartItemList />
    <CartSummary />
  </Segment>
)

export default Cart
