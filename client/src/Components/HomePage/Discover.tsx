import React from 'react';

interface Props {}

const Discover = (props: Props) => { // Placeholder discover component - will be modified in the future
  return (
    <div className="discover-container">
      <h3 style={{marginTop: 10}}>Search for Users</h3>
      <div className="discover-search">
        <input type="text" />
      </div>
    </div>
  );
};

export default Discover;
