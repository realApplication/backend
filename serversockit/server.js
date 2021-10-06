'use strict';
const express = require("express");
require("dotenv").config();
const app = express();
const cors = require('cors');
const http = require('http').createServer(app)
const io = require("socket.io")(http, {   cors: {     origin: "*",     methods: ["GET", "POST"],     credentials: true   } });
// const io = require('socket.io')(7893)
const port=process.env.PORT || 7893;
// const io = require('socket.io')(7893)

const {setCounter,getCounter} = require('./conuterbook')
app.use(cors());

let date = new Date();
let day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
let time = date.toLocaleTimeString()

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

io.on('connection', socket => {
  console.log("CONNECTED", socket.id)

  socket.on('helpstudent',async payload => {
    console.log('event', {
      event: 'ask for help ....... ',
      payload: payload
    });
  
    let getcounter = await getCounter(payload.bookId)
    
    let count = parseInt(getcounter);
    count+=1;
    console.log(payload.bookId);
    console.log(count);
    await setCounter(payload.bookId,count);
  });

  socket.on('volunteerdata', async(payload) => {
    console.log('event', {
      event: 'pickup',
      time: `day: ${day} Time :${time}`,
      payload: payload
    });
    console.log('payload.bookId----------->',payload);
    let getcounter = await getCounter(payload.bookid)
    let getcount = parseInt(getcounter)
    let recervedata = {
      name:payload,
      studentsNum : getcount,
      bookId:payload.bookid,
      time :`day: ${day} Time :${time}`
    }
    console.log('recervedata------------->',payload);
    if(getcount>=5)
       {
         io.emit('supervisor', recervedata)
       }      
  });

  socket.on('classRoom',data=>{
    io.emit('mainwall',data)
  })

});
// http.listen(port, function() {
//   console.log(`listening on port ${port}`)
// })



