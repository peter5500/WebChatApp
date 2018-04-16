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
        currentUser : this.props.currentUser 
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
		
		this.setState({socket})
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
            socket = {this.props.socket}
          />
          <ChatRoom
            socket = {this.props.socket}
          />
        </div>
      )
      }
  }
}

export default Layout;