import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

interface Props {
  handle: string,
  name: string
  interval: number
  tags: Array<String>
  profileImage: string
  postText: string
}

const Post = ({ handle, name, interval, tags, profileImage, postText } :Props) => {
  const { isLoading } = useAuth0();
  
  return (
    <div className="post-container">
      <div className="post-creator-details">
        <div className="post-creator-name-grouping">
          {!isLoading ? (
            <img
              style={{ height: '90%', width: '23%', marginLeft: 4 }}
              src={profileImage}
              alt="Profile"
              className="rounded-circle img-thumbnail"
            />
          ) : (
            ''
          )}
          <h3 style={{ marginBottom: 4, marginLeft: 10 }}>{name}</h3>
        </div>
        <div className="post-interval-number">Interval #{interval} </div>
        <div className="post-creator-handle">{handle}</div>
      </div>
      <div className="post-content-details">{postText}</div>
      <div className="post-content-tags">
        {tags.map((el, id) => (
          <div style={{ marginLeft: 10 }}>{el}</div>
        ))}
      </div>
    </div>
  );
};

export default Post;
