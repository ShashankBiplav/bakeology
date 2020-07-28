const express = require('express');

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.listen(5500, ()=>{
    console.log('listening on port:5500');
});