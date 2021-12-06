import React from 'react';

interface User {
  name: string;
  email: string;
  public_handle: string;
  id: string;
}

interface Props {
  user: User;
}

const UserSearchCard = (props: Props) => {
  console.log(props.user.name)


  return <div style={{ width: '100%', height: 100, color: 'black', textAlign: 'center' }}>{props.user.public_handle}</div>;
};

export default UserSearchCard;
