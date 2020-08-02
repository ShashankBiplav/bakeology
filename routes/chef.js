const express = require('express');

const router = express.Router();

const chefController = require('../controllers/chef');

router.post('/recipe', chefController.postRecipe);


module.exports = router;