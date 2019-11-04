// import products from '../../static/products.json'
import Product from '../../models/Product'
import connectDb from '../../utils/connectDb'

connectDb()

const handleGetRequest = async (req, res) => {
  try {
    const { _id } = req.query
    const product = await Product.findOne({ _id })
    if (!product) {
      return res.status(404).json({ message: 'Product not found', product: null })
    }
    res.status(200).json({ product })
  } catch (e) {
    res.status(500).json({ message: 'error', product: null })
  }
}

const handleDeleteRequest = async (req, res) => {
  try {
    const { _id } = req.query
    const product = await Product.findOneAndDelete({ _id })
    if (!product) {
      return res.status(404).json({ message: 'Product not found', product: null })
    }
    res.status(204).json({})

  } catch (e) {
    res.status(500).json({ message: 'error' })
  }
}

const handlePostRequest = async (req, res) => {
  try {
    const { 
      name, price, description, mediaUrl, 
    } = req.body
    if (!name || !price || !description || !mediaUrl) {
      // 422 - user did not set all information required to complete this request
      return res.status(422).send('Product missing one or more fields')
    }
    const product = new Product({ 
      name, price, description, mediaUrl, 
    })
    await product.save()
    res.status(201).json({ product })

  } catch (e) {
    res.status(500).json({ message: 'error' })
  }
}

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      await handleGetRequest(req, res)
      break
    case 'POST': 
      await handlePostRequest(req, res)
      break
    case 'DELETE':
      await handleDeleteRequest(req, res)
      break
    default:
      // 405 - kiedy nie jest to odpowiednia metoda
      res.status(405).send(`Method ${req.method} not allowed`)
      break
  }

}

