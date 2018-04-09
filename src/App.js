import React, { Component } from 'react';
import Layout from './components/Layout';
import './index.css';
import cookie from 'react-cookies'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      username: cookie.load('username')
    }

    this.handleCreate = this.handleCreate.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentWillMount() {
    //console.log(this.state.currentUser);
    fetch('/login', {
      method: 'POST',
      body: JSON.stringify( { 
        username: cookie.load('username'),
        password: cookie.load('password')
      } )
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.statusText))
    .then(
      json => {
        this.setState({
          currentUser: json.currentUser,
          username: cookie.load('username')
        });
      }
    )
    .catch( (error) => Promise.reject(error) );
  }

  handleCreate(nickname, username, password) {
    fetch('/register', {
      method: 'POST',
      body: JSON.stringify( { 
        username: username,
        password: password,
        nickname: nickname
      } )
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.statusText))
    .then(
      (json => {
        cookie.save('username', username);
        cookie.save('password', password);
        this.setState({
          currentUser: json.currentUser,
          username: cookie.load('username')
        });
        
      })
    ).catch( (error) => Promise.reject(error) );
  }

  handleLogin(username, password) {
    fetch('/login', {
      method: 'POST',
      body: JSON.stringify( { 
        username: username,
        password: password
      } )
    })
    .then(response => response.ok ? response.json() : Promise.reject(response.statusText))
    .then(
      json => {
        cookie.save('username', username);
        cookie.save('password', password);
        this.setState({
          currentUser: json.currentUser,
          username: cookie.load('username')
        })
       
      }
    ).catch( (error) => Promise.reject(error) );
  }

  handleLogout() {
    cookie.remove('username');
    cookie.remove('password');
    this.setState({
      currentUser: null,
      username: cookie.load('username')
    });
    // fetch('/logout')
    // .then(response => response.ok ? response.json() : Promise.reject(response.statusText))
    // .then(
    //   (json => {
    //     this.setState({
    //       currentUser: null,
    //     })
    //   })
    // ).catch( (error) => Promise.reject(error) );
  }

  render() {
    return (       
      <Layout
        handleCreate = {this.handleCreate}
        handleLogin = {this.handleLogin}
        currentUser = {this.state.currentUser && this.state.currentUser.username}
        handleLogout = {this.handleLogout}
        username = {this.state.username}
      />
    );
  }
}

export default App;
