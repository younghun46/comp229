import mongoose from 'mongoose'

const ProductSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  category: { type: String, required: true }
});

export default mongoose.model('Products', ProductSchema);

