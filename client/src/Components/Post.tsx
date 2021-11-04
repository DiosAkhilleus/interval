import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

interface Props {}

const Post = (props: Props) => {
  const { user } = useAuth0();
  const { name, picture } = user!;
  const handle: string = '@jimbrown';
  const intervalNumber: number = 245;
  const postText: string =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed tincidunt lorem. Suspendisse sit amet tellus fringilla, posuere neque eget, venenatis mauris.';
  const postTags = ['#asdf', '#cheese', '#apples', '#coolstuff']
  return (
    <div className="post-container">
      <div className="post-creator-details">
        <div className="post-creator-name-grouping">
          <img
            style={{ height: '90%', marginLeft: 4 }}
            src={picture}
            alt="Profile"
            className="rounded-circle img-thumbnail"
          />
          <h3 style={{ marginBottom: 4, marginLeft: 10 }}>{name}</h3>
        </div>
        <div className="post-interval-number">Interval #{intervalNumber} </div>
        <div className="post-creator-handle">{handle}</div>
      </div>
      <div className="post-content-details">{postText}</div>
      <div className="post-content-tags">
        {postTags.map((el, id) => <div style={{marginLeft: 10}}>{el}</div>)}
      </div>
    </div>
  );
};

export default Post;
