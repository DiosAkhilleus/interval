import React from 'react';
import Discover from './Discover';
import Loading from '../PublicComponents/Loading';
import { withAuthenticationRequired } from '@auth0/auth0-react';

interface Props {}

const UserSearch = (props: Props) => {
  return (
    <div className="home-page-container">
      <div className="user-search-page-card">
          <Discover />
      </div>
    </div>
  );
};

export default withAuthenticationRequired(UserSearch, {
  onRedirecting: () => <Loading />,
});

