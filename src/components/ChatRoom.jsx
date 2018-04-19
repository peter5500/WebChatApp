import React, { Component } from 'react';

class ChatRoom extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            socket : this.props.socket,
            username: this.props.username,
            message : '',
            messages : this.props.messages,
            sendMessage : this.props.sendMessage,
            sendMessage2 : this.props.sendMessage2,
            currentRoom : this.props.currentRoom,
            nextRoom : '',
        })
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClick2 = this.handleClick2.bind(this);
        this.handleChangeRoomName = this.handleChangeRoomName.bind(this);
        this.changeRoom = this.changeRoom.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
          currentRoom: nextProps.currentRoom,
          messages : this.props.messages,
        });
    }
    
    handleChange(e) {
        this.setState({message: e.target.value})
        console.log(`${this.state.username} input ${this.state.message}`)
    }

    handleChangeRoomName(e) {
        this.setState({nextRoom: e.target.value})
    }

    handleClick(e) {
        e.preventDefault();
        this.state.sendMessage(this.props.socket, this.state.username, this.state.message, this.state.currentRoom)
        console.log(`${this.state.username} sent :${this.state.username}`)
        this.setState({
            message: ``,
        })
    }

    handleClick2(e) {
        e.preventDefault();
        this.changeRoom(this.props.socket, this.state.username, this.state.currentRoom, this.state.nextRoom)
        this.setState({
            message: ``,
        })
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
        this.state.sendMessage2(socket, currentUser, `Join in! ${nextRoom}`, nextRoom)
        this.props.updateRoom(nextRoom)
        this.props.updateMsgs(nextRoom)
    }
    

    render() {
        const messageList = this.props.messages.map(function(message){
            return(
                    <p>{message.username}: {message.message}</p>
                )
        })
        return(
            
            <div>
                <p>currentRoom: {this.props.currentRoom}</p>
                <div className="input-box">
                    <div className="input">
                        <input type="text" maxLength="140" placeholder="input message" value={this.state.message} 
                        onChange={this.handleChange}
                        />
                    </div>
                    <div className="button">
                        <button type="button" onClick={this.handleClick}>Submit</button>
                    </div>
                </div>
                <div className="input-box">
                    <div className="input">
                        <input type="text" maxLength="140" placeholder="input roomName" value={this.state.nextRoom} 
                        onChange={this.handleChangeRoomName}
                        />
                    </div>
                    <div className="button">
                        <button type="button" onClick={this.handleClick2}>ChangeRoom</button>
                    </div>
                </div>
                <div>
                    {messageList}
                </div>
            </div>
        )
    }
}

export default ChatRoom;