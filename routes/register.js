'use strict'

module.exports = function(app){
  app.get('/register', function(req,res){
    res.render('register');
  });

  app.post('/register', function(req, res){
    var User = global.dbHelper.getModel('user');
    console.log(req.body);
    var uname = req.body.username;

    User.findOne({name:uname}, function(error,doc){
      if(doc){
        req.session.error = '用户名已存在！';
        res.sendStatus(500);
      }else{
        User.create({
          name:uname,
          password:req.body.password
        },function(){
          if(error){
            res.sendStatus(500);
          }else{
            req.session.error = '用户名创建成功！';
            res.sendStatus(200);
          }
        });
      }
    });
  });
};
