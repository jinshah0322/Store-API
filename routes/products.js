const express = require("express")
const router = express.Router()
const {getAllProducts,getAllProductsStatic} = require("../controllers/products")

router.get("/",getAllProducts)

module.exports = router