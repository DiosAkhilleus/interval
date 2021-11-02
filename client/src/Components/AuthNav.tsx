import React from 'react'
import AuthenticationButton from './AuthenticationButton';

interface Props {
  
}

const AuthNav = (props: Props) => {
  return (
    <div className="navbar-nav ml-auto">
        <AuthenticationButton />
    </div>
  )
}

export default AuthNav
