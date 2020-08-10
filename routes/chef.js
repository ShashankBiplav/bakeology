const express = require('express');

const router = express.Router();

const chefController = require('../controllers/chef');

const isAuth = require('../middleware/is-auth');

//get all recipes of that chef   GET => /chef/get-recipes
router.get('/get-recipes',isAuth, chefController.getChefRecipes);

//get a recipe created by chef   GET => /chef/get-recipe/recipeId
router.get('/get-recipe/:recipeId', isAuth, chefController.getChefRecipe);

//create a new recipe          POST=>  /chef/create-recipe
router.post('/create-recipe',isAuth, chefController.postRecipe);

//edit existing recipe         POST=> /chef/edit-recipe/recipeId
router.put('/recipe/:recipeId',isAuth, chefController.updateRecipe); //TODO: Define this route+controller

//delete a recipe              DELETE =>  /chef/delete-recipe/recipeId
router.delete('/delete-recipe/:recipeId', isAuth ,chefController.deleteRecipe);  //TODO: Define this route+controller

module.exports = router;