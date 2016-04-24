功能介绍
1. 用户可以完成注册、登录然后登录后对商品的浏览。

2. 登录之后，用户可以对相关商品进行选购并添加到购物车。

3. 用户可以对购物车里面的商品进行增加、减少、删除操作。

4. 用户可对购物车商品进行结算操作。

技术选型
本项目涉及使用到NodeJS、Express框架、MongoDB数据库、Mongoose对象模型库，详细介绍如下：

NodeJS：Node.js采用Google Chrome浏览器的V8引擎，一个后端的Javascript运行环境，提供很多系统级的API，如文件操作、网络编程等。

MongoDB：MongoDB是一个基于分布式文件存储的一个高性能，开源，无模式的文档型数据库，数据以BSON文档的格式存储在磁盘上。

Express：一个简洁、灵活的基于Node.js的Web应用开发框架, 支持Ejs、jade等多种模板，并且提供一系列强大的功能，比如：模板解析、静态文件服务、中间件、路由控制等等。

Mongoose：一个针对MongoDB操作的对象模型库，封装了MongoDB对文档的的一些增删改查等常用方法。

结构划分
项目主要分为以下几大模块：注册模块，登录模块，商品模块、购物车模块、结算模块。

1. 用户注册模块：填写用户名、密码、确认密码后，实现成功注册，然后进行登录。

2. 用户登录模块：填写已注册的用户名称，填写正确的密码，进入商品展示页面。

3. 商品模块：用户选择相关产品加入购物车。

4. 购物车模块：对相关商品进行增加、减少、删除操作。

5. 结算模块：对购物车内已选择商品进行结算。

流程设计
此流程图显示用户可以进行登录和注册操作，如果用户已经注册，则可以直接登录，若未注册则必须先注册成功后才能进行登录，登录成功后可以进入商品页浏览商品，也可以选择相关商品并可加入购物车，在购物车页面内可以对购物车商品进行相关操作，最后结选择相关商品进行结算。

数据库介绍
数据库的使用呢，我们这里选择了MongoDB。

MongoDB的简单介绍如下：

MongoDB是一个开源的NoSQL数据库，相比MySQL那样的关系型数据库，它更显得轻巧、灵活， 非常适合在数据规模很大、事务性不强的场合下使用。同时它也是一个对象数据库，没有表、行等概念，也没有固定的模式和结构，所有的数据以文档的形式存储，数据格式就是JSON。

MongoDB —— 是一个对象数据库，没有表、行等概念，也没有固定的模式和结构，所有的数据以Document(以下简称文档)的形式存储(Document，就是一个关联数组式的对象，它的内部由属性组成，一个属性对应的值可能是一个数、字符串、日期、数组，甚至是一个嵌套的文档。)

我们一共要创建三个集合，分别是user(用户)集合、commodity(商品)集合、cart(购物车)集合，后面我们会一一介绍。
数据库介绍
数据库的使用呢，我们这里选择了MongoDB。

MongoDB的简单介绍如下：

MongoDB是一个开源的NoSQL数据库，相比MySQL那样的关系型数据库，它更显得轻巧、灵活， 非常适合在数据规模很大、事务性不强的场合下使用。同时它也是一个对象数据库，没有表、行等概念，也没有固定的模式和结构，所有的数据以文档的形式存储，数据格式就是JSON。

MongoDB —— 是一个对象数据库，没有表、行等概念，也没有固定的模式和结构，所有的数据以Document(以下简称文档)的形式存储(Document，就是一个关联数组式的对象，它的内部由属性组成，一个属性对应的值可能是一个数、字符串、日期、数组，甚至是一个嵌套的文档。)

我们一共要创建三个集合，分别是user(用户)集合、commodity(商品)集合、cart(购物车)集合，后面我们会一一介绍。
user集合属性值展示
关于user集合，我们设计的属性有name(用户名)、password(密码)， 如下所示：
name:{type:String,required:true},
password:{type:String, required:true}
commodity集合属性值展示
关于commodity集合，我们设计的属性有name(商品名称)、price(商品价格)、imgSrc(商品展示图片路径)， 如下所示：
name:{type:String},
price:{type:Number},
imgSrc:{type:String}

