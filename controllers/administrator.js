const fs = require('fs');

const path = require('path');

const mongoose = require("mongoose");

const Recipe = require('../models/recipe');

const Chef = require('../models/chef');

const Category = require('../models/category');

const Administrator = require('../models/administrator');

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

// exports.deleteCategory = async (req, res, next) => {
//
// };
