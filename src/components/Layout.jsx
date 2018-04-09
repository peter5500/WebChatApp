import React from 'react';
import NavBar from './NavBar';

const Layout = ({handleCreate, handleLogin, currentUser, handleLogout, username}) => {
  return (
    <NavBar
      handleCreate = {handleCreate}
      handleLogin = {handleLogin}
      currentUser = {currentUser}
      handleLogout = {handleLogout}
      username = {username}
    />
  );
}

export default Layout;