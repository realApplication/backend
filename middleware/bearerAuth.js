'use strict';

const { students } = require('../models/index')

module.exports = async (req, res, next) => {

  try {

    if (!req.headers.authorization) { _authError() }
    console.log("HEADERS--------------->" , req.headers)
    const token = req.headers.authorization.split(' ').pop();
    console.log("----------###########----->", token)
    const validUser = await students.authenticateToken(token);
  
    req.user = validUser;
    console.log(req.user);
    req.token = validUser.token;
    // req.userId=validUser.id;
    req.userId=parseInt(validUser.id);
    next();

  } catch (e) {
    console.log(e);
    _authError();
  }

  function _authError() {
    next('Invalid Login');
  }
}