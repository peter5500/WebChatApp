import React from 'react';
import LoginPage from './LoginPage';
import SignedInPage from './SignedInPage'

const NavBar = ({handleCreate, handleLogin, currentUser, handleLogout, username}) => {
  return (
    <div>
    { username ? 
      <SignedInPage
        handleLogout = {handleLogout}
        currentUser = {currentUser}
        username = {username}
      /> :
      <LoginPage
      handleCreate = {handleCreate}
      handleLogin = {handleLogin}
      />
    }
    </div>
  )
} 

export default NavBar;