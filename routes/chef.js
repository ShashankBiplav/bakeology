const express = require('express');

const router = express.Router();

const chefController = require('../controllers/chef');

//create a new recipe          POST=>  /chef/create-recipe
router.post('/create-recipe', chefController.postRecipe);

//edit existing recipe         POST=> /chef/edit-recipe/recipeId
router.post('/recipe/:recipeId'); //TODO: Define this route+controller

//delete a recipe              DELETE =>  /chef/delete-recipe/recipeId
router.delete('/chef/delete-recipe/:recipeId',);  //TODO: Define this route+controller

module.exports = router;