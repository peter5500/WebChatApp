import React, { Component } from 'react';
import Logout from './Logout';
import SignedInAs from './SignedInAs';
import LeaveRoom from './LeaveRoom'

class SignedInPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    
    return(
      <nav class="navbar navbar-dark bg-primary">
        <div class="navbar-brand navTitle">Chat Room</div>
        <form class="form-inline">
          <SignedInAs
            username = {this.props.username}
            currentUser = {this.props.currentUser}
          />
          {this.props.currentRoom !== "dashboard" ? 
            <LeaveRoom
              socket = {this.props.socket}
              username = {this.props.username}
              currentUser = {this.props.currentUser}
              currentRoom = {this.props.currentRoom}
              changeRoom = {this.props.changeRoom}
            />
            : null
          }
          <Logout
            handleLogout = {this.props.handleLogout}
          />
        </form>
      </nav>
    );
  }
}

export default SignedInPage;
