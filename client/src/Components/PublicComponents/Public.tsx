import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

interface Props {}

const Public = (props: Props) => { // External view page for when a user is unauthenticated. 

  const { isAuthenticated } = useAuth0(); // Checks if current user is authenticated

  if (isAuthenticated) {
    window.location.href = '/home';
  }

  return (
    <div className="public-page-container">
      <div className='public-text'>
        <div className="public-title">Interval</div>
        <div className='public-subtitle'>In order to continue, please log in.</div>
      </div>
    </div>
  );
};

export default Public;
