'use strict'
const express = require('express');
const router = express.Router();


// const signin = require('../controller/signin.controller')
const signup = require('../controller/signup.controller');
const basicAuth = require('../middleware/basicAuth');
const bearerAuth = require('../middleware/bearerAuth');
const {students}  = require('../models/index');

router.post('/signin', basicAuth(students), (req, res, next)=> {
    console.log("ssssssssssssssss")
    res.status(200).json(req.user);
});

// router.post('/signin',basicAuth)
router.post('/signup',signup)
module.exports = router;