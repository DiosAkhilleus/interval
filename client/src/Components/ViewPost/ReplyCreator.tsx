import React from 'react';
import { GET_USER_BY_ID } from '../../graphql/queries';
import { useQuery } from '@apollo/client';

interface Props {
  creatorID: string;
}

const ReplyCreator = (props: Props) => {
  const replyCreator = useQuery(GET_USER_BY_ID, {
    variables: { id: props.creatorID },
  });

  return (
    <div style={{borderBottom: '2px solid rgb(8, 42, 52)'}}>
      <strong style={{fontSize: 24, marginLeft: 10}}>@{replyCreator.data ? replyCreator.data.getUserById[0].public_handle : ''}</strong>
    </div>
  );
};

export default ReplyCreator;
