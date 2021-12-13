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


  return <div>{userInfo.data ? userInfo.data.getUserByID[0].name : ''}</div>;
};


export default withAuthenticationRequired(ViewProfile, {
  onRedirecting: () => <Loading />,
});

