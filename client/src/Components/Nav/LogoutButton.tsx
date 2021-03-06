import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

interface Props {}

const LogoutButton = (props: Props) => {
  const { logout } = useAuth0();

  return (
    <button
      style={{marginTop: 5}}
      className="btn btn-danger btn-block"
      onClick={() => {
        logout({ returnTo: window.location.origin });
      }}
    >
      Log Out
    </button>
  );
};

export default LogoutButton;
