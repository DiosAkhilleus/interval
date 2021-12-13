import { useState } from 'react';
import { Input } from 'reactstrap';
import { GET_CURRENT_USER, GET_USER_WITH_REGEX } from '../../graphql/queries';
import { useQuery } from '@apollo/client';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from '../PublicComponents/Loading';
import UserSearchCard from './UserSearchCard';

interface Props {}

const Discover = (props: Props) => {

  const { user } = useAuth0(); // Pulls current user from Auth0
  const { email } = user!; // Retrieves email from currently authenticated user

  const [userSearchValue, setUserSearchValue] = useState(''); // The current value of the text typed into the search bar

  const userListFromRegex = useQuery(GET_USER_WITH_REGEX, { // Retrieves users from DB with regex
    variables: { regex: userSearchValue },
  });

  const currentUser = useQuery(GET_CURRENT_USER, { // Retrieves the currently authenticated user form the DB
    variables: { email: email }
  }) 

  interface User {
    name: string;
    email: string;
    public_handle: string;
    id: string;
    profile_image: string;
  }
  
  return (
    <div className="discover-container">
      <h3 style={{ textAlign: 'center', marginTop: 20, color: 'rgb(8, 42, 52' }}>
        Search for Users
      </h3>
      <div className="discover-search">
        <Input
          style={{marginBottom: 10}}
          placeholder="Begin typing..."
          value={userSearchValue}
          onChange={(e) => setUserSearchValue(e.target.value)}
        ></Input>
      </div>
      <div className='search-results-container'>
      {userSearchValue !== '' && userListFromRegex.data && currentUser.data
          ? userListFromRegex.data.getUserByHandleRegex.filter((el: User) => el.id !== currentUser.data.currentUser[0].id).map(
              (user: User, index: number) => (
                <UserSearchCard user={user} key={index} currentuserid={currentUser.data.currentUser[0].id} />
              )
            )
          : ''}
      </div>
        
    </div>
  );
};

export default withAuthenticationRequired(Discover, {
  onRedirecting: () => <Loading />,
});
