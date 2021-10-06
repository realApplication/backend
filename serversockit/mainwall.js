'use strict';
require('dotenv').config();
const client = require('socket.io-client');

const host = process.env.HOST || "http://localhost:7896"
// "https://jameeey.herokuapp.com";
const socket = client.connect(host);

socket.on('mainwall',data=>{
  console.log('main wall data --->',data);
  console.log('will be class in', data.className, 'The volunter will be ' ,data.volunteerName,
 'Number of student ', data.studentNum ,'  at : (', data.time,  ')   Wellcome students .....')
});