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

export default mongoose.model('Product', productSchema)