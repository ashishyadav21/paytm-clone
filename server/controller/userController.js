

const mongoose = require('mongoose');
const { z } = require('zod')
var jwt = require('jsonwebtoken');

const { UserSchema } = require('../model/User')
const User = mongoose.model("User", UserSchema);

const createUserValidator = z.object({
    username: z.string(),
    password: z.string(),
    name: z.string(),
    phoneNumber: z.number(),
    email: z.string()
});



exports.registerUser = async (req, res) => {
    const user = new User(req.validatedUser);

    const existingUser = await User.findOne({ phoneNumber: user.phoneNumber })
    if (existingUser) {
        return res.status(400).send('User already exist.')
    }
    const savedUser = await user.save();

    res.json({ 'msg': 'user created successfully', data: savedUser })
}

exports.signin = async (req, res) => {
    const user = new User(req.validatedUser);

    const existingUser = await User.findOne({ phoneNumber: user.phoneNumber });

    const token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
        username: existingUser.username,
    },
        process.env.JWT_SECRET);

    if (user.password === existingUser.password) {
        res.status(200).json({
            "result": {
                token,
                user: existingUser,
                message: 'User Login successfully.'
            }
        })
    } else {
        res.status(200).json({
            "message": "username or password is not correct"
        })
    }

}

exports.getUserDetail = async (req, res) => {
    const username = req.params.username

    const token = req.header("x-auth-token");

    if (!token)
        return res.status(401).json({
            success: false,
            result: null,
            message: "No authentication token, authorization denied.",
            jwtExpired: true,
        });


    const verified = jwt.verify(token, process.env.JWT_SECRET)

    if (!verified)
        return res.status(401).json({
            success: false,
            result: null,
            message: "Token verification failed, authorization denied.",
            jwtExpired: true,
        });

    const user = await User.findOne({ username: username })
    if (!user) {
        return res.status(404).json({ message: 'User not found', success: false });
    }

    res.status(200).json({ message: "User found successfully", user })
}