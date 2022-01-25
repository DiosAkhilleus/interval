import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_USER_PROFILE } from '../../graphql/queries';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from '../PublicComponents/Loading'

interface Props {}

// This component will be for viewing another user's profile...

const ViewProfile = (props: Props) => {


  const { userID } = useParams<{ userID?: string }>();

  const userInfo = useQuery(GET_USER_PROFILE, {
    // Retrieves the user who created the current post
    variables: { id: userID },
  });

  return (
    <div className="home-page-container">
      <div className="post-page-card" style={{ overflowX: 'hidden' }}>
        <div className="row align-items-center profile-header">
          <div className="col-md-2 mb-3">
            <img
              src={
                userInfo.data
                  ? userInfo.data.getUserByID[0].profile_image
                  : ''
              }
              alt="Profile"
              className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
              style={{ width: 180, margin: 15 }}
            />
          </div>
          <div className="col-md text-center text-md-left">
            {userInfo.data ? <h2>{userInfo.data.getUserByID[0].name}</h2> : ''}
            {userInfo.data ? (
              <h4 className='lead text-muted'>@{userInfo.data.getUserByID[0].public_handle}</h4>
            ) : (
              ''
            )}
            {/* <p className="lead text-muted">{email}</p> */}
          </div>
        </div>
        <div className="user-profile-content-container">
          <div className="user-profile-content">
            <h4
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgb(248, 249, 250)',
                width: '95%',
                minHeight: 48,
                fontSize: 24,
                borderBottom: '2px solid rgb(8, 42, 52)',
              }}
              className="sticky-top"
            >
              Posts by {userInfo.data ? `@${userInfo.data.getUserByID[0].public_handle}` : ''}
            </h4>
            <div className="mobile-spacer"></div>
            {/* {userInfo.data &&
            userInfo.data.currentUser[0].posts.length > 0
              ? userInfo.data.currentUser[0].posts.map(
                  (post: string, index: number) => (
                    <UserProfilePost
                      postID={post}
                      userID={userID}
                      key={index}
                    />
                  )
                )
              : ''} */}
            <div style={{ minHeight: 20, minWidth: '100%' }}></div>
          </div>
          <div className="user-profile-content">
            <h4
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgb(248, 249, 250)',
                width: '95%',
                minHeight: 48,
                fontSize: 24,
                borderBottom: '2px solid rgb(8, 42, 52)',
              }}
              className="sticky-top"
            >
              Users {userInfo.data ? `@${userInfo.data.getUserByID[0].public_handle}` : ''} Follows
            </h4>
          <div className="mobile-spacer"></div>
            {/* {userInfo.data
              ? userInfo.data.getUserByID[0].following.map(
                  (userID: string, index: string) => (
                    <UserProfileFollowing userID={userID} key={index} />
                  )
                )
              : ''} */}
          </div>
        </div>
      </div>
    </div>
  );
};


export default withAuthenticationRequired(ViewProfile, {
  onRedirecting: () => <Loading />,
});

