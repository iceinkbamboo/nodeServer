//引入需求模块
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var app = express();
//设置跨域访问
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  res.header('Access-Control-Allow-Headers', 'Content-Type');//添加此header解决，post请求报错Request header field Content-Type is not allowed by Access-Control-Allow-Headers in preflight response.
  next();
});
//处理post请求
// for parsing application/json
app.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));//当为false时，无法post(nested object) 嵌套对象

//查询商品基础信息接口
app.get('/user', function(req, res) {
  connection.query("select * from user",
    function(error, results, fields) {
      console.log(req.query.type); //接收get传参
      if (error) {
        res.send(error);
        return;
      } else {
        res.send(results)
      }
  });
})

//已完成试卷
app.get('/complete', function(req, res) {
  connection.query("select c.*,a.examtype from exam a,topic_complete c where c.examid in(select examid from exam where examtype='1') and a.examid=c.examid order by topicid",
    function(error, results, fields) {
      if (error) {
        res.send(error);
        return;
      } else {
        res.send(results)
      }
  });
})

//获取试卷
app.post('/exam', function(req, res) {
  connection.query("select * from topic where examid = " + req.body.examid,
    function(error, results, fields) {
      console.log(req.body);//接收post传参
      if (error) {
        res.send(error);
        return;
      } else {
        res.send(results)
      }
  });
})

//获取试卷id集
app.get('/examid', function(req, res) {
  connection.query("select examid from exam order by examid desc",
    function(error, results, fields) {
      if (error) {
        res.send(error);
        return;
      } else {
        console.log(results.data);
        var obj = {};
        var arr = [];
        for(var i = 0; i < results.length; i++){
          console.log(results[i].examid);
          arr.push(results[i].examid);
        }
        console.log(arr);
        obj = {
          "examid": arr
        }
        res.send(obj)
      }
  });
})

//获取结果
app.post('/result', function(req, res) {
  connection.query("select * from topic_complete where examid = " + req.body.examid,
  function(error, results, fields) {
    console.log(req.body);//接收post传参
    if (error) {
      res.send(error);
      return;
    } else {
      res.send(results)
    }
  });
})

//登录接口
app.post('/login', function (req, res) {
  connection.query("select name from user where name='" + req.body.name + "' and password = '" + req.body.password + "'",
  function (error, results, fields) {
    if(error){
      var obj = {
        stat: 0
      }
      res.send(obj);
      return;
    }else{
      if(results.length != 0){
        var obj = {
          stat: 1
        }
      }else{
        var obj = {
          stat: 0
        }
      }
      res.send(obj);
    }
  })
})

// 创建连接
var connection = mysql.createConnection({
host: 'localhost',
user: 'root',
password: 'zhsh217218',
database: 'english',
});
app.listen(3000);
console.log('server port: 3000');