const express = require('express');
const router = express.Router();
const searchItemController = require('../controllers/searchItemController');


router.get('/', searchItemController.searchItem);

module.exports = router;