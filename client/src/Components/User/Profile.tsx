import { useState, useEffect } from 'react';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from '../PublicComponents/Loading';
import { useQuery, useMutation } from '@apollo/client';
import { GET_CURRENT_USER } from '../../graphql/queries';
import { CHANGE_DISPLAY_NAME } from '../../graphql/mutations';
import Post from '../HomePage/Post';
import UserProfilePost from './UserProfilePost';

interface Props {}

const Profile = (props: Props) => {
  // User profile component for currently authenticated user
  const { user } = useAuth0();
  const { email } = user!;

  const currentUser = useQuery(GET_CURRENT_USER, {
    // Retrieves current user data from the db based on currently authenticated user
    variables: { email: email },
  });

  const [changeName, changeNameData] = useMutation(CHANGE_DISPLAY_NAME); // Modifies user display name based on input

  console.log(changeNameData.data);

  const [profileName, setProfileName] = useState(''); // User's profile name
  const [editName, setEditName] = useState(false); // Is user's name being edited?
  const [userID, setUserID] = useState(''); // Current user's ID from the db

  useEffect(() => {
    if (currentUser.data) {
      setProfileName(currentUser.data.currentUser[0].name);
      setUserID(currentUser.data.currentUser[0].id);
      console.log(currentUser.data.currentUser[0].posts);
    }
  }, [currentUser]);

  const handleNameEdit = () => {
    // Updates state to allow name editing
    console.log(profileName);
    setEditName(true);
  };

  const confirmNameChange = () => {
    // Posts new name to db
    console.log(profileName);
    setEditName(false);
    changeName({ variables: { name: profileName, id: userID } });
  };

  interface Entities {
    tags: Array<string>;
  }
  interface Post {
    profile_image: string;
    posted_by: string;
    title: string;
    tags: any;
    text: Array<string>;
    entities: Entities;
    likes: number;
    dislikes: number;
    id: string;
    replies: Array<string>;
  }

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
              style={{ width: 180 }}
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
        <div className="user-profile-posts">
          {currentUser.data
            ? currentUser.data.currentUser[0].posts.map(
                (post: string, index: number) => (
                  <UserProfilePost postID={post} userID={userID} key={index} />
                )
              )
            : ''}
        </div>
      </div>
    </div>
  );
};

export default withAuthenticationRequired(Profile, {
  onRedirecting: () => <Loading />,
});
