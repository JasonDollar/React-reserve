// import products from '../../static/products.json'
import Product from '../../models/Product'
import connectDb from '../../utils/connectDb'

connectDb()

export default async (req, res) => {
  const { _id } = req.query
  const product = await Product.findOne({ _id })
  if (!product) {
    return res.status(404).json({ message: 'Product not found', product: null })
  }
  res.status(200).json({ product })
}