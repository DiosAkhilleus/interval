import React from 'react'
import Loading from '../PublicComponents/Loading';
import PostDiscovery from './PostDiscovery';
import {withAuthenticationRequired} from '@auth0/auth0-react';

interface Props {
  
}

const PostSearch = (props: Props) => {
  return (
    <div className='home-page-container'>
      <div className='user-search-page-card'>
        <PostDiscovery />
      </div>
    </div>
  )
}

export default withAuthenticationRequired(PostSearch, {
  onRedirecting: () => <Loading />,
});
