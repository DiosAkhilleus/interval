import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
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
  console.log(props.currentuserid);
  const { isAuthenticated } = useAuth0();
  const { user } = useAuth0();
  const { email } = user!;

  const [isFollowed, setIsFollowed] = useState(false);

  const [completeUserFollowRequest, completeUserFollowRequestData] = useMutation(COMPLETE_USER_FOLLOW_REQUEST);
  const [completeUserUnfollowRequest, completeUserUnfollowRequestData] = useMutation(COMPLETE_USER_UNFOLLOW_REQUEST);

  const userFollowing = useQuery(GET_USER_FOLLOWING, {
    variables: {
      id: props.currentuserid,
    },
  });

  useEffect(() => {
    if (userFollowing.data) {
      if (
        userFollowing.data.getUserById[0].following.indexOf(props.user.id) > -1
      ) {
        setIsFollowed(true);
      }
    }
  }, [userFollowing]);

  const handleToggleFollow = () => {
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
