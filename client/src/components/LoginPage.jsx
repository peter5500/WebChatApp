import React from 'react';
import Login from './Login';
import Signup from './Signup';

const LoginPage = ({handleCreate, handleLogin, socket}) => {
  return (
    <div>
      <nav class="navbar navbar-dark bg-primary">
        <div class="navbar-brand navTitle">Chat Room</div>
        <form class="form-inline">
          <Login
            handleLogin = {handleLogin}
            socket = {socket}
          />
          <Signup
            handleCreate = {handleCreate}
          />
        </form>
      </nav>
      
    </div>
  )
}

export default LoginPage;