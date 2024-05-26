const express = require("express");
const router = express.Router();
const { allProducts, createProduct, showProduct, updateProduct, deleteProduct } = require("../controllers/ProductController");
router.get('/', allProducts)
router.post('/', createProduct)
router.get('/:id', showProduct)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)

module.exports = router