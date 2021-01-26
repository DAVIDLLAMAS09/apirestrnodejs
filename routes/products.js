const express = require('express')
const router = express.Router()
const { getProducts,PostProducts,UpdateProduct,DeleteProduct } = require('../controller/products')
const upload = require('../multerConfig')

const pathProduct = 'products'

router.get(`/${pathProduct}`,getProducts)
router.post(`/${pathProduct}`,upload.single('image'),PostProducts)
router.put(`/${pathProduct}/:id`,UpdateProduct)
router.delete(`/${pathProduct}/:id`,DeleteProduct)

module.exports = router
