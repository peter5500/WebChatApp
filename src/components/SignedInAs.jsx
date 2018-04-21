import React from 'react';
import cookie from 'react-cookies'

const SignedInAs = ({username, currentUser}) => {
  console.log("我的昵称呢？ " + cookie.load("nickname"));
  return(
    <p class="current-user">Hello,{cookie.load("username")} </p >
  )
}

export default SignedInAs;