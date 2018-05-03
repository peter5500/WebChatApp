import React, { Component } from 'react';
import NavBar from './NavBar';


class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            currentUser : this.props.currentUser || this.props.username,
            currentRoom : this.props.currentRoom,
            messages: [],
            nextRoom : '',
        })
        this.handleChangeRoomName = this.handleChangeRoomName.bind(this);
        //this.changeRoom = this.changeRoom.bind(this);
        this.handleClick2 = this.handleClick2.bind(this);
        this.handleDel = this.handleDel.bind(this);
        console.log("dashboard user check:" + this.props.currentUser)
        
    }

    handleChangeRoomName(e) {
        this.setState({nextRoom: e.target.value})
    }

    //for join message
    handleClick2(e) {
        e.preventDefault();
        this.props.joinRoom(this.props.socket, this.props.username, this.state.nextRoom)
        this.setState({
            message: ``,
        })
    }

    handleDel(){
        this.props.delRoom(this.state.nextRoom, this.props.username)
        alert(`Room ${this.state.nextRoom} clear!`)
        this.setState({
            nextRoom: ``,
        })
        
    }
    
    //temp
    // changeRoom(socket, currentUser, currentRoom, nextRoom){
    //     let data = {currentUser, currentRoom, nextRoom}
    //     socket.emit("change", data)
    //     console.log(`client room change sent`)
    //     this.setState({
    //         currentRoom: nextRoom,
    //         nextRoom: ``,
    //     })
    //     this.props.sendMessage2(socket, currentUser, `Join in! ${nextRoom}`, nextRoom)
    //     this.props.updateRoom(nextRoom)
    //     this.props.updateMsgs(nextRoom)
    // }
    render() {
        console.log("dashboard user check:" + this.props.username)
        if(this.props.username == "admin"){
            return(
                <section class="cover">
                    <div id="container" class="container">
                        <div class="row text-white">
                            <div class="col-sm-10 offset-sm-1 text-center">
                                <h5 class="display-4 message">You are going to join a new chat!</h5>
                                <div class="info-form">
                                    <form class="form-inline justify-content-center">
                                        <div class="form-group">
                                            <input type="text" class="form-control input" 
                                            placeholder="Input room name" 
                                            onChange={this.handleChangeRoomName}
                                            value={this.state.nextRoom}></input>
                                        </div>
                                        
                                    </form>
                                </div>
                                <br></br>
                                <a href="#nav-main" class="btn btn-warning" onClick={this.handleDel}>
                                    Clear the Room!
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            )
        }else {
            return(
            <section class="cover">
                    <div id="container" class="container">
                        <div class="row text-white">
                            <div class="col-sm-10 offset-sm-1 text-center">
                                <h5 class="display-4 message">You are going to join a new chat!</h5>
                                <div class="info-form">
                                    <form class="form-inline justify-content-center">
                                        <div class="form-group">
                                            <input type="text" class="form-control input" 
                                            placeholder="Input room name" 
                                            onChange={this.handleChangeRoomName}
                                            value={this.state.nextRoom}></input>
                                        </div>
                                        
                                    </form>
                                </div>
                                <br></br>
                                <a href="#nav-main" class="btn btn-warning" onClick={this.handleClick2}>
                                    Join Room!
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            )
        }
        
    }
}

export default Dashboard;