import React from 'react';
import cookie from 'react-cookies'

const SignedInAs = ({username, currentUser}) => {
  return(
    <div class="current-user">Hello,{cookie.load("username")} </div>
  )
}

export default SignedInAs;