import React from 'react'
import NavBar from './NavBar'

interface Props {
  
}

const Home = (props: Props) => {
  return (
    <div>
      <NavBar />
      <div className="dashboard-container">Main Content</div>
    </div>
  )
}

export default Home
