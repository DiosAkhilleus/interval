import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USER_BY_ID } from '../../graphql/queries';
import {
  MODIFY_POST_WITH_VOTE,
  MODIFY_USER_VOTE_FIELDS,
} from '../../graphql/mutations';
import { Button } from 'react-bootstrap';

interface Entities {
  tags: Array<string>;
}
interface PostInterface {
  profile_image: string;
  posted_by: string;
  title: string;
  tags: any;
  text: Array<string>;
  entities: Entities;
  likes: number;
  dislikes: number;
  id: string;
}

interface Props {
  postInfo: PostInterface;
  currentUserLikedPosts: Array<string>;
  currentUserDislikedPosts: Array<string>;
  currentUserId: String;
}

const Post = ({
  postInfo,
  currentUserLikedPosts,
  currentUserDislikedPosts,
  currentUserId,
}: Props) => {
  // console.log(currentUserDislikedPosts, currentUserLikedPosts)

  const { isLoading } = useAuth0();
  const [image, setImage] = useState('');
  const [likedByUser, setLikedByUser] = useState(false);
  const [dislikedByUser, setDislikedByUser] = useState(false);
  const [postLikes, setPostLikes] = useState(postInfo.likes);
  const [postDislikes, setPostDislikes] = useState(postInfo.dislikes);

  const { loading, error, data } = useQuery(GET_USER_BY_ID, {
    variables: { id: postInfo.posted_by },
  });

  const [modifyPostWithVote, modifyPostWithVoteData] = useMutation(
    MODIFY_POST_WITH_VOTE
  );
  const [modifyUserVoteFields, modifyUserVoteFieldsData] = useMutation(
    MODIFY_USER_VOTE_FIELDS
  );

  useEffect(() => {
    if (data) {
      setImage(data.getUserById[0].profile_image);
      console.log(currentUserLikedPosts, currentUserDislikedPosts);
      console.log(postInfo.id);
      const filteredUserLikes = currentUserLikedPosts.filter(
        (el: string) => el === postInfo.id
      );
      const filteredUserDislikes = currentUserDislikedPosts.filter(
        (el: string) => el === postInfo.id
      );
      if (filteredUserLikes.length > 0) {
        setLikedByUser(true);
      }
      if (filteredUserDislikes.length > 0) {
        setDislikedByUser(true);
      }
    }
  }, [data]);

  const handleVote = (vote: string) => {
    if (vote === 'like') {
      if (likedByUser) {
        setPostLikes(postLikes - 1);
        modifyPostWithVote({
          variables: { id: postInfo.id, type: 'likes', method: 'decrement' },
        });
        modifyUserVoteFields({
          variables: {
            user_id: currentUserId,
            post_id: postInfo.id,
            type: 'liked_posts',
            method: 'remove',
          },
        });
      }
      if (!likedByUser) {
        setPostLikes(postLikes + 1);
        modifyPostWithVote({
          variables: { id: postInfo.id, type: 'likes', method: 'increment' },
        });
        modifyUserVoteFields({
          variables: {
            user_id: currentUserId,
            post_id: postInfo.id,
            type: 'liked_posts',
            method: 'add',
          },
        });
        if (dislikedByUser === true) {
          setDislikedByUser(false);
          setPostDislikes(postDislikes - 1);
          modifyPostWithVote({
            variables: {
              id: postInfo.id,
              type: 'dislikes',
              method: 'decrement',
            },
          });
          modifyUserVoteFields({
            variables: {
              user_id: currentUserId,
              post_id: postInfo.id,
              type: 'disliked_posts',
              method: 'remove',
            },
          });
        }
      }
      setLikedByUser(!likedByUser);
    }

    if (vote === 'dislike') {
      if (dislikedByUser) {
        setPostDislikes(postDislikes - 1);
        modifyPostWithVote({
          variables: { id: postInfo.id, type: 'dislikes', method: 'decrement' },
        });
        modifyUserVoteFields({
          variables: {
            user_id: currentUserId,
            post_id: postInfo.id,
            type: 'disliked_posts',
            method: 'remove',
          },
        });
      }
      if (!dislikedByUser) {
        setPostDislikes(postDislikes + 1);
        modifyPostWithVote({
          variables: { id: postInfo.id, type: 'dislikes', method: 'increment' },
        });
        modifyUserVoteFields({
          variables: {
            user_id: currentUserId,
            post_id: postInfo.id,
            type: 'disliked_posts',
            method: 'add',
          },
        });
        if (likedByUser === true) {
          setPostLikes(postLikes - 1);
          setLikedByUser(false);
          modifyPostWithVote({
            variables: { id: postInfo.id, type: 'likes', method: 'decrement' },
          });
          modifyUserVoteFields({
            variables: {
              user_id: currentUserId,
              post_id: postInfo.id,
              type: 'liked_posts',
              method: 'remove',
            },
          });
        }
      }
      setDislikedByUser(!dislikedByUser);
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
              {postInfo.title}
            </h3>
          </div>
          {/* <div className="post-interval-number">Interval #{interval} </div> */}
          <div className="post-creator-handle">
              {data ? (
                <div>
                  <strong>{data.getUserById[0].name}</strong>
                  <div>@{data.getUserById[0].public_handle}</div>
                </div>
              ) : (
                ''
              )}
          </div>
        </div>
        <div className="post-content-details">
          <div>{postInfo.text}</div>
          <div className="reply-button-div">
            <Button
              href={`/post/${postInfo.posted_by}/${postInfo.id}`}
              variant="outline-primary"
            >
              See Post & Replies...
            </Button>{' '}
          </div>
        </div>

        <div className="post-content-tags">
          {postInfo.entities.tags.map((el: string, id: number) => (
            <div style={{ marginLeft: 10 }}>{el}</div>
          ))}
        </div>
      </div>
      <div className="post-interaction-container">
        <div className="vote-number">{postLikes}</div>
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
        <div className="vote-number">{postDislikes}</div>
      </div>
    </div>
  );
};

export default Post;
