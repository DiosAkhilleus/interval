import { useEffect, useState } from 'react';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_CURRENT_USER } from '../../graphql/queries';
import { CHANGE_DISPLAY_NAME } from '../../graphql/mutations';
import { Button } from 'react-bootstrap';
import Loading from '../PublicComponents/Loading';
import { Input } from 'reactstrap';
import { findByLabelText } from '@testing-library/dom';

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

  const [changeName, changeNameData] = useMutation(CHANGE_DISPLAY_NAME); // Modifies user display name based on input

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
    setEditName(false);
    changeName({ variables: { name: newProfileName, id: userID } });
  };

  const handleCancelNameChange = () => {
    setNewProfileName(profileName);
    setEditName(false);
  };

  const handleConfirmHandle = () => {
    setEditHandle(false);
  };

  const handleCancelHandleChange = () => {
    setNewPublicHandle(publicHandle);
    setEditHandle(false);
  };

  return (
    <div className="settings-container">
      <div className="settings-page-card">
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
              @{newPublicHandle}
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
