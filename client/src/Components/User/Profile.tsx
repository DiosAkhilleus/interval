import { useState, useEffect } from 'react';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from '../PublicComponents/Loading';
import { useQuery, useMutation } from '@apollo/client';
import { GET_CURRENT_USER } from '../../graphql/queries';
import { CHANGE_DISPLAY_NAME } from '../../graphql/mutations';

interface Props {}

const Profile = (props: Props) => { // User profile component for currently authenticated user
  const { user } = useAuth0();
  const { email } = user!;

  const currentUser = useQuery(GET_CURRENT_USER, { // Retrieves current user data from the db based on currently authenticated user
    variables: { email: email },
  });

  const [changeName, changeNameData] = useMutation(CHANGE_DISPLAY_NAME) // Modifies user display name based on input

  console.log(changeNameData.data);

  const [profileName, setProfileName] = useState(''); // User's profile name
  const [editName, setEditName] = useState(false); // Is user's name being edited?
  const [userID, setUserID] = useState(''); // Current user's ID from the db

  useEffect(() => {
    if (currentUser.data) {
      setProfileName(currentUser.data.currentUser[0].name);
      setUserID(currentUser.data.currentUser[0].id);
    }
  }, [currentUser])
  
  const handleNameEdit = () => { // Updates state to allow name editing
    console.log(profileName);
    setEditName(true);
  };

  const confirmNameChange = () => { // Posts new name to db
    console.log(profileName);
    setEditName(false);
    changeName({variables: {name: profileName, id: userID}})
  }

  return (
    <div style={{ marginTop: 10 }}>
      <div className="row align-items-center profile-header">
        <div className="col-md-2 mb-3">
          <img
            src={currentUser.data ? currentUser.data.currentUser[0].profile_image : ''}
            alt="Profile"
            className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
            style={{ width: 180 }}
          />
        </div>
        <div className="col-md text-center text-md-left">
          <div className="display-name-box">
            {editName ? (
              <div>
                <input
                  placeholder={profileName}
                  type="text"
                  onChange={(e) => setProfileName(e.target.value)}
                ></input>
                <button onClick={() => confirmNameChange()}>Confirm Name</button>
              </div>
            ) : (
              <div>
                <div>{profileName}</div>
                <button onClick={() => handleNameEdit()}>
                  Edit Display Name
                </button>
              </div>
            )}
          </div>

          {currentUser.data ? <h2>@{currentUser.data.currentUser[0].public_handle}</h2> : ''}
          <p className="lead text-muted">{email}</p>
        </div>
      </div>
      <div className="row">
        <pre className="col-12 text-light bg-dark p-4">
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default withAuthenticationRequired(Profile, {
  onRedirecting: () => <Loading />,
});
