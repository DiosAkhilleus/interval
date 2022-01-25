import React from 'react'
import Loading from '../PublicComponents/Loading'
import {withAuthenticationRequired} from '@auth0/auth0-react';

interface Props {
  
}

const PostDiscovery = (props: Props) => {
  return (
    <div>
      
    </div>
  )
}

export default withAuthenticationRequired(PostDiscovery, {
  onRedirecting: () => <Loading />,
});
