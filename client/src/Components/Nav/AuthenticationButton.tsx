import React from 'react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import SignupButton from './SignupButton';
import { useAuth0 } from '@auth0/auth0-react';

interface Props {}

const AuthenticationButton = (props: Props) => {
  const { isAuthenticated } = useAuth0();
  const { isLoading } = useAuth0();

  return isAuthenticated ? (
    <LogoutButton />
  ) : isLoading ? (
    <button className="btn btn-secondary btn-block">Loading</button>
  ) : (
    <div>
      <LoginButton /> <SignupButton />
    </div>
  );
};

export default AuthenticationButton;
