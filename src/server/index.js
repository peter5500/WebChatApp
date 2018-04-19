let app = require('express')();
//let server = require('http').createServer(app);
//let io = module.exports.io = require('socket.io')(server);
let mongoose = require("mongoose");
let bodyParser = require("body-parser");
let passport = require("passport");
let cookieParser = require("cookie-parser");
let LocalStrategy = require("passport-local");
let flash = require("connect-flash");
let User = require("./models/user");
let session = require("express-session");
const PORT = process.env.PORT || 3231;

mongoose.connect("mongodb://localhost/chat-app");

//io.on('connection', SocketManager);
//app.set('trust proxy', 1);
app.use( bodyParser.json({ extended: true, type: '*/*' }) );
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.all('*', function(req, res, next) {  
  res.header("Access-Control-Allow-Origin", "*");  
  res.header("Access-Control-Allow-Headers", "X-Requested-With");  
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE");  
  res.header("X-Powered-By",' 3.2.1')  
  res.header("Content-Type", "application/json;charset=utf-8");  
  next();  
});

// var Schema = mongoose.Schema;
// //骨架模版
// var movieSchema = new Schema({
//     doctor   : String,
//     title    : String,
//     language : String,
//     country  : String,
//     year     : Number,
//     summary  : String,
//     poster   : String,
//     flash    : String
// })
// //模型
// var Movie = mongoose.model('Movie', movieSchema);
// //存储数据
// var moive = new Movie({
//     title: '黑衣人三',
//     doctor: '史密斯',
//     year: 2018,
//     flash: 'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
//     country: '美国',
//     language: '英语',
//     summary: '好片'
// })
// //保存数据库
// moive.save(function(err) {
//     if (err) {
//         console.log('保存失败')
//         return;
//     }
//     console.log('meow');
// });

// app.get("/asd", (req, res) => {
//   if (passport.authenticate()) {
//     res.send(JSON.stringify({
//       currentUser: {
//         username: passport.user.name,
//         id: passport.user._id
//       }
//     }));
//   } else {
//     res.send(JSON.stringify({
//       currentUser: null,
//     }));
//   }
// });

let chatData = []

isLoggedIn =  function(req, res, next){
  if(req.isAuthenticated()){
      return next();
  }
  req.flash("error", "You must be signed in to do that!");
  res.redirect("/login");
}

app.get('/asd',
  (req, res) => {
    passport.authenticate("local")(req, res, () => {
      req.flash("success", "Successfully Signed Up! Nice to meet you " + req.body.username);
      result.userExist = false;
      result.isSuccessful = true;
      result.currentUser = {
        username: req.user.username,
        id: req.user._id
      }
      res.send(JSON.stringify(result));
   });
  });

app.post("/register", (req, res) => {
  let newUser = new User({username: req.body.username, nickname: req.body.nickname});
  console.log(req.body.username);
  let result = {};
  User.findOne({ username: req.body.username }, (err, user) => {
      if (user != null) {
        req.flash("error", "Username exists");
        result.userExist = true;
        result.isSuccessful = false; 
        res.send(JSON.stringify(result));
      }
  });
  
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      req.flash("error", err.message);
      result.userExist = false;
      result.isSuccessful = false;
      res.send(JSON.stringify(result));
    }

    passport.authenticate("local")(req, res, () => {
      req.flash("success", "Successfully Signed Up! Nice to meet you " + req.body.username);
      result.userExist = false;
      result.isSuccessful = true;
      result.currentUser = {
        username: req.user.username,
        id: req.user._id
      }
      res.send(JSON.stringify(result));
   });

  });
}); 

app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  (req, res) => {
    res.send(JSON.stringify({
      loginSuccessful: true,
      currentUser: {
        username: req.user.username,
        id: req.user._id
      }
    }));
  });

app.get("/logout", (req, res) => {
  req.logout();
  req.flash("success", "Logged you out!");
  res.send();
})

app.post('/addMsg', (req, res) => {
  const msg = req.body.msg
  const roomName = req.body.roomName
  let roomExisted = false;
  chatData.forEach((chatdata, i ,a) => {
    if(chatdata.roomName === roomName){
      chatdata.msgs.push(msg)
      roomExisted = true
      console.log(`http server: room:${roomName} added information`)
    }
  })
  if(!roomExisted){
    let obj = {
      roomName : roomName,
      msgs : [msg],
    }
    chatData.push(obj)
    console.log(`http server: room:${roomName} created`)
  }
  res.send(JSON.stringify({}));
});

//modify to use roomId in the version2
//example: /getMsgsByRoom?roomName=abc
app.get("/getMsgsByRoom", (req, res) => {
  const roomName = req.query.roomName;
  let roomExisted = false;
  let msgs = []
  chatData.forEach((chatdata, i ,a) => {
    if(chatdata.roomName == roomName){
      msgs = chatdata.msgs
      roomExisted = true
      console.log(`http server: room:${roomName} found and get`)
    }
  })
  if(!roomExisted){
    console.log(`http server: room:${roomName} not found`)
  }
  res.send(JSON.stringify(msgs));
})

app.listen(PORT, () => {
  console.log("app listening at :" + PORT);
});

// server.listen(PORT, function(err) {
//   console.log('server listening at :' + PORT);
// })