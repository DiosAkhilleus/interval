import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useMutation, useQuery } from '@apollo/client';
import {
  COMPLETE_USER_FOLLOW_REQUEST,
  COMPLETE_USER_UNFOLLOW_REQUEST,
} from '../../graphql/mutations';
import { GET_USER_FOLLOWING } from '../../graphql/queries';

interface User {
  name: string;
  email: string;
  public_handle: string;
  id: string;
  profile_image: string;
}

interface Props {
  user: User;
  currentuserid: string;
}

const UserSearchCard = (props: Props) => {

  const [isFollowed, setIsFollowed] = useState(false); // Is the currently authenticated user following the user represented on this card?

  //eslint-disable-next-line
  const [completeUserFollowRequest, completeUserFollowRequestData] = useMutation(COMPLETE_USER_FOLLOW_REQUEST); // Completes a "follow" request for both the currently authenticated user and the target user
  //eslint-disable-next-line
  const [completeUserUnfollowRequest, completeUserUnfollowRequestData] = useMutation(COMPLETE_USER_UNFOLLOW_REQUEST); // Completes an "unfollow" request for both the currently authenticated user and the target user

  const userFollowing = useQuery(GET_USER_FOLLOWING, { // Retrieves the full list of users the currently authenticated user is following
    variables: {
      id: props.currentuserid,
    },
  });

  useEffect(() => { // If the currently authenticated user is following the user represented by this card, set the "isFollowed" state value to be true
    if (userFollowing.data) {
      if (
        userFollowing.data.getUserByID[0].following.indexOf(props.user.id) > -1
      ) {
        setIsFollowed(true);
      }
    }
    //eslint-disable-next-line
  }, [userFollowing]);

  const handleToggleFollow = () => { // Handles a user follow or unfollow request depending on whether or not the currently authenticated user is already following the user represented by this card
    if (!isFollowed) {
      setIsFollowed(true);
      completeUserFollowRequest({
        variables: {
          current_user_id: props.currentuserid,
          target_user_id: props.user.id,
        },
      });
    } else if (isFollowed) {
      setIsFollowed(false);
      completeUserUnfollowRequest({
        variables: {
          current_user_id: props.currentuserid, 
          target_user_id: props.user.id
        }
      })
    }
    setIsFollowed(!isFollowed);
  };

  return (
    <div className="user-search-result">
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          height: 80,
        }}
      >
        <img
          style={{ marginLeft: 10, height: '90%' }}
          className="rounded-circle img-thumbnail"
          src={props.user.profile_image}
          alt="Profile"
        />
        <div style={{ margin: 10 }}>
          <h3 style={{ marginBottom: 0 }}>{props.user.name}</h3>
          <div>@{props.user.public_handle}</div>
        </div>
      </div>
      {!isFollowed ? (
        <Button
          style={{ marginRight: 10 }}
          variant="primary"
          onClick={() => handleToggleFollow()}
        >
          Follow
        </Button>
      ) : (
        <Button
          style={{ marginRight: 10 }}
          variant="danger"
          onClick={() => handleToggleFollow()}
        >
          Unfollow
        </Button>
      )}
    </div>
  );
};

export default UserSearchCard;
