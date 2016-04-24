'use strict'
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var multer = require('multer');
var session = require('express-session');

var mongoose = require('mongoose');

global.dbHelper = require('./common/dbHelper');

app.set('view engine', 'html');
app.engine('.html', require('ejs').__express);

app.set('views', require('path').join(__dirname, 'views'));
app.use(express.static(require('path').join(__dirname, 'public')));

mongoose.connect('mongodb://127.0.0.1:27017/test');

app.use(session({
  secret: 'secret',
  cookie:{
    maxAge:1000*60*30
  }
}));

app.use(function(req,res,next){
  res.locals.user = req.session.user;
  var err = req.session.error;
  res.locals.message = '';

  if(err){
    res.locals.message = '<div class="alert alert-danger" style="margin-bottom: 20px;color:red;">' + err + '</div>';
  }

  next();
});

require('./routes')(app);

app.get('/', function(req, res){
  //res.send('Hello Ecomm');
  res.render('register');
});

app.listen(8090);
