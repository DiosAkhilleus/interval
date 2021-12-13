import { useEffect, useState } from 'react';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_CURRENT_USER } from '../../graphql/queries';
import {
  CHANGE_DISPLAY_NAME,
  CHANGE_PUBLIC_HANDLE,
  CHANGE_PROFILE_IMAGE,
} from '../../graphql/mutations';
import { Button } from 'react-bootstrap';
import Loading from '../PublicComponents/Loading';
import { Input } from 'reactstrap';

interface Props {}

const Settings = (props: Props) => {
  const { user } = useAuth0(); // Pulls user data from auth0
  const { email } = user!; // Retrieves email from auth0 user info

  const [profileName, setProfileName] = useState(''); // User's profile name
  const [newProfileName, setNewProfileName] = useState(''); // User's new profile name
  const [profileImage, setProfileImage] = useState(''); // User's profile image
  const [newProfileImage, setNewProfileImage] = useState(''); // User's new profile image
  const [publicHandle, setPublicHandle] = useState(''); // User's public handle
  const [newPublicHandle, setNewPublicHandle] = useState(''); // User's new public handle
  const [editName, setEditName] = useState(false); // Is user's name being edited?
  const [editProfileImage, setEditProfileImage] = useState(false); // Is user's profile image being edited?
  const [editHandle, setEditHandle] = useState(false); // Is user's name being edited?
  const [userID, setUserID] = useState(''); // Current user's ID from the db

  const currentUser = useQuery(GET_CURRENT_USER, {
    // Retrieves current user data from the db based on currently authenticated user
    variables: { email: email },
  });
  //eslint-disable-next-line
  const [changeName, changeNameData] = useMutation(CHANGE_DISPLAY_NAME); // Modifies user display name based on input
  //eslint-disable-next-line
  const [changeHandle, changeHandleData] = useMutation(CHANGE_PUBLIC_HANDLE); // Modifies user display name based on input
  //eslint-disable-next-line
  const [changeProfileImage, changeProfileImageData] = useMutation(CHANGE_PROFILE_IMAGE) //Modifies user profile img based on input
  
  useEffect(() => { // Sets state variables with data returned from DB
    if (currentUser.data) {
      setProfileName(currentUser.data.currentUser[0].name);
      setNewProfileName(currentUser.data.currentUser[0].name);
      setUserID(currentUser.data.currentUser[0].id);
      setPublicHandle(currentUser.data.currentUser[0].public_handle);
      setNewPublicHandle(currentUser.data.currentUser[0].public_handle);
      setProfileImage(currentUser.data.currentUser[0].profile_image);
      setNewProfileImage(currentUser.data.currentUser[0].profile_image);
    }
  }, [currentUser]);

  const handleConfirmName = () => { // Handles confirmation of new profile name
    if (newProfileName.length <= 5) {
      alert('Your public name must be at least 5 characters');
    } else {
      setEditName(false);
      changeName({ variables: { name: newProfileName, id: userID } });
    }
  };

  const handleCancelNameChange = () => { // Handles name change cancelation
    setNewProfileName(profileName);
    setEditName(false);
  };

  const handleConfirmHandle = () => { // Handles confirmation of new public handle
    if (newPublicHandle.length <= 3) {
      alert('You must create a handle of at least 4 characters');
    } else {
      setEditHandle(false);
      changeHandle({
        variables: { public_handle: newPublicHandle, id: userID },
      });
    }
  };

  const handleCancelHandleChange = () => { // Handles cancelation of public handle change
    setNewPublicHandle(publicHandle);
    setEditHandle(false);
  };

  const handleCancelProfileImageChange = () => { // Handles cancelation of profile image link change
    setNewProfileImage(profileImage);
    setEditProfileImage(false);
  };

  const handleConfirmProfileImage = () => { // Handles confirmation of new profile image link
    if (newProfileImage === '') {
      alert('You must enter an image url');
    } else {
      setEditProfileImage(false);
      changeProfileImage({
        variables: { profile_image: newProfileImage, id: userID },
      });
    }
  };

  return (
    <div className="settings-container">
      <div className="settings-page-card">
        <h2
          style={{
            textAlign: 'center',
            borderBottom: '2px solid rgb(8, 42, 52)',
            marginTop: 6,
            marginBottom: 0,
            verticalAlign: 'middle',
            paddingBottom: 10,
          }}
        >
          Your Settings
        </h2>
        <div className="settings-option">
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <strong style={{ fontSize: 24 }}>Display Name:</strong>{' '}
            <div style={{ fontSize: 24, marginLeft: 14 }}>{newProfileName}</div>
          </div>
          {!editName ? (
            <Button variant="outline-primary" onClick={() => setEditName(true)}>
              Change Display Name
            </Button>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <Input
                maxLength={15}
                minLength={3}
                value={newProfileName}
                onChange={(e) => setNewProfileName(e.target.value)}
              />
              <Button
                variant="danger"
                style={{ marginLeft: 10 }}
                onClick={() => handleCancelNameChange()}
              >
                Cancel
              </Button>
              <Button
                style={{ marginLeft: 10 }}
                onClick={() => handleConfirmName()}
              >
                Confirm
              </Button>
            </div>
          )}
        </div>
        <div className="settings-option">
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <strong style={{ fontSize: 24 }}>Public Handle:</strong>{' '}
            <div style={{ fontSize: 24, marginLeft: 14 }}>
              {newPublicHandle !== '' ? `@${newPublicHandle}` : ''}
            </div>
          </div>
          {!editHandle ? (
            <Button
              variant="outline-primary"
              onClick={() => setEditHandle(true)}
            >
              Change Handle
            </Button>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <Input
                maxLength={15}
                minLength={3}
                value={newPublicHandle}
                onChange={(e) => setNewPublicHandle(e.target.value)}
              />
              <Button
                variant="danger"
                style={{ marginLeft: 10 }}
                onClick={() => handleCancelHandleChange()}
              >
                Cancel
              </Button>
              <Button
                style={{ marginLeft: 10 }}
                onClick={() => handleConfirmHandle()}
              >
                Confirm
              </Button>
            </div>
          )}
        </div>
        <div className="settings-option">
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <strong style={{ fontSize: 24 }}>Profile Image:</strong>{' '}
            <img
              src={newProfileImage}
              alt="profile-img"
              className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
              style={{ height: 80, marginLeft: 20 }}
            />
          </div>
          {!editProfileImage ? (
            <Button
              variant="outline-primary"
              onClick={() => setEditProfileImage(true)}
            >
              Change Profile Image
            </Button>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <Input
                value={newProfileImage}
                onChange={(e) => setNewProfileImage(e.target.value)}
              />
              <Button
                variant="danger"
                style={{ marginLeft: 10 }}
                onClick={() => handleCancelProfileImageChange()}
              >
                Cancel
              </Button>
              <Button
                style={{ marginLeft: 10 }}
                onClick={() => handleConfirmProfileImage()}
              >
                Confirm
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default withAuthenticationRequired(Settings, {
  onRedirecting: () => <Loading />,
});
