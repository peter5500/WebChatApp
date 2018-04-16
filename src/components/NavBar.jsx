import React from 'react';
import LoginPage from './LoginPage';
import SignedInPage from './SignedInPage'

const NavBar = ({handleCreate, handleLogin, currentUser, handleLogout, username, socket}) => {
  return (
    <div>
    { currentUser ? 
      <SignedInPage
        handleLogout = {handleLogout}
        currentUser = {currentUser}
        username = {username}
        socket = {socket}
      /> :
      <LoginPage
      handleCreate = {handleCreate}
      handleLogin = {handleLogin}
      socket = {socket}
      />
    }
    </div>
  )
} 

export default NavBar;