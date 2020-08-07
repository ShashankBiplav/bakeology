const express = require('express');

const expressValidator = require('express-validator');

const Chef = require('../models/chef');

const User = require('../models/user');

const isAuth = require('../middleware/is-auth');

const router = express.Router();

//USER SIGN UP
router.put('/user/signup',[
    expressValidator.check('name').trim().not().isEmpty(),
    expressValidator.check('email').isEmail().withMessage('Invalid Email').custom((value, {
        req
    }) => {
        return User.findOne({
            email: value
        })
            .then(userDoc => {
                if (userDoc) {
                    return Promise.reject('Email already exists');
                }
            })
    }).normalizeEmail(),
    expressValidator.check('password').trim().isLength({
        min: 5
    })
],);

//USER LOGIN
router.post('/user/login',[expressValidator.check('email').isEmail().normalizeEmail()],);

//CHEF SIGNUP
router.put('/chef/signup',[
    expressValidator.check('name').trim().not().isEmpty(),
    expressValidator.check('email').isEmail().withMessage('Invalid Email').custom((value, {
        req
    }) => {
        return Chef.findOne({
            email: value
        })
            .then(chefDoc => {
                if (chefDoc) {
                    return Promise.reject('Email already exists');
                }
            })
    }).normalizeEmail(),
    expressValidator.check('password').trim().isLength({
        min: 5
    })
],);

//CHEF LOGIN
router.post('/chef/login',[expressValidator.check('email').isEmail().normalizeEmail()],);

