'use strict';

require('dotenv').config();
const client = require('socket.io-client');

const host = process.env.HOST || "https://jameeey.herokuapp.com";
const socket = client.connect(host);
const {superSchema}= require('../models/index')

socket.on('supervisor' , async(data)=>{
    let ranId = Math.floor(Math.random() * 4);
    let counterData = await superSchema.findOne({where:{id:ranId}})
    console.log('counterData-------->',counterData);
    console.log('counterData----dataValues---->',counterData.dataValues);

     let classdata ={
         volunteerName : data.name.student,
         studentNum : data.studentsNum,
         className:counterData.dataValues.classroom,
         time:data.time,
         bookNameID:data.name.bookid
     }
    socket.emit('classRoom', classdata )
} );


