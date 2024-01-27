const express = require('express');
const mongoose = require('mongoose');
const { z } = require('zod')

require('dotenv').config()

const router = express.Router();
const { OtpSchhema } = require('../model/User')

const twilio = require('twilio');
// Twilio credentials (replace with your own credentials)
const accountSid = 'ACfd6d56eeb0a81cf0d135fc14ffa4ee37';
const twilioPhoneNumber = '+12403293864';
const client = twilio(accountSid, process.env.authToken);


const Otp = mongoose.model("otpInfo", OtpSchhema)

const otpValidator = z.object({
    phoneNumber: z.string(),
    email: z.string(),
    password: z.string() || z.number()
});


const validateOtpSchema = (req, res, next) => {
    try {
        const response = otpValidator.parse(req.body);
        req.otpValidate = response;
        next();
    } catch (error) {
        res.status(400).json({ error: error.errors });
    }
};

// Route for generating and sending OTP
router.post('/send-otp', validateOtpSchema, (req, res) => {
    try {
        const { phoneNumber } = req.body;

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpStore = new Otp({ ...req.otpValidate, otp });

        otpStore.save();
        client.messages.create({
            body: `Your OTP is: ${otp}`,
            from: twilioPhoneNumber,
            to: phoneNumber,
        });

        res.status(200).json({ message: 'OTP sent successfully', phoneNumber: phoneNumber });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route for verifying OTP
router.post('/otp-verify', async (req, res) => {
    try {
        const { phoneNumber, otp } = req.body;
        const userDetail = await Otp.findOne({ phoneNumber: phoneNumber })

        if (!userDetail) {
            return res.status(400).json({ error: 'OTP not found. Please generate OTP first.' });
        }

        if (otp == userDetail.otp) {
            await Otp.deleteOne({ phoneNumber: phoneNumber });
            res.status(200).json({ message: 'OTP verified successfully', validate: true, user: userDetail });
        } else {
            res.status(400).json({ error: 'Invalid OTP' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;