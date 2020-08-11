const express = require('express');

const router = express.Router();

const isAuth = require('../middleware/is-auth');

const adminController = require('../controllers/administrator');

//get all chefs          GET => /administrator/chefs
router.post('/category',isAuth, adminController.createCategory);

module.exports = router;