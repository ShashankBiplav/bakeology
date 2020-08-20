const express = require('express');

const router = express.Router();

const isAuth = require('../middleware/is-auth');

const adminController = require('../controllers/administrator');

//create a category          POST => /administrator/category
router.post('/category',isAuth, adminController.createCategory);

//edit a category            PUT => /administrator/category/categoryId
router.put('/category/:categoryId', adminController.updateCategory);



module.exports = router;