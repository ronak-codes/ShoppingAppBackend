const express = require("express");
const router = express.Router();
const { getAllProducts, getProductById, createProduct, searchForProducts } = require("../controller/productsController");
const {validateCreateProduct} = require("../middleware/validation")


router.get("/",getAllProducts)
router.get("/:id",getProductById)
router.get("/search/:key",searchForProducts)
router.post("/createProduct",validateCreateProduct,createProduct)

module.exports = router