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

// to get all user details
router.get('/user-details', isAuth, userController.getUserDetails);

// to get all chef details
router.get('/chef-details/:chefId', userController.getAllChefDetails);

//to get all user favourite recipes
router.get('/get-favourites/:userId', isAuth, userController.getAllUserFavouriteRecipes);

//to get all recipes of that category
router.get('/categorized-recipes/:categoryId',userController.getAllRecipesOfCategory);

//to mark as favourite       POST=> /user/mark-favourite/recipeId
router.put('/mark-favourite/:recipeId', isAuth, userController.markRecipeAsFavourite);

//to remove from favourites  POST=> /user/remove-favourite/recipeId
router.put('/remove-favourite/:recipeId', isAuth, userController.removeFromFavourites);

module.exports = router;
