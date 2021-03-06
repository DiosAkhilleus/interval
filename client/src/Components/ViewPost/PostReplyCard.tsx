import { useQuery } from '@apollo/client';
import { GET_POST_BY_ID } from '../../graphql/queries';
import ReplyCreator from './ReplyCreator';
import { Button } from 'react-bootstrap';

interface Props {
  replyID: string;
}

const PostReplyCard = (props: Props) => {

  const postReply = useQuery(GET_POST_BY_ID, { // Retrieves a post by its db _id
    variables: { id: props.replyID },
  }); 


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
        style={{
          width: 40,
          height: 40,
          marginLeft: '3rem',
          marginTop: '0.5rem',
          transform: 'rotate(90deg) scale(1, -1)',
        }}
        src="https://img.icons8.com/material/48/000000/reply-arrow--v1.png"
        alt="reply-arrow"
      />
      <div className="post-page-reply">
        {postReply.data ? (
          <ReplyCreator replyInfo={postReply.data.getPostByID[0]} />
        ) : (
          ''
        )}
        <div style={{ margin: 10, fontSize: 18 }}>
          {postReply.data ? postReply.data.getPostByID[0].text : ''}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            flexDirection: 'row',
          }}
        >
          {postReply.data ? (
            <Button
              style={{ marginRight: 10 }}
              href={`/post/${postReply.data.getPostByID[0].posted_by}/${props.replyID}`}
              variant="outline-primary"
            >
              Reply to this comment
            </Button>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
};

export default PostReplyCard;
