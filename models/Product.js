import mongoose from 'mongoose'
import shortid from 'shortid'

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  sku: {
    type: String,
    required: true,
    default: shortid.generate(),
  },
  mediaUrl: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },

})

// const Product = mongoose.model('Product', productSchema)

const Product = mongoose.models.Product || mongoose.model('Product', productSchema)

export default Product