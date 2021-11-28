import React from 'react'

interface Props {
  handle: string, 
  action: string, 
  postName: string
}

const FriendActivityCard = ({handle, action, postName}: Props) => { // Placeholder friend activity card - will be modified in the future

  
  return (
    <div className="friend-activity-card">
      <div>{handle}</div>
    </div>
  )
}

export default FriendActivityCard
