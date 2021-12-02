import { useEffect, useState } from 'react';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_CURRENT_USER } from '../../graphql/queries';
import { CHANGE_DISPLAY_NAME, CHANGE_PUBLIC_HANDLE } from '../../graphql/mutations';
import { Button } from 'react-bootstrap';
import Loading from '../PublicComponents/Loading';
import { Input } from 'reactstrap';

interface Props {}

const Settings = (props: Props) => {
  const { user } = useAuth0();
  const { email } = user!;

  const [profileName, setProfileName] = useState(''); // User's profile name
  const [newProfileName, setNewProfileName] = useState('');
  const [publicHandle, setPublicHandle] = useState(''); // User's profile name
  const [newPublicHandle, setNewPublicHandle] = useState('');
  const [editName, setEditName] = useState(false); // Is user's name being edited?
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

  useEffect(() => {
    if (currentUser.data) {
      setProfileName(currentUser.data.currentUser[0].name);
      setNewProfileName(currentUser.data.currentUser[0].name);
      setUserID(currentUser.data.currentUser[0].id);
      setPublicHandle(currentUser.data.currentUser[0].public_handle);
      setNewPublicHandle(currentUser.data.currentUser[0].public_handle);
    }
  }, [currentUser]);

  const handleConfirmName = () => {
    if (newProfileName.length <= 5) {
      alert("Your public name must be at least 5 characters");
    } else {
      setEditName(false);
      changeName({ variables: { name: newProfileName, id: userID } });
    }
    
  };

  const handleCancelNameChange = () => {
    setNewProfileName(profileName);
    setEditName(false);
  };

  const handleConfirmHandle = () => {
    if (newPublicHandle.length <= 3) {
      alert("You must create a handle of at least 4 characters")
    } else {
      setEditHandle(false);
      changeHandle({ variables: { public_handle: newPublicHandle, id: userID } });
    }
  };

  const handleCancelHandleChange = () => {
    setNewPublicHandle(publicHandle);
    setEditHandle(false);
  };

  return (
    <div className="settings-container">
      <div className="settings-page-card">
        <h2 style={{textAlign: 'center', borderBottom: '2px solid rgb(8, 42, 52)', marginTop: 6, marginBottom: 0, verticalAlign: 'middle', paddingBottom: 10}}>Your Settings</h2>
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
      </div>
    </div>
  );
};

export default withAuthenticationRequired(Settings, {
  onRedirecting: () => <Loading />,
});
