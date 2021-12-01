import React from 'react';
import { useParams } from 'react-router-dom';

interface Props {}

const ViewProfile = (props: Props) => {
  const { userHandle } = useParams<{ userHandle?: string }>();


  return <div>{userHandle}</div>;
};

export default ViewProfile;
