import React from 'react'
import { useMutation } from '@apollo/client';
import { POST_USER } from '../graphql/mutations';

interface Props {
  
}
const PostUser = (props: Props) => {

  const info = {
    profile_image: 'https://s.gravatar.com/avatar/c5aee30741780469d8b802522c6b550d?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fnc.png',
    name: 'Nick Chubb',
    public_handle: '@nchubb27', 
    email: 'nchubb@yahoo.com',
    followers: [],
    following: [],
    posts: []
  }
  //eslint-disable-next-line
  const [postUser, { data, loading, error }] = useMutation(POST_USER)

  if (loading) return <div>'Submitting'</div>
  if (error) return <div>Error {error.message}</div>


  return (
    <div>
      <button onClick={() => {
        postUser({variables: info})
      }}>Post User</button>
    </div>
  )
}

export default PostUser
