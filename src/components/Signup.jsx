import React, { Component } from 'react';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = ({ 
      inputNickname: "",
      inputUsername: "",
      inputPassword: "",
      inputRepassword: "",
      disabled: true
    });
    
    this.handleNickname = this.handleNickname.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handleRepassword = this.handlePassword.bind(this);
  }

  handleNickname(event) {
    const {inputNickname, inputUsername, inputPassword, inputRepassword} = this.state;
    if (inputNickname !== "" && inputUsername !== ""
        && inputPassword !== "" && inputRepassword !== "" && inputPassword === inputRepassword) 
    {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  }

  handlePassword(event) {
    const {inputNickname, inputUsername, inputPassword, inputRepassword} = this.state;
    if (inputNickname !== "" && inputUsername !== ""
        && inputPassword !== "" && inputRepassword !== "" && inputPassword === inputRepassword) 
    {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  }

  handleUsername(event) {
    const {inputNickname, inputUsername, inputPassword, inputRepassword} = this.state;
    if (inputNickname !== "" && inputUsername !== ""
        && inputPassword !== "" && inputRepassword !== "" && inputPassword === inputRepassword) 
    {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  }

  handleRepassword(event) {
    const {inputNickname, inputUsername, inputPassword, inputRepassword} = this.state;
    if (inputNickname !== "" && inputUsername !== ""
        && inputPassword !== "" && inputRepassword !== "" && inputPassword === inputRepassword) 
    {
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
    const {inputNickname, inputUsername, inputPassword} = this.state;
    return(
      <div>
        <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#exampleModalCenter2"><img class="signup-picture" src="http://www.iconsplace.com/icons/preview/white/plus-2-256.png"/>Sign Up</button>
        <div class="modal fade" id="exampleModalCenter2" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Create an account</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="form-group">
                  <label for="exampleInputEmail1">Nickname</label>
                </div>
                <div>
                  <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onKeyUp={this.handleNickname} value={this.state.inputNickname}
                  onChange = {
                    ({target})=>{
                      this.setState({inputNickname:target.value})
                    }
                  }/>
                </div>
                <div class="form-group">
                  <label for="exampleInputEmail1">Username</label>
                </div>
                <div>
                  <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onKeyUp={this.handleUsername} value={this.state.inputUsername} onChange = {
                    ({target})=>{
                      this.setState({inputUsername:target.value})
                    }
                  }/>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Password</label>
                </div>
                <div>
                  <input type="password" class="form-control" id="exampleInputPassword1" onKeyUp={this.handlePassword} value={this.state.inputPassword} 
                  onChange = {
                    ({target})=>{
                      this.setState({inputPassword:target.value})
                    }
                  }/>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Confirm Password</label>
                </div>
                <div>
                  <input type="password" class="form-control" id="exampleInputPassword1" onKeyUp={this.handleRepassword} value={this.state.inputRepassword}
                  onChange = {
                    ({target})=>{
                      this.setState({inputRepassword: target.value})
                    }
                  }/>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary"  data-dismiss="modal" disabled={this.state.disabled} 
                  onClick={() => {this.props.handleCreate(inputNickname, inputUsername, inputPassword)}} 
                >Create</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Signup;