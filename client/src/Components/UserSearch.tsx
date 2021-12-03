import React from 'react'
import Discover from './HomePage/Discover';

interface Props {
  
}

const UserSearch = (props: Props) => {
  return (
    <div className='home-page-container'>
      <div className="home-page-discover">
        <Discover />
      </div>
    </div>
  )
}

export default UserSearch
