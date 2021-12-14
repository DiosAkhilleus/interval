import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { CREATE_POST, ADD_REPLY_ID_TO_POST, ADD_REPLY_ID_TO_USER_POSTS } from '../../graphql/mutations';

type ModifyShowModal = () => void;

interface Props {
  show: boolean;
  onHide: ModifyShowModal;
  currentuserid: string;
  originalposterid: string;
  originalpostid: string;
}

const PostReplyModal = (props: Props) => {
  // Modal popup for creating a reply to a post.
  const [replyText, setReplyText] = useState(''); // Current value of the reply's text.

  //eslint-disable-next-line
  const [createPost, createPostData] = useMutation(CREATE_POST); // Mutation that sends creates the reply in the DB
  //eslint-disable-next-line
  const [addReplyID, addReplyIDData] = useMutation(ADD_REPLY_ID_TO_POST); // Mutation that adds the new reply's ID to a post's "replies" field
  //eslint-disable-next-line
  const [addReplyIDToUserPosts, addReplyIDToUserPostsData] = useMutation(ADD_REPLY_ID_TO_USER_POSTS) // Adds the reply's ID to the currently authenticated user's "posts" field

  const handlePostReply = () => { // Creates a post in the DB and adds that post's id to both the original post's "replies" field, as well as the currently authenticated user's "posts" field
    if (replyText !== '') {
      createPost({
        variables: {
          posted_at: new Date().toString(),
          posted_by: props.currentuserid,
          repost_count: 0,
          reposted: false,
          reply: true,
          title: '',
          text: replyText,
          in_reply_to_public_handle: '',
          in_reply_to_user_id: props.originalposterid,
          in_reply_to_post_id: props.originalpostid,
          replies: [],
          likes: 0,
          dislikes: 0,
          user_mentions: [],
          tags: [],
          urls: [],
        },
      }).then((results) => {
        if (results.data.createPost.text === replyText) {
          addReplyID({
            variables: {
              original_post_id: props.originalpostid, 
              reply_id: results.data.createPost.id,
            }
          });
          addReplyIDToUserPosts({
            variables: {
              user_id: props.currentuserid,
              reply_id: results.data.createPost.id
            }
          }).then((response) => {
            if (response.data.addReplyIDToUserPosts.id === props.currentuserid) {
              window.location.reload();
            }
          })
        }
      });
      props.onHide();
      setReplyText('');
    } else {
      alert('Your reply must have text!');
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create a Reply
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Write Here</h4>
        <div style={{ height: 300 }}>
          <textarea
            style={{
              width: '100%',
              height: '80%',
              maxHeight: '80%',
              resize: 'none',
              margin: 'auto',
              marginBottom: 15,
              verticalAlign: 'top',
            }}
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Something witty..."
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handlePostReply}>
          Post Reply
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PostReplyModal;
