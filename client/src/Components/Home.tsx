import React from 'react';
import NavBar from './Nav/NavBar';
import { useAuth0 } from '@auth0/auth0-react';
interface Props {}

const Home = (props: Props) => {
  const { isAuthenticated, isLoading } = useAuth0();

  return (
    <div>
      <NavBar />
      {!isLoading ? (
        isAuthenticated ? (
          <div className="dashboard-container">Main Content</div>
        ) : (
          <div>Please Log In or Sign Up</div>
        )
      ) : (
        ''
      )}
    </div>
  );
};

export default Home;
