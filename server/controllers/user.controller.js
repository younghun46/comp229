import Product from '../models/user.model.js'
import extend from 'lodash/extend.js'
import errorHandler from './error.controller.js'

const create = async (req, res) => {
	const product = new Product(req.body)
	try {
		await product.save()
		return res.status(200).json({
			message: "Successfully signed up!"
		})
	} catch (err) {
		return res.status(400).json({
			error: errorHandler.getErrorMessage(err)
		})
	}
}
const search = async (req, res) => {
	try {
		
		let keyword = req.query.name;
		 
		 if (keyword) {


			let products = await Product.find({ name: { $regex: keyword, $options: 'i' } });

			if (!products || products.length === 0) {
				return res.status(400).json({
					error: "Product not found"
				});
			}

			res.json(products);


        } else {
			let product = await Product.find().select('name description price quantity category')
			res.json(product)
		}
	
	} catch (err) {
		return res.status(400).json({
			error: errorHandler.getErrorMessage(err)
		})
	}
}
const productByID = async (req, res, next, id) => {
	try {
		let product = await Product.findById(id)
		if (!product)
			return res.status('400').json({
				error: "Product not found"
			})
		req.profile = product
		next()
	} catch (err) {
		return res.status('400').json({
			error: "Could not retrieve user"
		})
	}
}
const read = (req, res) => {
	return res.json(req.profile)
}
const update = async (req, res) => {
	try {
		let product = req.profile
		product = extend(product, req.body)
		await product.save()
		res.json(product)
	} catch (err) {
		return res.status(400).json({
			error: errorHandler.getErrorMessage(err)
		})
	}
}
const remove = async (req, res) => {
	try {
		let product = req.profile
		let deletedProduct = await product.deleteOne()
		res.json(deletedProduct)
	} catch (err) {
		return res.status(400).json({
			error: errorHandler.getErrorMessage(err)
		})
	}
}

const removeAll = async (req, res) => {
	try {
        await Product.deleteMany({});
        res.status(200).json({ message: "All products deleted successfully." });
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
}

export default { create, productByID, read, search, remove, removeAll, update }
