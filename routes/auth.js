const express = require('express');

const expressValidator = require('express-validator');

const isAuth = require('../middleware/is-auth');

const authController = require('../controllers/auth');

const router = express.Router();

//USER SIGN UP
router.post('/user/signup',[
    expressValidator.check('name').trim().not().isEmpty(),
    expressValidator.check('email').isEmail().withMessage('Invalid Email').normalizeEmail(),
    expressValidator.check('password').trim().isLength({
        min: 5
    })
], authController.userSignup);

//USER LOGIN
router.post('/user/login',
    [expressValidator.check('email').isEmail().normalizeEmail()],
    authController.userLogin);

//CHEF SIGNUP
router.post('/chef/signup',[
    expressValidator.check('name').trim().not().isEmpty(),
    expressValidator.check('email').isEmail().withMessage('Invalid Email').normalizeEmail(),
    expressValidator.check('password').trim().isLength({
        min: 5
    })
], authController.chefSignup);

//CHEF LOGIN
router.post('/chef/login',
    [expressValidator.check('email').isEmail().normalizeEmail()],
    authController.cheflogin);

module.exports = router;