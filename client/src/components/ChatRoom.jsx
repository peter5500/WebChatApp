import React, { Component } from 'react';

class ChatRoom extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            socket : this.props.socket,
            username: this.props.username,
            message : '',
            sendMessage : this.props.sendMessage,
            sendMessage2 : this.props.sendMessage2,
            currentRoom : this.props.currentRoom,
            nextRoom : '',
            disabled: true
        })
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        //this.handleClick2 = this.handleClick2.bind(this);
        this.handleChangeRoomName = this.handleChangeRoomName.bind(this);
        this.scrollDown = this.scrollDown.bind(this);
    }
    // componentWillMount(){
    //     this.props.updateMsgs()
    // }

    componentWillReceiveProps(nextProps) {
        this.setState({
          currentRoom: nextProps.currentRoom,
          roomMember: nextProps.roomMember
        });
        console.log(`username is now:${this.props.username}`)
    }

    componentDidMount() {
        this.scrollDown()
	}

	componentDidUpdate(prevProps, prevState) {
		this.scrollDown()
	}

    scrollDown(){
		const { chatarea } = this.refs
		chatarea.scrollTop = chatarea.scrollHeight
	}
    
    handleChange(e) {
        this.setState({message: e.target.value});
        if (e.target.value) {
            this.setState({
                disabled: false,
            });
        } else {
            this.setState({
                disabled: true,
            }); 
        }

        //console.log("东西呢: " + typeof(this.state.message));
        if (e.target.value.charAt(0) !== '\n' && e.keyCode === 13) {
            this.handleClick(e);
        }

            //console.log(`${this.state.username} input ${this.state.message}`)
    }

    handleChangeRoomName(e) {
        this.setState({nextRoom: e.target.value})
    }

    //for general message
    handleClick(e) {
        e.preventDefault();
        this.state.sendMessage(this.props.socket, this.state.username, this.state.message, this.state.currentRoom)
        console.log(`${this.state.username} sent :${this.state.username}`)
        this.setState({
            message: ``,
        })
    }
    //for join message
    // handleClick2(e) {
    //     e.preventDefault();
    //     this.props.joinRoom(this.props.socket, this.props.username, this.state.nextRoom)
    //     this.setState({
    //         message: ``,
    //     })
    // }
    // //temp
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
        const messageList = this.props.messages.map((message, index) => {
            const username = message.username
            const context = message.context
            const cUser = this.state.username
            const type = message.type
            return(
                    type === "system" ?
                    <p class="text-center new-user">{username} {context}</p>
                    :
                     username !== cUser ? 
                     <li key={index} class="media">
                        <img class="chat-img2" src="https://cdn3.iconfinder.com/data/icons/sympletts-part-10/128/user-man-bubble-512.png" alt="Generic placeholder image"></img>
                        <div class="media-body">
                        <h6 class="mt-0 mb-1">{message.username}</h6>
                        <p class="chat-body2 rounded">{message.context}</p>                       
                        </div>
                    </li>
                    :
                    <li key={index} class="user-chat">
                        <div class="media">
                            <div class="media-body">
                                <div class="outer">
                                    <div class="main-chat rounded">{message.context}</div>
                                </div>
                            </div>
                            <img class="ml-3 chat-mainImg" src="https://cdn2.iconfinder.com/data/icons/messenger-solid/128/07_Profile-512.png" alt="Generic placeholder image"></img>
                        </div>
                    </li>
                )
        })
        return(
            <div class="row">
                <div class="col-lg message_section">
                    <div class="row">
                        <div class="col-lg message_section">
                            <div class="new_message_head">
                                <div class="pull-left chatRoom">
                                    <span styles="cursor:pointer" class="bar" onclick={this.props.openNav}><img class="side-bar" src="https://cdn4.iconfinder.com/data/icons/browser-ui-small-size-optimized-set/154/mobile-menu-additional-navigation-browser-site-512.png"></img> {this.props.currentRoom} (< img class="chat-amount" src="http://www.westside-tennis.com/wp-content/uploads/2015/01/3-uses.png"></img>:{this.props.roomMember.length})</span>
                                </div>
                            </div>
                            <div class="chat_area" ref="chatarea">
                                <ul class="list-unstyled">
                                    {messageList}
                                </ul>
                            </div>
                        </div>
                        <div class="message_write">
                            <textarea class="form-control" 
                                placeholder="type a message" 
                                value={this.state.message} 
                                onChange={e => this.handleChange(e)}
                                onKeyUp={e => this.handleChange(e)}
                                >
                            </textarea>
                            <div class="clearfix">
                            </div>
                            <div class="chat_bottom">
                                <a href="#" class="pull-left upload_btn"><i class="fa fa-cloud-upload" aria-hidden="true"></i>Add Picture</a>
                                <a href="#" class="pull-right btn btn-success" onClick={this.handleClick} disabled={this.state.disabled}>Send</a>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default ChatRoom;