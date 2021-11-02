import React from 'react'
import AuthNav from './AuthNav';

interface Props {
  
}

const NavBar = (props: Props) => {
  return (
    <div className="nav-container mb-3">
      <nav className="navbar navbar-expand-md navbar-light bg-light">
        <div className="container">
          <div className="navbar-brand logo" />
          <AuthNav />
        </div>
      </nav>
    </div>
  )
}

export default NavBar
