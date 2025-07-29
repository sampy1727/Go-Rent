const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const AppError = require('../utils/appError');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

exports.registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return next(new AppError('Please provide all fields', 400));
        }
        const userExists = await User.findOne({ email });
        if (userExists) {
            return next(new AppError('User already exists', 400));
        }
        const user = await User.create({ name, email, password });
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } catch (err) {
        next(err);
    }
};

exports.loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        } else {
            return next(new AppError('Invalid email or password', 401));
        }
    } catch (err) {
        next(err);
    }
};

exports.getProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (!user) {
            return next(new AppError('User not found', 404));
        }
        res.json(user);
    } catch (err) {
        next(err);
    }
};
