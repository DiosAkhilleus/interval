import { GET_USER_PROFILE } from '../../graphql/queries';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';

interface Props {
  userID: string;
}

const UserProfileFollowing = (props: Props) => {
  const userInfo = useQuery(GET_USER_PROFILE, {
    // Retrieves the user who created the current post
    variables: { id: props.userID },
  });

  return (
    <div className="user-profile-info-card">
      <div className="user-profile-info-card-content">
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          {userInfo.data ? (
            <img
              style={{ marginLeft: 10, height: 60, width: 60 }}
              className="rounded-circle img-thumbnail"
              src={userInfo.data.getUserByID[0].profile_image}
              alt="Profile"
            />
          ) : (
            ''
          )}

          <div style={{ fontSize: 24, marginLeft: 10 }}>
            {userInfo.data ? `${userInfo.data.getUserByID[0].name}` : ''}
          </div>
        </div>
        <div style={{ fontSize: 20 }}>
          <Link style={{ color: 'darkcyan' }} to={`/users/${props.userID}`}>
            <div>
              @
              {userInfo.data
                ? `${userInfo.data.getUserByID[0].public_handle}`
                : ''}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserProfileFollowing;
