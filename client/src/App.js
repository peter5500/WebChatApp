import React, { Component } from 'react';
import Layout from './components/Layout';
import './index.css';
import cookie from 'react-cookies'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      username: cookie.load('username'),
      currentRoom: "dashboard"
    }

    this.sendMessage = this.sendMessage.bind(this);
    this.sendMessage2 = this.sendMessage2.bind(this);
    this.sendMessage3 = this.sendMessage3.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.updateRoom = this.updateRoom.bind(this);
  }

  componentWillMount() {
    fetch('/authenticate', {
      method: 'POST',
      body: JSON.stringify( { 
        username: cookie.load('username'),
        sessionID: cookie.load('sessionID')
      } )
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.statusText))
    .then(
      json => {
        if (!json.success) {
          cookie.remove('username');
          cookie.remove('sessionID');
          return;
        }
        console.log(json.success);
        this.setState({
          currentUser: json.currentUser,
          username: cookie.load('username')
        });
      }
    )
    .catch( (error) => Promise.reject(error) );
  }

  handleCreate(nickname, username, password) {
    fetch('/register', {
      method: 'POST',
      body: JSON.stringify( { 
        username: username,
        password: password,
        nickname: nickname
      } )
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.statusText))
    .then(
      (json => {
        cookie.save('username', username);
        cookie.save('sessionID', json.sessionID);
        cookie.save('nickname', nickname);
        this.setState({
          currentUser: json.currentUser,
          username: cookie.load('username'),
          nickname: cookie.load('nickname')
        });
        
      })
    ).catch( (error) => Promise.reject(error) );
  }

  handleLogin(username, password, socket) {
    fetch('/login', {
      method: 'POST',
      body: JSON.stringify( { 
        username: username,
        password: password
      } )
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.statusText))
    .then(
      json => {
        cookie.save('username', username);
        cookie.save('sessionID', json.sessionID);
        cookie.save('nickname', json.currentUser.nickname);
        this.setState({
          currentUser: json.currentUser,
          username: cookie.load('username')
        })
        //this.sendMessage(username, socket)
       
      }
    ).catch( (error) => Promise.reject(error) );
  }

  handleLogout() {
    fetch('/logout', {
      method: 'POST',
      body: JSON.stringify({ 
        sessionID: this.state.sessionID,
      })
    })
    .catch( (error) => Promise.reject(error) );
    cookie.remove('username');
    cookie.remove('nickname');
    cookie.remove('sessionID');
    console.log(cookie.load('sessionID'))
    this.setState({
      currentUser: null,
      username: cookie.load('username'),
    });
  }

  // 发送聊天信息
  sendMessage(socket, username, message, roomName) {
    if (message) {
        const obj = {
          username: username,
          context: message,
          type: "chat",
        }
        this.addMsg(obj, roomName)
        socket.emit('messageToServer', obj, roomName);
    }
    return false
  }

  // only for enter room
  sendMessage2(socket, username, message, roomName) {
    const obj = {
      username: username,
      context: message,
      type: "system",
    }
    this.addMsg(obj, roomName)
    socket.emit('joinToServer', obj, roomName);
    
    return false
  }

   // only for leave room
   sendMessage3(socket, username, message, roomName) {
    const obj = {
      username: username,
      context: message,
      type: "system",
    }
    this.addMsg(obj, roomName)
    socket.emit('leaveToServer', obj, roomName);
    this.setState({
      currentRoom: "dashboard"
    })
    return false
  }

  addMsg(msg, roomName){
    fetch('/addmsg', {
      method: 'POST',
      body: JSON.stringify( { 
        msg: msg,
        roomName : roomName,
      } )
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.statusText))
    .then(
      (json => {
        this.setState({
          
        });
      })
    ).catch( (error) => Promise.reject(error) );
  }

  updateRoom(roomName){
    this.setState({
      currentRoom: roomName,
    })
    console.log(`browser app.js room change to: ${this.state.currentRoom}`)
  }

  render() {
    return (       
      <Layout
        handleCreate = {this.handleCreate}
        handleLogin = {this.handleLogin}
        currentUser = {this.state.currentUser && this.state.currentUser.username}
        handleLogout = {this.handleLogout}
        username = {this.state.username}
        sendMessage = {this.sendMessage}
        sendMessage2 = {this.sendMessage2}
        sendMessage3 = {this.sendMessage3}
        currentRoom = {this.state.currentRoom}
        updateRoom = {this.updateRoom}
      />
    );
  }
}

export default App;
