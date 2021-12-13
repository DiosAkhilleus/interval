import React from 'react';
import { GET_USER_BY_ID } from '../../graphql/queries';
import { useQuery } from '@apollo/client';

interface Reply {
  posted_by: string
  replies: Array<string>
}

interface Props {
  replyInfo: Reply;
}

const ReplyCreator = (props: Props) => {

  const replyCreator = useQuery(GET_USER_BY_ID, { // Retrieves a user by ID from the DB
    variables: { id: props.replyInfo.posted_by },
  });

  return (
    <div style={{borderBottom: '2px solid rgb(8, 42, 52)', display: 'flex', justifyContent: 'space-between'}}>
      <strong style={{fontSize: 24, marginLeft: 10}}>@{replyCreator.data ? replyCreator.data.getUserById[0].public_handle : ''}</strong>
      <div style={{fontSize: 20, verticalAlign: 'middle', marginRight: 10, marginTop: 2}}>{props.replyInfo.replies.length ? props.replyInfo.replies.length === 1 ? `${props.replyInfo.replies.length} reply` : `${props.replyInfo.replies.length} replies` : '0 replies'}</div>
    </div>
  );
};

export default ReplyCreator;
