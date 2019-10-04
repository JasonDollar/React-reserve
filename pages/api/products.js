import products from '../../static/products.json'

export default (req, res) => {
  // req => method 
  res.status(200).json({ products })
}