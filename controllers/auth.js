const expressValidator =require('express-validator');

const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

const Chef = require('../models/chef');

const User = require('../models/user');

const Administrator = require('../models/administrator');

exports.userSignup = async (req, res, next)=>{
    const errors = expressValidator.validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        error.data = errors.array();
        return next(error);
    }
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const preExistingUser = await User.findOne({email: email});
    if (preExistingUser){
        const error = new Error('User with this email already exists');
        error.statusCode = 401;
        return next(error);
    }
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

exports.chefSignup = async (req, res, next) => {
    const errors = expressValidator.validationResult(req);
    if (!errors.isEmpty()){
        const error = new Error('Validation Failed');
        error.statusCode = 422;
        error.data = errors.array();
        return next(error);
    }
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const profileImageUrl = req.body.profileImageUrl; //TODO: req.file.path
    const preExistingChef = await Chef.findOne({email: email});
    if (preExistingChef){
        const error = new Error('Chef with this email already exists');
        error.statusCode = 422;
        return next(error);
    }
    try {
        const hashedPwd = await bcrypt.hash(password, 12);
        const user = new Chef({
            email: email,
            password: hashedPwd,
            name: name,
            profileImageUrl: profileImageUrl
        });
        const result = await user.save();
        res.status(201).json({
            message: 'User Created',
            userId: result._id
        });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.cheflogin =async(req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedChef;
    try {
        const chef = await Chef.findOne({email: email});
        if (!chef){
            const error = new Error('Chef with this email doesn\'t exist');
            error.statusCode = 401;
            throw error;
        }
        loadedChef = chef;
        const isPwdEqual = await bcrypt.compare(password, chef.password);
        if (!isPwdEqual){
            const error = new Error('Wrong Password');
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign({
            email: loadedChef.email,
            userId: loadedChef._id.toString()
        },'yoursuperdupersecretkeythatisknownonlytoyouandtheserver',{
            expiresIn: '24h'
        });
        res.status(200).json({
            token: token,
            userId: loadedChef._id.toString()
        });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.administratorSignup = async (req, res, next) =>{
    const errors = expressValidator.validationResult(req);
    if (!errors.isEmpty()){
        const error = new Error('Validation Failed');
        error.statusCode = 422;
        error.data = errors.array();
        return next(error);
    }
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const preExistingAdmin = await Administrator.findOne({email: email});
    if (preExistingAdmin){
        const error = new Error('Admin with this email already exists');
        error.statusCode = 422;
        return next(error);
    }
    try {
        const hashedPwd = await bcrypt.hash(password, 12);
        const admin = new Administrator({
            email: email,
            password: hashedPwd,
            name: name
        });
        const result = await admin.save();
        res.status(201).json({
            message: 'Admin Created',
            userId: result._id
        });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.administratorLogin = async (req, res, next) =>{
    const email = req.body.email;
    const password = req.body.password;
    let loadedAdmin;
    try {
        const admin = await Administrator.findOne({email: email});
        if (!admin){
            const error = new Error('Admin with this email doesn\'t exist');
            error.statusCode = 401;
            throw error;
        }
        loadedAdmin = admin;
        const isPwdEqual = await bcrypt.compare(password, admin.password);
        if (!isPwdEqual){
            const error = new Error('Wrong Password');
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign({
            email: loadedAdmin.email,
            userId: loadedAdmin._id.toString()
        },'yoursuperdupersecretkeythatisknownonlytoyouandtheserver',{
            expiresIn: '24h'
        });
        res.status(200).json({
            token: token,
            userId: loadedAdmin._id.toString()
        });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};