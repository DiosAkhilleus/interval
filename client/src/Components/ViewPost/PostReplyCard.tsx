import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_POST_BY_ID } from '../../graphql/queries';

interface Props {
  replyID: string;
}

const PostReplyCard = (props: Props) => {
  // console.log(props.replyID);
  const postReply = useQuery(GET_POST_BY_ID, { variables: { id: props.replyID } }); // Retrieves a post by its db _id
  // useEffect(() => {
  //   console.log(postReply);
  // }, [postReply])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'space-around',
        alignItems: 'center',
        justifyContent: 'space-around',
      }}
    >
      <img
        style={{ width: 40, height: 40, marginLeft: '3rem', marginTop: '0.5rem', transform: 'rotate(90deg) scale(1, -1)'}}
        src="https://img.icons8.com/material/48/000000/reply-arrow--v1.png"
        alt="reply-arrow"
      />
      <div className="post-page-reply">
        {postReply.data ? postReply.data.getPostById[0].text : ''}
      </div>
    </div>
  );
};

export default PostReplyCard;
