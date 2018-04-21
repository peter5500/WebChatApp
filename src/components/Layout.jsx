import React, { Component } from 'react';
import NavBar from './NavBar';
import ChatRoom from './ChatRoom'
import Dashboard from './Dashboard'
import io from 'socket.io-client'
import { USER_CONNECTED, LOGOUT } from '../Events'

const socketUrl = "http://localhost:8000"

class Layout extends Component {
  constructor(props) {
      super(props);
      this.state = ({
        currentUser : this.props.currentUser,
        currentRoom : this.props.currentRoom,
        messages: [],
      })
      this.updateMsgs = this.updateMsgs.bind(this);
      this.changeRoom = this.changeRoom.bind(this);
  }

  componentWillMount() {
    console.log("layout start")
		this.initSocket()
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({
      currentRoom: nextProps.currentRoom
    });
  }
  
  /*
	*	Connect to and initializes the socket.
	*/
	initSocket = ()=>{
    const socket = io(socketUrl)
    console.log("**********Socket try!");
    let joinData = {
      currentUser: this.state.currentUser,
      currentRoom : this.props.currentRoom,
    }
		socket.emit('join', joinData)
    //socket.emit("message", obj)
    
    this.setState({socket})

    socket.on('messageToClient', (obj)=>{
      console.log("client : got new message!")
      this.updateMsg(obj)
    })
  }
  
  // 发送新消息
  updateMsg(obj) {
    let messages = this.state.messages;
    const newMsg = {type:'chat', username:obj.username, uid:obj.uid, context:obj.context};
    console.log("Browser get! ${obj.username} : ${newMsg.context}")
    this.setState({
      messages: messages.concat(newMsg)
    })
  }
  //update msgs in current view
  updateMsgs(currentRoom){
    fetch(`http://localhost:3231/getMsgsByRoom?roomName=${currentRoom}`, {
      method: 'GET',
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.statusText))
    .then(
      (json => {
        console.log(json)
        this.setState({
          messages : json
        })
      })
    ).catch( (error) => Promise.reject(error) );
  }

  //temp
  changeRoom(socket, currentUser, currentRoom, nextRoom){
    let data = {currentUser, currentRoom, nextRoom}
    socket.emit("change", data)
    console.log(`client room change sent`)
    this.setState({
        currentRoom: nextRoom,
        nextRoom: ``,
    })
    this.props.sendMessage2(socket, currentUser, `Join in! ${nextRoom}`, nextRoom)
    this.props.updateRoom(nextRoom)
    this.updateMsgs(nextRoom)
  }

  render() {
    if(!this.props.username){
      return (
          <div>
            <NavBar
              handleCreate = {this.props.handleCreate}
              handleLogin = {this.props.handleLogin}
              currentUser = {this.props.currentUser}
              handleLogout = {this.props.handleLogout}
              username = {this.props.username}
              socket = {this.state.socket}
              currentRoom = {this.state.currentRoom}
            />
          </div>
      )
    } else if(this.props.currentRoom === "dashboard"){
      return (
        <div>
            <NavBar
              handleCreate = {this.props.handleCreate}
              handleLogin = {this.props.handleLogin}
              currentUser = {this.props.currentUser}
              handleLogout = {this.props.handleLogout}
              username = {this.props.username}
              socket = {this.state.socket}
              currentRoom = {this.state.currentRoom}
            />
            <Dashboard
              socket = {this.state.socket}
              username = {this.props.username}
              sendMessage = {this.props.sendMessage}
              sendMessage2 = {this.props.sendMessage2}
              messages = {this.state.messages}
              currentRoom = {this.state.currentRoom}
              updateRoom = {this.props.updateRoom}
              updateMsgs = {this.updateMsgs}
            />
        </div>
        
      )
    }else{
      return (
        <div>
          <NavBar
            handleCreate = {this.props.handleCreate}
            handleLogin = {this.props.handleLogin}
            currentUser = {this.props.currentUser}
            handleLogout = {this.props.handleLogout}
            username = {this.props.username}
            socket = {this.state.socket}
            currentRoom = {this.state.currentRoom}
            changeRoom = {this.changeRoom}
          />
          <ChatRoom
            socket = {this.state.socket}
            username = {this.props.username}
            sendMessage = {this.props.sendMessage}
            sendMessage2 = {this.props.sendMessage2}
            messages = {this.state.messages}
            currentRoom = {this.state.currentRoom}
            updateRoom = {this.props.updateRoom}
            updateMsgs = {this.updateMsgs}
            changeRoom = {this.changeRoom}
          />
        </div>
      )
      }
  }
}

export default Layout;