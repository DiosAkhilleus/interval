import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_USER_PROFILE } from '../../graphql/queries';

interface Props {}

// This component will be for viewing another user's profile...

const ViewProfile = (props: Props) => {
  const { userID } = useParams<{ userID?: string }>();

  const userInfo = useQuery(GET_USER_PROFILE, {
    // Retrieves the user who created the current post
    variables: { id: userID },
  });

  return <div>{userInfo.data ? userInfo.data.getUserById[0].name : ''}</div>;
};

export default ViewProfile;
