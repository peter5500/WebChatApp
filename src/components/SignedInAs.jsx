import React from 'react';
import cookie from 'react-cookies'

const SignedInAs = ({username, currentUser}) => {
  return(
    <p class="current-user">Hello,{currentUser} </p >
  )
}

export default SignedInAs;