const router = require('express').Router();
const orderController = require('../controllers/orderController');

// create a new order => client submits order
router.post('/', orderController.createOrder);

module.exports = router;