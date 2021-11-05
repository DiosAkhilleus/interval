import React from 'react'

interface Props {
  handle: string, 
  action: string, 
  postName: string
}

const FriendActivityCard = ({handle, action, postName}: Props) => {

  
  return (
    <div className="friend-activity-card">
      <div>{handle}</div>
    </div>
  )
}

export default FriendActivityCard
