import React from 'react';
import Discover from './Discover';

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

export default UserSearch;
