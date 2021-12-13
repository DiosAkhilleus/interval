import { useState, useEffect } from 'react';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from '../PublicComponents/Loading';
import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '../../graphql/queries';
import UserProfilePost from './UserProfilePost';
import UserProfileFollowing from './UserProfileFollowing';

interface Props {}

const Profile = (props: Props) => {
  // User profile component for currently authenticated user
  const { user } = useAuth0();
  const { email } = user!;

  const currentUser = useQuery(GET_CURRENT_USER, {
    // Retrieves current user data from the db based on currently authenticated user
    variables: { email: email },
  });

  //eslint-disable-next-line
  const [profileName, setProfileName] = useState(''); // User's profile name
  const [userID, setUserID] = useState(''); // Current user's ID from the db

  useEffect(() => {
    // Sets state variables with query values
    if (currentUser.data) {
      setProfileName(currentUser.data.currentUser[0].name);
      setUserID(currentUser.data.currentUser[0].id);
      console.log(currentUser.data.currentUser[0].posts);
    }
  }, [currentUser]);

  return (
    <div className="home-page-container">
      <div className="post-page-card" style={{ overflowX: 'hidden' }}>
        <div className="row align-items-center profile-header">
          <div className="col-md-2 mb-3">
            <img
              src={
                currentUser.data
                  ? currentUser.data.currentUser[0].profile_image
                  : ''
              }
              alt="Profile"
              className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
              style={{ width: 180, margin: 15 }}
            />
          </div>
          <div className="col-md text-center text-md-left">
            {currentUser.data ? (
              <h2>@{currentUser.data.currentUser[0].public_handle}</h2>
            ) : (
              ''
            )}
            <p className="lead text-muted">{email}</p>
          </div>
        </div>
        <div className="user-profile-content-container">
          <div className="user-profile-content">
            <h4
              style={{ marginTop: 10, marginBottom: 0 }}
              className="sticky-top"
            >
              Your Posts
            </h4>
            {currentUser.data &&
            currentUser.data.currentUser[0].posts.length > 0
              ? currentUser.data.currentUser[0].posts.map(
                  (post: string, index: number) => (
                    <UserProfilePost
                      postID={post}
                      userID={userID}
                      key={index}
                    />
                  )
                )
              : ''}
          </div>
          <div className="user-profile-content">
            <h4
              style={{ marginTop: 10, marginBottom: 0 }}
              className="sticky-top"
            >
              Users You Follow
            </h4>
            {currentUser.data ? currentUser.data.currentUser[0].following.map(
              (userID: string, index: string) => (
                <UserProfileFollowing userID={userID} key={index} />
              )
            ) : ''}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuthenticationRequired(Profile, {
  onRedirecting: () => <Loading />,
});
