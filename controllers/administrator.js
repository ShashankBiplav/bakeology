const fs = require('fs');

const path = require('path');

const Chef = require('../models/chef');

const Category = require('../models/category');

exports.createCategory = async (req, res, next) => {
    if (!req.file) {
        const error = new Error('No image provided');
        error.statusCode = 422;
        return next(error);
    }
    const title = req.body.title;
    const colorA = req.body.colorA;
    const colorB = req.body.colorB;
    const iconImageUrl = req.file.path;
    const category = new Category({
        title: title,
        colorA: colorA,
        colorB: colorB,
        iconImageUrl: iconImageUrl
    });
    try{
        await category.save();
        res.status(201).json({
            message: 'Category created successfully',
            category: category
        });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.updateCategory = async (req, res, next) => {
    const categoryId = req.params.categoryId;
    const title = req.body.title;
    const colorA = req.body.colorA;
    const colorB = req.body.colorB;
    let iconImageUrl = req.file.path;
    if (req.file) {
        iconImageUrl = req.file.path;
    }
    if (!iconImageUrl) {
        const error = new Error('No file picked.');
        error.statusCode = 422;
        throw error;
    }
    try{
        const category = await Category.findById(categoryId);
        if (!category){
            const error = new Error('Could not find category.');
            error.statusCode = 404;
            throw error;
        }
        if (iconImageUrl !== category.iconImageUrl) { //new image was uploaded
            clearImage(category.iconImageUrl);
        }
        category.title = title;
        category.colorA = colorA;
        category.colorB = colorB;
        category.iconImageUrl = iconImageUrl;
        const result = await category.save();
        res.status(200).json({
            message: 'Category updated!',
            post: result
        });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getAllChefs = async (req, res, next) => {
  try {
      const chefs = await Chef.find();
      res.status(200).json({
          message: 'Chefs Fetched Successfully.',
          recipes: chefs
      });
  }
  catch (err) {
      if (!err.statusCode) {
          err.statusCode = 500;
      }
      next(err);
  }
};

exports.approveChef = async (req, res, next) => {
    const chefId = req.params.chefId;
    try{
        const chef = await Chef.findById(chefId);
        if (!chef){
            const error = new Error('Could not find chef.');
            error.statusCode = 404;
            throw error;
        }
        chef.isApproved = true;
        const result = await chef.save();
        res.status(200).json({
            message: 'Chef approved!',
            post: result
        });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.disapproveChef = async (req, res, next) => {
    const chefId = req.params.chefId;
    try{
        const chef = await Chef.findById(chefId);
        if (!chef){
            const error = new Error('Could not find chef.');
            error.statusCode = 404;
            throw error;
        }
        chef.isApproved = false;
        const result = await chef.save();
        res.status(200).json({
            message: 'Chef disapproved!',
            post: result
        });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

const clearImage = filePath => {
    filePath = path.join(__dirname, '..', filePath);
    fs.unlink(filePath, err => console.log(err));
};

// exports.deleteCategory = async (req, res, next) => {
//
// };
