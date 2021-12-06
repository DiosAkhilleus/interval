import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';

interface User {
  name: string;
  email: string;
  public_handle: string;
  id: string;
  profile_image: string;
}

interface Props {
  user: User;
}

const UserSearchCard = (props: Props) => {
  const { isAuthenticated } = useAuth0();
  const { user } = useAuth0();
  const { email } = user!;

  const [isFollowed, setIsFollowed] = useState(false);

  const handleToggleFollow = () => {
    if (!isFollowed) {
      setIsFollowed(true);
      console.log('now following');
    } else if (isFollowed) {
      setIsFollowed(false);
      console.log('no longer following');
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
