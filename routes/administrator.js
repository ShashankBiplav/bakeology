const express = require('express');

const router = express.Router();

const isAuth = require('../middleware/is-auth');

const adminController = require('../controllers/administrator');

//create a category          POST => /administrator/category
router.post('/category',isAuth, adminController.createCategory);

//edit a category            PUT => /administrator/category/categoryId
router.put('/category/:categoryId', adminController.updateCategory);

//get all chefs              GET => /administrator/chefs
router.get('/chefs',adminController.getAllChefs);

//approve a chef             PUT => /administrator/approve-chef/chefId
router.put('/approve-chef/:chefId', adminController.approveChef);

//disapprove a chef             PUT => /administrator/disapprove-chef/chefId
router.put('/disapprove-chef/:chefId', adminController.disapproveChef);



module.exports = router;