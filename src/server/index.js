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
let Chatroom = require("./models/chatroom");
let Message = require("./models/message");

let session = require("express-session");
let sessionIDs = new Map();
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

app.post("/register", (req, res) => {
  let newUser = new User({username: req.body.username, nickname: req.body.nickname});
  console.log(req.body.username);
  let result = {};
  User.findOne({ username: req.body.username }, (err, user) => {
      if (user != null) {
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
      sessionIDs.set(req.sessionID, req.session.passport.user);
      res.send(JSON.stringify({
        loginSuccessful: true,
        currentUser: {
          username: req.session.passport.user,
          nickname: req.body.nickname  
        },
        sessionID: req.sessionID
      }));
    });
  });
});

app.post('/login', 
  passport.authenticate('local', {}),
  (req, res) => {
    sessionIDs.set(req.sessionID, req.session.passport.user);
    User.findOne({"username": req.session.passport.user}, (err, nickname) => {
      if (err) {
        console.log(err);
      } else {
        res.send(JSON.stringify({
          loginSuccessful: true,
          currentUser: {
            nickname: nickname,
            username: req.session.passport.user,  
          },
          sessionID: req.sessionID
        }));
      }
    }) 
    
  });

  app.post('/authenticate', (req, res) => {
    console.log(req.body.sessionID);
    console.log(req.body.username);
    currentUser = {
      username: req.body.username,  
    };
    if (sessionIDs.has(req.body.sessionID) 
        && sessionIDs.get(req.body.sessionID) === req.body.username) {
      res.send(JSON.stringify({
        success: true,
        currentUser: currentUser
      }))
    } else {
      res.send(JSON.stringify({
        currentUser: null,
        success: false,
      }))
    }
    
  })

  app.post("/logout", (req, res) => {
    sessionIDs.delete(req.sessionID);
    req.logout();
    res.send();
  })

const addRoom = (res, roomName, msg) => {
  msg.date = new Date();
  msg.type = "System";
  let newChatroom = {
    room_name: roomName,
    messages: []
  }
  Chatroom.create(newChatroom, (err, newChatroom) => {
    if(err){
      console.log(err);
    } else {
      Message.create(msg, (err, message) => {
        if (err) {
          res.send(JSON.stringify({}));
          return;
        } else {
          //add data into comment
          message.context = msg.context;
          message.date = msg.date;
          message.type = msg.type;
          message.username = msg.username;
          //save message
          message.save();
          newChatroom.messages.push(message);
          newChatroom.save();
          console.log(message);
          res.send(JSON.stringify({}));
        }
      })
    }
  });
}
  
app.post('/addMsg', (req, res) => {
  const msg = req.body.msg;
  const roomName = req.body.roomName;

  Chatroom.findOne({'room_name': roomName}, (err, chatroom) => {
    console.log("聊天室到底在不在啊 " + chatroom);
    if (chatroom == null) {
      addRoom(res, roomName, msg);
      return;
    } else {
      Message.create(msg, (err, message) => {
        if (err) {
          res.send(JSON.stringify({}));
          return;
        } else {
          //add data into comment
          message.context = msg.context;
          message.date = msg.date;
          message.type = msg.type;
          message.username = msg.username;
          //save message
          message.save();
          chatroom.messages.push(message);
          chatroom.save();
          console.log(message);
          res.send(JSON.stringify({}));
        }
      })
    }
  });
});  

//delete the chatroom
app.delete("/delRoom", (req, res) => {
  Chatroom.findOneAndRemove({'room_name': roomName}, (err, chatroom) => {
    if (err) {
      res.send(JSON.stringify());
    } else {
      res.send(JSON.stringify());
    }
  })
})

//modify to use roomId in the version2
//example: /getMsgsByRoom?roomName=abc
app.get("/getMsgsByRoom", (req, res) => {
  const roomName = req.query.roomName;
  let roomExisted = false;
  let msgs = []

  Chatroom.findOne({'room_name': roomName}).populate("messages").exec((err, chatroom) => {
    if (chatroom == null) {
      console.log(`http server: room:${roomName} not found`);
      res.send(JSON.stringify(msgs));
      return;
    }

    msgs = chatroom.messages;
    roomExisted = true;
    console.log(`http server: room:${roomName} found and get`);
    res.send(JSON.stringify(msgs));
    });
})

//edit the nickname
app.put("/editProfile", (req, res) => {
  User.findOneAndUpdate({'username': req.body.username}, {$set:{name:"Naomi"}}, (err, doc) => {
    if (err) {
      console.log(err);
      res.send(JSON.stringify({success: false}));
    } else {
      res.send(JSON.stringify({success: true}));
    }
  });
});
  
app.listen(PORT, () => {
  console.log("app listening at :" + PORT);
});

// server.listen(PORT, function(err) {
//   console.log('server listening at :' + PORT);
// })