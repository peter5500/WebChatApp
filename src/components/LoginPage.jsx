import React from 'react';
import Login from './Login';
import Signup from './Signup';

const LoginPage = ({handleCreate, handleLogin}) => {
  return (
    <div>
      <nav class="navbar navbar-dark bg-primary">
        <div class="navbar-brand navTitle">Chat Room</div>
        <form class="form-inline">
          <Login
            handleLogin = {handleLogin}
          />
          <Signup
            handleCreate = {handleCreate}
          />
        </form>
      </nav>
      <div class="greeting">
        <div>       
          <img class="pin" src="http://www.e-chat.co/Resources/Icons/Misc/registerIconYesTick.png"/>Login/Create your account to start chatting!
        </div>
        <div>       
          <img class="pin" src="http://www.e-chat.co/Resources/Icons/Misc/registerIconYesTick.png"/>Make your own chat room and chat with your friends
        </div>  
      </div>
    </div>
  )
}

export default LoginPage;