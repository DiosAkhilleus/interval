import { useEffect, useState } from 'react';
import { Input } from 'reactstrap';
import { GET_USER_WITH_REGEX } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import UserSearchCard from './UserSearchCard';

interface Props {}

const Discover = (props: Props) => {
  // Placeholder discover component - will be modified in the future

  const [userSearchValue, setUserSearchValue] = useState('');

  const userListFromRegex = useQuery(GET_USER_WITH_REGEX, {
    variables: { regex: userSearchValue },
  });

  interface User {
    name: string;
    email: string;
    public_handle: string;
    id: string;
  }

  useEffect(() => {
    if (userListFromRegex.data) {
      console.log(userListFromRegex.data.getUserByHandleRegex);
    }
  }, [userListFromRegex]);
  return (
    <div className="discover-container">
      <h3 style={{ marginTop: 10, color: 'rgb(8, 42, 52' }}>
        Search for Users
      </h3>
      <div className="discover-search">
        <Input
          placeholder="Begin typing..."
          value={userSearchValue}
          onChange={(e) => setUserSearchValue(e.target.value)}
        ></Input>
      </div>
        {userSearchValue !== '' && userListFromRegex.data
          ? userListFromRegex.data.getUserByHandleRegex.map(
              (user: User, index: number) => (
                <UserSearchCard user={user} key={index} />
              )
            )
          : ''}
    </div>
  );
};

export default Discover;
