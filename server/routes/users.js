var express = require('express');
var router = express.Router();
const { z } = require('zod')

const { registerUser, signin, getUserDetail } = require('../controller/userController')

const createUserValidator = z.object({
  username: z.string(),
  password: z.string(),
  name: z.string(),
  phoneNumber: z.number(),
  email: z.string()
});

const signInUserValidator = z.object({
  password: z.string(),
  phoneNumber: z.number(),
  username: z.string()
});


// Middleware for validating user schema
const validateCreateUserSchema = (req, res, next) => {
  try {
    const user = createUserValidator.parse(req.body);
    req.validatedUser = user;
    next();
  } catch (error) {
    res.status(400).json({ error: error.errors });
  }
};

const validateLoginUserSchema = (req, res, next) => {
  try {
    const user = signInUserValidator.parse(req.body);
    req.validatedUser = user;
    next();
  } catch (error) {
    res.status(400).json({ error: error.errors });
  }
};


/*  Below both method are okay, both have same functioning with diff syntax */
router.route('/signup').post(validateCreateUserSchema, registerUser)

router.post('/signin', validateLoginUserSchema, signin)

router.get('/:username', getUserDetail)


module.exports = router;
