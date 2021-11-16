import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

interface Props {}

const CreatePost = (props: Props) => {
  const { isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    return <div>Please Log In</div>;
  }

  const submitPost = () => {};

  return (
    <div
      className='create-post-container'
    >
      <input
        style={{ margin: 10 }}
        type="text"
        placeholder="What would you like to say?"
      />
      <button
        style={{ marginLeft: 10 }}
        className="btn btn-primary btn-block"
        onClick={() => submitPost()}
      >
        Submit Post
      </button>
    </div>
  );
};

export default CreatePost;
