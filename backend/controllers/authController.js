const User = require("../models/User");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
exports.register = async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        const token = jwt.sign({ userId: user._id }, process.env.SECRET);
        res.status(200).json({
            status: 'success',
            data: {
                userName: user.name,
                token
            }
        });
    } catch (error) {
        next(error);
    }
}

exports.login = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            // Error: email is not correct
            const err = new Error('Email is not found');
            err.statusCode = 400;
            return next(err);
        }
        if (bcrypt.compareSync(req.body.password, user.password)) {
            const token = jwt.sign({ userId: user._id }, process.env.SECRET);
            res.status(200).json({
                status: 'success',
                data: {
                    userName: user.name,
                    token
                }
            });
        } else {
            // ERROR: password is not correct
            const err = new Error('Password is not correct');
            err.statusCode = 400;
            return next(err);
        }
    } catch (error) {
        res.json(error);
    }
}

exports.getCurrentUser = async (req,res,next)=> {
    try {
        const data = {user : null};
        if (req.user) {
            const user = await User.findById(req.user.userId);
            data.user = {userName:user.name};
        }
        res.status(200).json({
            status: 'success',
            data: data
        })
    } catch (error) {
        res.json(error);
    }
}