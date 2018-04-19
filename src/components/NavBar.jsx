import React from 'react';
import LoginPage from './LoginPage';
import SignedInPage from './SignedInPage'

const NavBar = ({handleCreate, handleLogin, currentUser, handleLogout, username, socket, currentRoom}) => {
  return (
    <div>
    { currentUser ? 
      <SignedInPage
        handleLogout = {handleLogout}
        currentUser = {currentUser}
        username = {username}
        socket = {socket}
        currentRoom = {currentRoom}
      /> :
      <LoginPage
      handleCreate = {handleCreate}
      handleLogin = {handleLogin}
      socket = {socket}
      currentRoom = {currentRoom}
      />
    }
    </div>
  )
} 

export default NavBar;