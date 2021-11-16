import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from './Loading';
import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '../graphql/queries';

interface Props {}

const Profile = (props: Props) => {
  const { user } = useAuth0();
  const { email } = user!;

  const { loading, error, data } = useQuery(GET_CURRENT_USER, {variables: {email: email}});


  return (
    <div style={{ marginTop: 10 }}>
      <div className="row align-items-center profile-header">
        <div className="col-md-2 mb-3">
          <img
            src={data ? data.currentUser[0].profile_image : ''}
            alt="Profile"
            className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
            style={{width: 180}}
          />
        </div>
        <div className="col-md text-center text-md-left">
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
