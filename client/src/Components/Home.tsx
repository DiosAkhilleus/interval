import React from 'react';
import Loading from './Loading';
import { useAuth0 } from '@auth0/auth0-react';
interface Props {}

const Home = (props: Props) => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
     HOME PAGE
    </div>
  );
};

export default Home;
