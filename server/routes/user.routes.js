import express from 'express'
import prodCtrl from '../controllers/user.controller.js'
const router = express.Router()
router.route('/api/products')
	.get(prodCtrl.search)
	.post(prodCtrl.create)
	.delete(prodCtrl.removeAll)
router.route('/api/products/:id')
	.get(prodCtrl.read)
	.put(prodCtrl.update)
	.delete(prodCtrl.remove)
	router.param('id', prodCtrl.productByID)

export default router
