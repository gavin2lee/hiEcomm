var express = require('express');
var app = express();

app.get('/',function(req, res){
  res.send('Simple Application');
});

app.listen(8090);
