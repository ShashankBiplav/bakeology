const fs = require('fs');

const Recipe = require('../models/recipe');

const Category = require('../models/category');

const User = require('../models/user');

const Chef = require('../models/chef');

exports.getRecipes = async (req, res, next) => {
    // const currentPage = req.query.page || 1;
    // const perPage = 2;
    try {
        const totalRecipes = await Recipe.find().countDocuments();
        const recipes = await Recipe.find().populate('chef', 'profileImageUrl name');
        // .skip((currentPage - 1) * perPage).limit(perPage);
        res.status(200).json({
            message: 'Recipes Fetched Successfully.',
            recipes: recipes,
            totalItems: totalRecipes
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getAllCategories = async (req, res, next) => {
    try {
        const totalCategories = await Category.find().countDocuments();
        const categories = await Category.find();
        res.status(200).json({
            message: 'Categories Fetched Successfully.',
            categories: categories,
            totalItems: totalCategories
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getRecipe = async (req, res, next) => {
    const recipeId = req.params.recipeId;
    try {
        const recipe = await Recipe.findById(recipeId).populate('chef', 'name');
        if (!recipe) {
            const error = new Error('Recipe not found.');
            error.status = 404;
            throw error;
        }
        res.status(200).json({
            message: 'Recipe Fetched',
            recipe: recipe
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getAllRecipesOfCategory = async (req, res, next) => {
    const categoryId = req.params.categoryId;
    try {
        const recipes = await Category.findById(categoryId).populate('recipes');
        if (!recipes) {
            const error = new Error('No recipes in this category found');
            error.status = 404;
            throw error;
        }
        res.status(200).json({
            message: 'Recipe Fetched',
            recipes: recipes
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getAllUserFavouriteRecipes = async (req, res, next) => {
    const userId = req.userId;
    try {
        const recipes = await User.findById(userId, {
            email: 0,
            _id: 0,
            password: 0,
            name: 0,
            resetToken: 0,
            resetTokenExpiryDate: 0,
        }).populate('favourites');
        res.status(200).json({
            message: 'Favourites Fetched',
            recipes: recipes
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.markRecipeAsFavourite = async (req, res, next) => {
    const recipeId = req.params.recipeId;
    try {
        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
            const error = new Error('Recipe not found.');
            error.status = 404;
            throw error;
        }
        const user = await User.findById(req.userId);
        user.favourites.push(recipe);
        await user.save();
        res.status(200).json({
            message: 'Marked as Favourite',
            recipe: recipe
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.removeFromFavourites = async (req, res, next) => {
    const recipeId = req.params.recipeId;
    try {
        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
            const error = new Error('Recipe not found.');
            error.status = 404;
            throw error;
        }
        const user = await User.findById(req.userId);
        user.favourites.pull(recipe);
        await user.save();
        res.status(200).json({
            message: 'Removed from Favourites',
            recipe: recipe
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getUserDetails = async (req, res, next) => {
    const userId = req.userId;
    try {
        const user = await User.findById(userId, {
            password: 0,
            resetToken: 0,
            resetTokenExpiryDate: 0
        });
        if (!user) {
            const error = new Error('User not found.');
            error.status = 404;
            throw error;
        }
        res.status(200).json({
            message: 'User Details Fetched',
            user: user
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getAllChefDetails = async (req, res, next) => {
    const chefId = req.params.chefId;
    try {
        const chef = await Chef.findById(chefId, {
            password: 0,
            resetToken: 0,
            resetTokenExpiryDate: 0
        });
        if (!chef) {
            const error = new Error('Chef not found.');
            error.status = 404;
            throw error;
        }
        res.status(200).json({
            message: 'Chef Details Fetched',
            chef: chef
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

};


