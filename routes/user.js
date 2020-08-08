const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');

//to get all the recipes     GET=> /user/recipes
router.get('/recipes',userController.getRecipes);

//to get single recipe       GET=> /user/recipes/recipeId
router.get ('/recipe/:recipeId', userController.getRecipe);

//to mark as favourite       POST=> /user/mark-favourite/recipeId
router.post('/mark-favourite/:recipeId',); //TODO: define this route+controller

//to remove from favourites  POST=> /user/remove-favourite.recipeId
router.post('/remove-favourite/:recipeId',); //TODO: define this route+controller

module.exports = router;