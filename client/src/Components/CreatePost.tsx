import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';

interface Props {
  
}

const CreatePost = (props: Props) => {

  const { isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    return <div>Please Log In</div>
  }


  return (
    <div>
      <input  style={{marginTop: 10}} type="text" placeholder="What would you like to say?" />
    </div>
  )
}

export default CreatePost
