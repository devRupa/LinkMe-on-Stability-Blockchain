const express = require('express');
const app = express();
const port = 3000;

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const path = require('path');
const fs = require('fs');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
global.__basedir = __dirname;

const homeRoute=require('./routes/homeRoute');
app.use('/',homeRoute);

app.listen(3000, (err, res) => {
  console.log('Server running on ' + port);
})