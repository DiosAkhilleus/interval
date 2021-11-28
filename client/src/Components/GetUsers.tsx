import React from 'react';
import { GET_ALL_USERS } from '../graphql/queries';
import { useQuery } from '@apollo/client';

interface Props {}

const GetUsers = (props: Props) => {
  const { loading, error, data } = useQuery(GET_ALL_USERS); // Retrieves all users – for future use?

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  interface User {
    email: string;
    name: string;
    profile_image: string;
  }

  
  return (
    <div>
      {data.users.map((user: User, index: Number) => (
        <div>
          <img src={user.profile_image} alt="" className="rounded-circle img-thumbnail" />
          <h3>{user.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default GetUsers;
