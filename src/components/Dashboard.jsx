import React, { Component } from 'react';
import NavBar from './NavBar';


class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            currentUser : this.props.currentUser,
            currentRoom : this.props.currentRoom,
            messages: [],
            nextRoom : '',
        })
        this.handleChangeRoomName = this.handleChangeRoomName.bind(this);
        this.changeRoom = this.changeRoom.bind(this);
        this.handleClick2 = this.handleClick2.bind(this);
    }

    handleChangeRoomName(e) {
        this.setState({nextRoom: e.target.value})
    }

    //for join message
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
        this.props.sendMessage2(socket, currentUser, `Join in! ${nextRoom}`, nextRoom)
        this.props.updateRoom(nextRoom)
        this.props.updateMsgs(nextRoom)
    }
    render() {
        return(
            <div className="input-box">
                <div className="input">
                <input type="text" 
                placeholder="input roomName" 
                value={this.state.nextRoom} 
                onChange={this.handleChangeRoomName}
                />
                </div>
                <div className="button">
                    <button type="button" onClick={this.handleClick2}>ChangeRoom</button>
                </div>
            </div>
        )
    }
}

export default Dashboard;