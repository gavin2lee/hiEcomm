'use strict'

const express = require('express');
const http = require('http');
const https = require('https');

const app = express();

const httpPort = 8090;
const httpsPort = 8091;


app.get('/', function(req, res){
  res.send('Home Page');
});

//TODO:need ssl certificates , pending here
//https.createServer(app).listen(httpsPort);

http.createServer(app).listen(httpPort);
