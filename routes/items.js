const router = require('express').Router();
const itemController = require('../controllers/ItemController');

// get all items
router.get('/', itemController.getAllItems);

// get specific item by id
router.get('/:id', itemController.getItemById);

module.exports = router;