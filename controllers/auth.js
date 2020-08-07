const expressValidator =require('express-validator');

const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

const Chef = require('../models/chef');

const User = require('../models/user');

exports.userSignup = async (req, res, next)=>{
    const errors = expressValidator.validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    try {
        const hashedPwd = await bcrypt.hash(password, 12);
        const user = new User({
            email: email,
            password: hashedPwd,
            name: name
        });
        const result = await user.save();
        res.status(201).json({
            message: 'User Created',
            userId: result._id
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.userLogin = async (req, res, next) =>{
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    try {
        const user = await User.findOne({email: email});
        if (!user){
            const error = new Error('User with this email doesn\'t exist');
            error.statusCode = 401;
            throw error;
        }
        loadedUser = user;
        const isPwdEqual = await bcrypt.compare(password, user.password);
        if (!isPwdEqual){
            const error = new Error('Wrong Password');
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign({
            email: loadedUser.email,
            userId: loadedUser._id.toString()
        },'yoursuperdupersecretkeythatisknownonlytoyouandtheserver',{
            expiresIn: '24h'
        });
        res.status(200).json({
            token: token,
            userId: loadedUser._id.toString()
        });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};