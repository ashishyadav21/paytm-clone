const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    email: String,
    password: {
        type: String,
    },
    phoneNumber: Number,
});

const OtpSchhema = new mongoose.Schema({
    phoneNumber: Number,
    otp: String,
    email: String,
    password: String
})

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});


const User = mongoose.model("User", UserSchema);
const Account = mongoose.model("Account", accountSchema);

module.exports = { UserSchema, OtpSchhema, accountSchema, User, Account }