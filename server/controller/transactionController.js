
var express = require('express');
var router = express.Router();
const { default: mongoose } = require('mongoose');
const { Account } = require('../model/User');

exports.makeATransaction = async (req, res) => {
    try {
        const session = await mongoose.startSession();
        session.startTransaction();


        const userId = '65b4aa1e0ac20224b84c7055'
        const validateTransferData = req.validateTransfer;
        const { amount, to } = validateTransferData;

        // Fetch the account details of the sender.
        const senderAmount = await Account.findOne({ userId: userId }).session(session);

        if (!senderAmount || senderAmount.balance < amount) {
            await session.abortTransaction();
            return res.json({ "message": 'you does not have sufficient balance.' })
        }

        const receiverAmount = await Account.findOne({ userId: to }).session(session);

        if (!receiverAmount) {
            await session.abortTransaction();
            return res.status(200).json({ "message": "Invalid Account" })
        }

        await Account.updateOne({ userId: userId }, { $inc: { balance: -amount } }).session(session);
        await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

        // Commit the transaction
        await session.commitTransaction();

        res.json({ "message": 'transaction completed success' })
    } catch (error) {
        console.log("error- --->", error)
    }

}
