'use strict'
const { students } = require('../models/index');

module.exports=async (req,res)=>{
    try {
        let studenData = await students.create(req.body);
        const output = {
          student: studenData 
        };
        res.status(201).json(output);
      } catch (e) {
        _authError()
      }
      function _authError() {
        res.status(403).send('Invalid SignUp');
      }
}