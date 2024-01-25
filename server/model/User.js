const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    username: String,
    email: String,
    password: {
        type: String,
    },
    phoneNumber: Number,
});

const OtpSchhema = new mongoose.Schema({
    phoneNumber: Number,
    otp: String
})

module.exports = { UserSchema, OtpSchhema }