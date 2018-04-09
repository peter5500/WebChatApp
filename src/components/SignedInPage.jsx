import React, { Component } from 'react';
import Logout from './Logout';
import SignedInAs from './SignedInAs';


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
          <Logout
            handleLogout = {this.props.handleLogout}
          />
        </form>
      </nav>
    );
  }
}

export default SignedInPage;
