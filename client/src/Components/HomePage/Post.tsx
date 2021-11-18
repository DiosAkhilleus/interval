import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USER_BY_ID } from '../../graphql/queries';
import { HANDLE_USER_VOTE } from '../../graphql/mutations';

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
  id: string;
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

  const [handleUserVote, handleUseVoteData] = useMutation(HANDLE_USER_VOTE);

  useEffect(() => {
    if (data) {
      setImage(data.getUserById[0].profile_image);
    }
  }, [data]);

  const handleVote = (vote: string) => {
    if (vote === 'like') {
      if (likedByUser) {
        handleUserVote({
          variables: { id: postInfo.id, type: 'likes', method: 'decrement' },
        });
      }
      if (!likedByUser) {
        handleUserVote({
          variables: { id: postInfo.id, type: 'likes', method: 'increment' },
        });
      }
      setLikedByUser(!likedByUser);
      if (dislikedByUser === true) {
        setDislikedByUser(false);
        handleUserVote({
          variables: { id: postInfo.id, type: 'dislikes', method: 'decrement' },
        });
      }
    }
    if (vote === 'dislike') {
      if (dislikedByUser) {
        handleUserVote({
          variables: { id: postInfo.id, type: 'dislikes', method: 'decrement' },
        });
      }
      if (!dislikedByUser) {
        handleUserVote({
          variables: { id: postInfo.id, type: 'dislikes', method: 'increment' },
        });
      }
      setDislikedByUser(!dislikedByUser);
      if (likedByUser === true) {
        setLikedByUser(false);
        handleUserVote({
          variables: { id: postInfo.id, type: 'likes', method: 'decrement' },
        });
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
        <div className="vote-number">
          {likedByUser ? postInfo.likes + 1 : postInfo.likes}
        </div>
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
        <div className="vote-number">
          {dislikedByUser ? postInfo.dislikes + 1 : postInfo.dislikes}
        </div>
      </div>
    </div>
  );
};

export default Post;
