const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');

//to get all the recipes     GET=> /user/recipes
router.get('/recipes',userController.getRecipes);

//to get single recipe       GET=> /user/recipes/recipeId
router.get ('/recipe/:recipeId', userController.getRecipe);

module.exports = router;