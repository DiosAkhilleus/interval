import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from '@apollo/client';
import { GET_USER_BY_ID } from '../../graphql/queries';

interface Entities {
  tags: Array<string>;
}
interface PostInterface {
  profile_image: string;
  posted_by: string;
  tags: any;
  text: Array<string>;
  entities: Entities;
  likes: number;
  dislikes: number;
}

interface Props {
  postInfo: PostInterface;
}

const Post = ({ postInfo }: Props) => {
  const { isLoading } = useAuth0();
  const [image, setImage] = useState('');
  const [likedByUser, setLikedByUser] = useState(false);
  const [dislikedByUser, setDislikedByUser] = useState(false);

  const { loading, error, data } = useQuery(GET_USER_BY_ID, {
    variables: { id: postInfo.posted_by },
  });

  useEffect(() => {
    if (data) {
      setImage(data.getUserById[0].profile_image);
    }
  }, [data]);

  const handleVote = (vote: string) => {
    if (vote === 'like') {
      setLikedByUser(!likedByUser);
      if (dislikedByUser === true) {
        setDislikedByUser(false);
      }
    }
    if (vote === 'dislike') {
      setDislikedByUser(!dislikedByUser);
      if (likedByUser === true) {
        setLikedByUser(false);
      }
    }
  };

  return (
    <div className="post-outer-container">
      <div className="post-inner-container">
        <div className="post-creator-details">
          <div className="post-creator-name-grouping">
            {!isLoading ? (
              <img
                style={{ height: '100%' }}
                src={image}
                alt="Profile"
                className="rounded-circle img-thumbnail"
              />
            ) : (
              ''
            )}
            <h3 style={{ width: '100%', marginBottom: 4, marginLeft: 10 }}>
              {data ? data.getUserById[0].name : ''}
            </h3>
          </div>
          {/* <div className="post-interval-number">Interval #{interval} </div> */}
          <div className="post-creator-handle">
            @{data ? data.getUserById[0].public_handle : ''}
          </div>
        </div>
        <div className="post-content-details">{postInfo.text}</div>
        <div className="post-content-tags">
          {postInfo.entities.tags.map((el: string, id: number) => (
            <div style={{ marginLeft: 10 }}>{el}</div>
          ))}
        </div>
      </div>
      <div className="post-interaction-container">
        <div className="vote-number">{postInfo.likes}</div>
        <div className="vote-button" onClick={() => handleVote('like')}>
          {likedByUser ? (
            <img
              src="https://img.icons8.com/ios-filled/64/000000/facebook-like.png"
              alt="like-filled"
            />
          ) : (
            <img
              src="https://img.icons8.com/ios/64/000000/facebook-like.png"
              alt="like"
            />
          )}
        </div>
        <div className="vote-button" onClick={() => handleVote('dislike')}>
          {dislikedByUser ? (
            <img
              style={{ transform: 'scale(1, -1)' }}
              src="https://img.icons8.com/ios-filled/64/000000/facebook-like.png"
              alt="like-filled"
            />
          ) : (
            <img
              style={{ transform: 'scale(1, -1)' }}
              src="https://img.icons8.com/ios/64/000000/facebook-like.png"
              alt="like"
            />
          )}
        </div>
        <div className="vote-number">{postInfo.dislikes}</div>
      </div>
    </div>
  );
};

export default Post;