carts集合属性值展示
关于cart集合，我们设计的属性有uId(用户ID)、cId(商品ID)、cName(商品名称)、cPrice(商品价格)、cImgSrc(商品展示图片路径)、cQuantity(商品数量)、cStatus(商品结算状态，未结算为false,已结算为true)， 如下所示：
uId:{type:String},
cId:{type:String},
cName:{type:String},
cPrice:{type:String},
cImgID:{type:String},
cQuantity:{type:Number},
cStatus:{type:Boolean,default:false}
注册模块功能设计介绍
功能：本模块主要用于新用户注册，用户通过表单提供用户名和密码信息，系统根据用户提供的注册信息对用户进行具体操作。

输入操作：用户名、密码、确认密码。

对应处理：

1. 输入注册信息：在页面提供的表单处输入用户的用户名和密码信息，点击“注册”按钮提交表单数据信息。已注册用户，可点击“登录”按钮，进入登录页面。

(2) 用户注册身份验证：连接数据库，以输入的“用户名”数据为查询条件来查看输入用户名是否已存在，如果用户名未注册，则提示注册成功并转到登录页进行登录，如果用户已注册，则给出用户已存在提示并重新注册。
登录模块设计与实现
功能：本模块主要用于对用户身份进行鉴别。用户通过表单提供用户名和密码信息，系统根据用户提供的登录信息对用户进行查询鉴别。 如果身份合法，则用户可进入商品页面。

输入操作：用户名、密码。

对应处理：

1. 输入用户的登录信息：在页面提供的表单处输入用户的用户名和密码信息，点击“登录”按钮提交表单数据信息。 也可点击“注册”按钮，注册新用户。

2. 用户身份进行验证：连接数据库，打开user集合，检验用户登录信息。以输入的“用户名”数据为查询条件来查看用户是否存在，如果存在，继续检验其输入密码是否正确，密码和用户名都正确，则进入商品展示页面；如果用户名不存在或密码不正确，则给出相应的提示。
商品页面介绍
商品页呢，我们主要要来展示商品，用户登录成功之后将会跳入商品页，可对所有商品进行查看， 每个商品信息的内容包括：商品名称、商品图片、商品价格，用户可浏览也可将其加入购物车。
商品页面介绍
关于购物车页面，主要展示用户已购买的商品，包括商品的信息、价格、数量，当然用户可以对其中商品进行增加、减少、删除操作，最后，用户可选择对其中商品进行结算，选择结算后，会提示相应的付款金额。


简单启动
首先呢，我们先新建一个项目工程目录，然后在目录下创建启动文件app.js，开始我们的第一步。

这里我们会用到Express框架来实现相关功能，所以，需要先安装它，具体安装方法这里就不在做介绍了。

在启动文件添加如下内容，来测试Express框架是否引用成功。

var express = require('express');
var app = express();
app.get('/', function (req, res) {  
   res.send('Hello World!');
});

app.listen(80);
浏览器查看结果，如收到响应信息则表明我们项目的第一步已经成功搞定。


创建目录
项目已经启动成功，下面我们开始创建相关目录，用于存储不同的文件。

说明：右侧栏"文件管理"中可添加相应目录和文件。

1. public目录：存放静态文件。

2. routes目录：存放路由文件。

3. views目录： 存放页面文件。

4. common目录：存放公共文件。

5. public目录(可不选)，新建javascripts、stylesheets、images三个目录用以存储js、css、img相关文件。

这里我们内置了一些js、css文件来实现简单页面样式和操作，在页面视图中直接使用即可，引用方法如下：

<link href="example/css/bootstrap.min.css" rel="stylesheet" >

<script src="example/js/jquery.min.js" type="text/javascript"></script>

<script src="example/js/bootstrap.min.js" type="text/javascript"></script>


添加文件
有了目录，我们开始添加文件，先来添加一个登录页面register.html，便于管理和开发我们统一把视图页面放到views目录下。

views目录，添加register.html注册视图页
有了视图页面，我们就可以访问它了，那要如何访问呢，这里就要使用到ejs模板了，安装方法不在阐述，直接如下引用：

app.set( 'view engine', 'html' );
app.engine( '.html', require( 'ejs' ).__express );
使用engine函数注册模板引擎并指定处理后缀名为html的文件。

