import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: String,
  price: { type: Number, required: true },
  category: String,
  inventory: { type: Number, default: 0 },
  image: String,
  lastUpdated: String
}, { timestamps: true })

export default mongoose.models.Product || mongoose.model('Product', ProductSchema)
