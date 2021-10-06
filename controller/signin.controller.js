'use strict'
const base64 = require('base-64');
const { students } = require('../models/index');

module.exports=async (req,res)=>{
    if (!req.headers.authorization) { return _authError(); }

      let basic = req.headers.authorization.split(' ').pop();
      let [user, pass] = base64.decode(basic).split(':'); 
      try {
        req.user = await students.authenticateBasic(user, pass);
        const users = {
            student: req.user
          };
        res.status(200).json(users);
      } catch (e) {
        _authError()
      }

      function _authError() {
        res.status(403).send('Invalid Login');
      }
}