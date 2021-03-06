import React from 'react';
import { useHistory } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';


const Auth0ProviderWithHistory:React.FC = ({ children }) => { // Handles the app's connection to Auth0
  const domain:string = process.env.REACT_APP_AUTH0_DOMAIN!;
  const clientId:string = process.env.REACT_APP_AUTH0_CLIENT_ID!;

  const history = useHistory();

  const onRedirectCallback = (appState:any) => {
    history.push(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;