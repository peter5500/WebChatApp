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
        })
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    handleChange(e) {
        this.setState({message: e.target.value})
        console.log(`${this.state.username} input ${this.state.message}`)
    }

    handleClick(e) {
        e.preventDefault();
        this.state.sendMessage(this.props.socket, this.state.username, this.state.message)
        console.log(`${this.state.username} sent :${this.state.username}`)
        this.setState({
            message: ``,
        })
    }

    render() {
        const messageList = this.props.messages.map(function(message){
            return(
                    <p>{message.username}: {message.message}</p>
                )
        })
        return(
            <div>
                <p>laldfasdfsafesf</p>
                <div className="input-box">
                    <div className="input">
                        <input type="text" maxLength="140" placeholder="按回车提交" value={this.state.message} 
                        onChange={this.handleChange}
                        />
                    </div>
                    <div className="button">
                        <button type="button" onClick={this.handleClick}>Submit</button>
                    </div>
                    <div>
                        {messageList}
                    </div>
                </div>
            </div>
        )
    }
}

export default ChatRoom;