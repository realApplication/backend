'use strict';

require('dotenv').config();

const client = require('socket.io-client');
const host = "https://jameeey.herokuapp.com"
//process.env.HOST || "http://localhost:7896"
//"https://jameeey.herokuapp.com";
const socket = client.connect(host);
const {students}=require('../models/index');
const {pickedSchema}=require('../models/index')

const handleVolunteer= async (req , res)=>{

 
     try { let id=req.userId;
      let Record= await students.findOne({where:{id:id}});
      let name=Record.dataValues.userName;
      let volunteerpicked= await pickedSchema.findOne({where:{userId:id}});
      let bookid = volunteerpicked.dataValues.id;
    let UserData=
    {
        student:name,
        id:id,
        role:'volunteer',
        bookid:bookid
    };
    socket.emit('volunteerdata' , UserData);
   res.json(`Thank ${UserData.student} for volunteering `);
  }
  catch(err){
    res.status(200).json('Welcome volunteer : Please you need to pick book first .. Thank you ')
  }
 
    
} 

module.exports=handleVolunteer;

