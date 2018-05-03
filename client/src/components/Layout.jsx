import React, { Component } from 'react';
import NavBar from './NavBar';
import ChatRoom from './ChatRoom'
import Dashboard from './Dashboard'
import io from 'socket.io-client'
import { USER_CONNECTED, LOGOUT } from '../Events'
import ReactDOM from 'react-dom';

const socketUrl = "https://dry-mountain-23358.herokuapp.com/"

class Layout extends Component {
  constructor(props) {
      super(props);
      this.state = ({
        currentUser : this.props.currentUser,
        currentRoom : this.props.currentRoom,
        messages: [],
        roomMember: [],
      })
      this.updateMsgs = this.updateMsgs.bind(this);
      this.leaveRoom = this.leaveRoom.bind(this);
      this.joinRoom = this.joinRoom.bind(this);
      this.addMemberToClient = this.addMemberToClient.bind(this);
      this.delMemberToClient = this.delMemberToClient.bind(this);
      this.getMemberList = this.getMemberList.bind(this);
      this.delRoom = this.delRoom.bind(this);
      this.openNav = this.openNav.bind(this);
      this.closeNav = this.closeNav.bind(this);
  }

  componentWillMount() {
    console.log("layout start")
		this.initSocket()
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({
      currentRoom: nextProps.currentRoom,
      nextRoom: ``,
    });
    console.log(`layout updated: ${nextProps.currentRoom}`)
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

    socket.on('joinToClient', (obj)=>{
      console.log(`client : got new join!`)
      this.updateMsg2(obj)
    })

    socket.on('leaveToClient', (obj)=>{
      console.log(`client : got new left!`)
      this.updateMsg2(obj)
    })
  }

  getMemberList(roomName) {
    fetch(`/getMembersByRoom?roomName=${roomName}`, {
      method: 'GET',
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.statusText))
    .then(
      (json => {
        console.log("get member list:" + json)
        this.setState({
          roomMember : json
        })
      })
    ).catch( (error) => Promise.reject(error) );
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

  // for system
  updateMsg2(obj) {
    let messages = this.state.messages;
    const newMsg = {type:'system', username:obj.username, uid:obj.uid, context:obj.context};
    console.log(`Browser get! System msg ${obj.username} : ${newMsg.context}`)
    this.getMemberList(this.props.currentRoom)
    this.setState({
      messages: messages.concat(newMsg)
    })
  }

  //update msgs in current view
  updateMsgs(currentRoom){
    this.getMemberList(currentRoom)
    fetch(`/getMsgsByRoom?roomName=${currentRoom}`, {
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

  leaveRoom(socket, currentUser, currentRoom){
        let data = {currentUser, currentRoom}
        console.log(`client room leave sent user: ${currentUser}`)
        const nextRoom = "dashboard"
        this.setState({
            currentRoom: nextRoom,
            nextRoom: ``,
        })
        this.delMemberToClient(currentRoom, currentUser)
        this.props.sendMessage3(socket, currentUser, `left`, currentRoom)
        this.updateMsgs(nextRoom)
        this.props.updateRoom(nextRoom)
        //this.closeNav = this.closeNav.bind(this)
        //this.openNav = this.openNav.bind(this)
  }

  addMemberToClient(roomName, userName){
    fetch('/addMember', {
      method: 'POST',
      body: JSON.stringify( { 
        userName: userName,
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

  delMemberToClient(roomName, userName){
    fetch('/delMember', {
      method: 'POST',
      body: JSON.stringify( { 
        userName: userName,
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

  delRoom(room, name){
    console.log(room);
    fetch('/delRoom', {
      method: 'DELETE',
      body: JSON.stringify( { 
        userName: name,
        roomName : room,
      } )
    })
    .then(
      (json => {
        this.setState({
          
        });
      })
    ).catch( (error) => Promise.reject(error) );
  }

  joinRoom(socket, currentUser, nextRoom){
    let data = {currentUser, nextRoom}
    console.log(`client, joinRoom sent, user: ${currentUser} , nextRoom: ${nextRoom}`)
    this.addMemberToClient(nextRoom, currentUser)
    this.props.sendMessage2(socket, currentUser, `joined in`, nextRoom)
    let obj = {
      username: currentUser,
      uid:-1,
      context:"joined in",
      type:"system",
    }
    this.getMemberList(nextRoom)
    //this.props.updateRoom(nextRoom)
    fetch(`/getMsgsByRoom?roomName=${nextRoom}`, {
      method: 'GET',
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.statusText))
    .then(
      (json => {
        console.log(json)
        json.push(obj)
        this.setState({
          messages : json
        })
        this.props.updateRoom(nextRoom)
      })
    ).catch( (error) => Promise.reject(error) );
  }
  //xiaoshen look here
  openNav = () => {
    // var object = ReactDOM.findDOMNode(this.refs.mySidenav)
    // object.style.width = "230px";
  }

  closeNav  = () => {
    // var object = ReactDOM.findDOMNode(this.refs.mySidenav)
    // object.style.width = "0";
  }

  render() {
    if(!this.props.username){
      return (
          <div class="content">
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
        <div class="content">
            <NavBar
              handleCreate = {this.props.handleCreate}
              handleLogin = {this.props.handleLogin}
              currentUser = {this.props.currentUser}
              handleLogout = {this.props.handleLogout}
              username = {this.props.username}
              socket = {this.state.socket}
              currentRoom = {this.state.currentRoom}
              leaveRoom = {this.leaveRoom}
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
              joinRoom = {this.joinRoom}
              delRoom = {this.delRoom}
            />
        </div>
        
      )
    }else{
      return (
        <div class="content">
          <NavBar
            handleCreate = {this.props.handleCreate}
            handleLogin = {this.props.handleLogin}
            currentUser = {this.props.currentUser}
            handleLogout = {this.props.handleLogout}
            username = {this.props.username}
            socket = {this.state.socket}
            currentRoom = {this.state.currentRoom}
            leaveRoom = {this.leaveRoom}
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
            joinRoom = {this.joinRoom}
            roomMember = {this.state.roomMember}
            openNav = {this.openNav}
          />
          {/* xiaoshen look here */}
          <div id="mySidenav" class="sidenav" ref="mySidenav">
                    <a href="javascript:void(0)" class="fa fa-chevron-left" onclick={this.closeNav()}></a>
                    <a href="#">About</a>
                    <a href="#">Services</a>
                    <a href="#">Clients</a>
                    <a href="#">Contact</a>
          </div>
        </div>
      )
      }
  }
}

export default Layout;