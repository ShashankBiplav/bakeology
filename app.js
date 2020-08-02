const express = require('express');

const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const app = express();

require('dotenv').config();

const port = process.env.PORT|| 5500;

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

mongoose.connect(process.env.MONGODB_URI,{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
    .then(()=>{
        console.log('Connection to DB');
         app.listen(port, ()=>{
            console.log(`listening on port${port}`);
        });
    }).catch(err=>{
    console.log(err);
});