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
    this.handleCreate = this.handleCreate.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.updateRoom = this.updateRoom.bind(this);
  }

  componentWillMount() {
    //console.log(this.state.currentUser);
    fetch('http://localhost:3231/login', {
      method: 'POST',
      body: JSON.stringify( { 
        username: cookie.load('username'),
        password: cookie.load('password')
      } )
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.statusText))
    .then(
      json => {
        this.setState({
          currentUser: json.currentUser,
          username: cookie.load('username')
        });
      }
    )
    .catch( (error) => Promise.reject(error) );
  }

  handleCreate(nickname, username, password) {
    fetch('http://localhost:3231/register', {
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
        cookie.save('password', password);
        this.setState({
          currentUser: json.currentUser,
          username: cookie.load('username')
        });
        
      })
    ).catch( (error) => Promise.reject(error) );
  }

  handleLogin(username, password, socket) {
    fetch('http://localhost:3231/login', {
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
        cookie.save('password', password);
        this.setState({
          currentUser: json.currentUser,
          username: cookie.load('username')
        })
        //this.sendMessage(username, socket)
       
      }
    ).catch( (error) => Promise.reject(error) );
  }

  handleLogout() {
    cookie.remove('username');
    cookie.remove('password');
    this.setState({
      currentUser: null,
      username: cookie.load('username')
    });
    // fetch('/logout')
    // .then(response => response.ok ? response.json() : Promise.reject(response.statusText))
    // .then(
    //   (json => {
    //     this.setState({
    //       currentUser: null,
    //     })
    //   })
    // ).catch( (error) => Promise.reject(error) );
  }

  // 发送聊天信息
  sendMessage(socket, username, message, roomName) {
    if (message) {
        const obj = {
          username: username,
          message: message,
        }
        this.addMsg(obj, roomName)
        socket.emit('messageToServer', obj, roomName);
    }
    return false
  }

  // only for room enter
  sendMessage2(socket, username, message, roomName) {
    if (message) {
        const obj = {
          username: username,
          message: message,
        }
        socket.emit('messageToServer', obj, roomName);
    }
    return false
  }

  addMsg(msg, roomName){
    fetch('http://localhost:3231/addmsg', {
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
    console.log(`browser room change to: ${this.state.currentRoom}`)
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
        currentRoom = {this.state.currentRoom}
        updateRoom = {this.updateRoom}
      />
    );
  }
}

export default App;
