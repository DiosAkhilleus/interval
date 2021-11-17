import { useState, useEffect } from 'react';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from './Loading';
import { useQuery, useMutation } from '@apollo/client';
import { GET_CURRENT_USER } from '../graphql/queries';
import { CHANGE_DISPLAY_NAME } from '../graphql/mutations';

interface Props {}

const Profile = (props: Props) => {
  const { user } = useAuth0();
  const { email } = user!;

  const { loading, error, data } = useQuery(GET_CURRENT_USER, {
    variables: { email: email },
  });

  const [changeName, changeNameData] = useMutation(CHANGE_DISPLAY_NAME)

  console.log(changeNameData.data);

  const [profileName, setProfileName] = useState('');
  const [editName, setEditName] = useState(false);
  const [userID, setUserID] = useState('');

  useEffect(() => {
    if (data) {
      setProfileName(data.currentUser[0].name);
      setUserID(data.currentUser[0].id);
    }
  }, [data])
  
  const handleNameEdit = () => {
    console.log(profileName);
    setEditName(true);
  };

  const confirmNameChange = () => {
    console.log(profileName);
    setEditName(false);
    changeName({variables: {name: profileName, id: userID}})
  }

  return (
    <div style={{ marginTop: 10 }}>
      <div className="row align-items-center profile-header">
        <div className="col-md-2 mb-3">
          <img
            src={data ? data.currentUser[0].profile_image : ''}
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

          {data ? <h2>@{data.currentUser[0].public_handle}</h2> : ''}
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
