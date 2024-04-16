const express = require("express");
const router = express.Router();
const {createPaymentIntent,createOrder } = require("../controller/paymentsController")


router.post("/intent",createPaymentIntent)

router.post("/createOrder",createOrder)

module.exports = router;