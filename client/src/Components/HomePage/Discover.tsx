import React from 'react'

interface Props {
  
}

const Discover = (props: Props) => {
  return (
    <div className='discover-container'>
      <div className='discover-search'>
        <input type="text" className='text' />
      </div>
      <div>
        User Display
      </div>
    </div>
  )
}

export default Discover
