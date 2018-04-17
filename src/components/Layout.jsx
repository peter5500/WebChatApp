import React, { Component } from 'react';
import NavBar from './NavBar';
import ChatRoom from './ChatRoom'
import io from 'socket.io-client'
import { USER_CONNECTED, LOGOUT } from '../Events'

const socketUrl = "http://localhost:8000"

class Layout extends Component {
  constructor(props) {
      super(props);
      this.state = ({
        currentUser : this.props.currentUser,
        messages: [],
      })
  
  }

  componentWillMount() {
    console.log("layout start")
		this.initSocket()
  }
  
  /*
	*	Connect to and initializes the socket.
	*/
	initSocket = ()=>{
		const socket = io(socketUrl)
    console.log("**********Socket try!");
		socket.on('connect', ()=>{
			console.log("**********Socket Connected!");
    })
    let obj = {
      username : "test",
      message : "Got socket init",
    }
    //socket.emit("message", obj)
    
    this.setState({socket})

    socket.on('message', (obj)=>{
      this.updateMsg(obj)
    })
  }
  
  // 发送新消息
  updateMsg(obj) {
    let messages = this.state.messages;
    const newMsg = {type:'chat', username:obj.username, uid:obj.uid, message:obj.message};
    console.log("Browser get! ${obj.username} : ${obj.message}")
    this.setState({
      messages: messages.concat(newMsg)
    })
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
            />
          </div>
      )
    } else {
      return (
        <div>
          <NavBar
            handleCreate = {this.props.handleCreate}
            handleLogin = {this.props.handleLogin}
            currentUser = {this.props.currentUser}
            handleLogout = {this.props.handleLogout}
            username = {this.props.username}
            socket = {this.state.socket}
          />
          <ChatRoom
            socket = {this.state.socket}
            username = {this.props.username}
            sendMessage = {this.props.sendMessage}
            messages = {this.state.messages}
          />
        </div>
      )
      }
  }
}

export default Layout;