import React, { Component } from 'react';

class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = ({
    })

    this.handleLogoutWithLeave = this.handleLogoutWithLeave.bind(this);
  }

  handleLogoutWithLeave = () => {
    this.props.leaveRoom(this.props.socket, this.props.currentUser, this.props.currentRoom);
    this.props.handleLogout();
  }
  render() {
    return(
      <div>
        <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#exampleModalCenter2"><img class="logout-picture" src="http://moziru.com/images/shutdown-button-clipart-11.png"></img>Log out</button>
          <div class="modal fade" id="exampleModalCenter2" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLongTitle">Log out</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    Are you sure you want to log out?
                  </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
                    <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={() => this.handleLogoutWithLeave()}>Yes</button>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
  }
}

export default Logout;
