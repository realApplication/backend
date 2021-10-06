'use strict'
const express = require('express');
const basicAuth = require('../middleware/basicAuth');

const router = express.Router();
const { supervisorTest}= require('../models/index')
const { 
    addRoom,
    deleteRoom,
    getRoom } = require('../controller/super.controller');
 
//const signin = require('../controller/signinsupervisor')
const signup = require('../controller/signupsupervisor')

router.post('/v1/signup',signup)
router.post('/v1/signin',basicAuth( supervisorTest), (req, res, next) => {    res.status(200).json(req.user);});

router.get('/v1/data/:id', getRoom);
router.get('/v1/data', getRoom);
router.post('/v1/data',addRoom );
router.delete('/v1/data/:id', deleteRoom );

module.exports = router;