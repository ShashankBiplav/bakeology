const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');

const isAuth = require('../middleware/is-auth');

//to get all the recipes     GET=> /user/recipes
router.get('/recipes',userController.getRecipes);

//to get all the categories     GET=> /user/categories
router.get('/categories',userController.getAllCategories);

//to get single recipe       GET=> /user/recipes/recipeId
router.get ('/recipe/:recipeId', userController.getRecipe);

//to mark as favourite       POST=> /user/mark-favourite/recipeId
router.post('/mark-favourite/:recipeId', isAuth, userController.markRecipeAsFavourite);

//to remove from favourites  POST=> /user/remove-favourite.recipeId
router.post('/remove-favourite/:recipeId', isAuth, userController.removeFromFavourites);

module.exports = router;