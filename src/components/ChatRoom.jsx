import React, { Component } from 'react';

class ChatRoom extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            scoket : this.props.socket
        })
    
    }

    render() {
        return(
            <div>
                <p>laldfasdfsafesf</p>
            </div>
        )
    }
}

export default ChatRoom;