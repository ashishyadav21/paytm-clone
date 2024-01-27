var express = require('express');
var router = express.Router();
const { default: mongoose } = require('mongoose');
const { z, string } = require('zod');
const { accountSchema, Account } = require('../model/User');
const { makeATransaction } = require('../controller/transactionController');


const validatSchemaForTransfer = z.object({
    to: z.string(),
    amount: z.number()
})


const validateTransferSchema = (req, res, next) => {
    try {
        const transfer = validatSchemaForTransfer.parse(req.body)
        req.validateTransfer = transfer;
        next();
    } catch (error) {
        res.status(400).json({ error: error.errors });
    }
}




router.get('/balance/:userId', async (req, res) => {
    try {

        const id = req.params.userId

        const account = await Account.findOne({
            userId: id
        })

        res.status(200).json({ balance: account.balance })
    } catch (error) {
        console.log("error ---?", error)
    }
})



router.post('/transfer', validateTransferSchema, makeATransaction)


module.exports = router;