设定视图存放的目录

app.set('views', require('path').join(__dirname, 'views'));
如果是在本地项目中，我们还要指定本地静态资源访问的路径,如下设置：

app.use(express.static(require('path').join(__dirname, 'public')));
访问注册页
有了视图页面，下面我们就开始访问它，app.js文件部分内容，引入相关模块资源，然后简单访问如下：

app.get('/', function (req, res) {
    res.render('register');
});
app.listen(80);
本节启动访问80端口，如成功看到注册页面则表示项目已经运行成功，如未看到，查看相关错误信息，是否缺少相关模块，安装和引用即可。

定义Schema
首先在common目录内添加models.js文件用来保存各个集合的Schema文件(集合属性)，也便于我们查看和访问，具体内容如下所示：

module.exports = {
    user: {
        name: { type: String, required: true },
        password: { type: String, required: true },
        gender: { type: Boolean, default: true }
    }
};
有了集合的Schema文件，如何访问呢，接着我们会介绍如何使用Model模型操作这些属性。

创建公共方法
还是common目录，我们在新建一个公共方法 —— dbHelper.js文件，来操作这些Schema，因为后面还会涉及此问题，所以我们写成一个公共的方法，dbHelper文件内容如下：

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    models = require('./models');

for(var m in models) {
    mongoose.model(m, new Schema(models[m]));
}
module.exports = {
    getModel: function (type) {
        return _getModel(type);
    }
};
var _getModel = function (type) {
    return mongoose.model(type);
};
如上所示我们通过getModel可获取集合的Model模型就可以对数据库有实质性的操作了

关于Model，简单介绍：由Schema构造生成的模型，具有数据库操作的行为。

添加函数
关于dbHelper.js文件里方法的访问很简单，如下所示：

global.dbHelper = require( './common/dbHelper' );
这里我们使用global来定义全局变量dbHelper，那么dbHelper就可以在任何模块内调用了。

然后我们就开始修改register视图页面，添加单击事件，例如：

<input type="button"  onclick="register()" value="注 册" />
对应register()函数，大致如下：

function register(){
   //通过serialize()方法进行序列化表单值，创建文本字符串。
   var data = $("form").serialize();
   //例如："username=张三&password=12345"
   $.ajax({
       url:'/register',
       type:'POST',
       data:data,
       success:function(data,status){
           if(status == 'success'){
               location.href='register';
           }
       },
       error:function(res,err){
           location.href='register';
       }
   });
}

添加路由
这里我们需要新建一个文件register.js，专门用来处理来之register页面的post请求， 在后面的学习中还会有多个不同处理文件，万所以我们统一管理在routes目录下，在实际开发中我们可能需要针对不同文件请求给出相应文件的处理，所以我们就做分开处理。

这里贴出register.js文件处理get和post请求的相关代码以供参考，如下：

// app：express对象
module.exports = function ( app ) {
  app.get('/register', function(req, res) {
      res.render('register');
  });
  app.post('/register', function (req, res) {
     var User = global.dbHelper.getModel('user'),
     uname = req.body.uname;
     User.findOne({name: uname}, function (error, doc) {
       if (doc) {
            req.session.error = '用户名已存在！';
            res.send(500);
        } else {
            User.create({
                name: uname,
                password: req.body.upwd
            }, function (error, doc) {
                if (error) {
                    res.send(500);
                } else {
                    req.session.error = '用户名创建成功！';
                    res.send(200);
                }
            });
        }
    });
  });
}
模块的加载和引用
register的post请求处理中，我们使用了session(express-session模块)还有处理post请求数据的body属性(body-parser和multer模块)，需先安装他们，然后引用即可，如下参考：

<pre>
//引用模块
var bodyParser = require('body-parser');
var multer = require('multer');
var session = require('express-session');

//调用中间件使用
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
后面我们还会再次添加多个路由记录，所以便于管理和访问，我们可以把他们统一放到一起，比如routes目录下新建index.js文件专门用来存放添加的文件，代码如下：

module.exports = function ( app ) {
   require('./register')(app);
};
那么我们在app.js文件中直接引用index.js文件就可以访问这些文件了，如下所示：

require('./routes')(app); //app:express对象。;
