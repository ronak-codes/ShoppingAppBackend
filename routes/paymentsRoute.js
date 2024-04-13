const express = require("express");
const router = express.Router();
const {createPaymentIntent } = require("../controller/paymentsController")


router.post("/intent",createPaymentIntent)

module.exports = router;