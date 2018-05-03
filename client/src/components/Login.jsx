import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      disabled: true,
      inputUsername: "",
      inputPassword: "",
      //socket: this.props.socket
    })

    this.handleInputUsername = this.handleInputUsername.bind(this);
    this.handleInputPassword = this.handleInputPassword.bind(this);
  }

  handleInputUsername(event) {
    const {inputUsername, inputPassword} = this.state;
    if (inputUsername !== "" && inputPassword !== "") {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  }

  handleInputPassword(event) {
    const {inputUsername, inputPassword} = this.state;
    if (inputUsername !== "" && inputPassword !== "") {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  }

  render() {
    const {inputUsername, inputPassword} = this.state;
    return(
      <div>
        <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#exampleModalCenter1"><img className="login-picture" src="http://flaticons.net/icons/Application/User-Login.png"/>Login</button>
        <div class="modal fade" id="exampleModalCenter1" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Login to your account</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="form-group">
                  <label for="exampleInputEmail1">Username</label>
                </div>
                <div>
                  <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
                  value={this.state.inputUsername}
                  onKeyUp={this.handleInputUsername}
                  onChange = {
                    ({target})=>{
                      this.setState({inputUsername: target.value})
                    }
                  }
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Password</label>
                </div>
                <div>
                  <input type="password" class="form-control" id="exampleInputPassword1"
                  value={this.state.inputPassword}
                  onKeyUp={this.handleInputPassword}
                  onChange={
                    ({target}) => {
                      this.setState({inputPassword: target.value})
                    }
                  }
                  />
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" data-dismiss="modal" disabled={this.state.disabled} onClick={() => this.props.handleLogin(inputUsername, inputPassword, this.props.socket)}>Login</button>
              </div>
            </div> 
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
