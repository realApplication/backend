'use strict';
const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors');

app.use(cors( {     origin: "*",     methods: ["GET", "POST"],     credentials: true   }));
const studentRout = require('./routes/student.rout');
const supervisorRout = require('./routes/supervisor.rout');
const errorHandler = require('./error-handlers/500');
const notFound = require('./error-handlers/404');
const booksRout = require('./routes/books.rout');

app.get('/', (req, res) => { res.send("hello world");});

app.use(express.urlencoded({ extended: true }));
app.use(studentRout);
app.use(supervisorRout);
app.use(booksRout);
app.use(errorHandler);
app.use(notFound);

const start=(port)=>{
    app.listen(port,()=>console.log(`listining to port :  ${port}` ))
}

module.exports={
    start:start,
    app:app
};


