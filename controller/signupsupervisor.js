'use strict'

const { supervisorTest } = require('../models/index');
module.exports=async (req,res)=>{
    try {
        let studenData = await  supervisorTest.create(req.body);
        const output = {
          supervisor: studenData 
        };
        res.status(201).json(output);
      } catch (e) {
        _authError()
      }
      function _authError() {
        res.status(403).send('Invalid SignUp');
      }
}