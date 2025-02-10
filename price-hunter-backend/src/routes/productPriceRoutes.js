const express = require('express');
const router = express.Router();
const productPriceController = require('../controllers/productPriceController');


router.get('/', productPriceController.getPrices);

module.exports = router;