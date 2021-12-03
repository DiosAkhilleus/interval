import { useParams, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  GET_POST_BY_ID,
  GET_USER_BY_ID,
  GET_POST_REPLIES,
  GET_CURRENT_USER,
} from '../../graphql/queries';
import { useQuery } from '@apollo/client';
import { Button } from 'react-bootstrap';
import PostReplyModal from './PostReplyModal';
import PostReplyCard from './PostReplyCard';
import { useAuth0 } from '@auth0/auth0-react';

interface Props {}

const ViewPost = (props: Props) => {
  // Component for viewing a post
  const { postedBy, postId } =
    useParams<{ postedBy?: string; postId?: string }>(); // URL params with ids of the creator and the post.
  const postFromId = useQuery(GET_POST_BY_ID, { variables: { id: postId } }); // Retrieves a post by its db _id
  let history = useHistory();

  const { user } = useAuth0();
  const { email } = user!;

  const currentUser = useQuery(GET_CURRENT_USER, {
    variables: { email: email },
  });

  const postCreator = useQuery(GET_USER_BY_ID, {
    // Retrieves a post's creator by user id
    variables: { id: postedBy },
  });

  const postReplies = useQuery(GET_POST_REPLIES, {
    variables: { id: postId },
  });

  const handleGoBack = () => {
    // Handles when a user clicks the back button
    history.goBack();
  };

  const [showModal, setShowModal] = useState(false); // Is modal visible?

  return (
    <div className="home-page-container">
      <div className="post-page-card">
        <div className="post-page-header sticky-top">
          <div
            className="back-button"
            onClick={() => {
              handleGoBack();
            }}
          >
            <img
              src="https://img.icons8.com/ios/50/000000/circled-left-2.png"
              alt="back-button"
            />
          </div>
          <div className="post-page-title">
            {postFromId.data ? postFromId.data.getPostById[0].title : ''}
          </div>
          <div className="post-page-creator">
            {postCreator.data ? postCreator.data.getUserById[0].name : ''}
          </div>
        </div>
        <div className="post-page-main-content">
          {postFromId.data ? (
            <h3 style={{ margin: 10 }}>
              {postFromId.data.getPostById[0].text}
            </h3>
          ) : (
            ''
          )}
        </div>
        <div className="post-page-replies-container">
          <Button
            onClick={() => setShowModal(true)}
            style={{
              width: 150,
              margin: 'auto',
              marginTop: 14,
            }}
            variant="outline-primary"
          >
            Post Reply
          </Button>
          {currentUser.data ? (
            <PostReplyModal
              show={showModal}
              onHide={() => setShowModal(false)}
              currentuserid={currentUser.data.currentUser[0].id}
              originalposterid={postedBy!}
              originalpostid={postId!}
            />
          ) : (
            ''
          )}
          {postReplies.data
            ? postReplies.data.getPostById[0].replies.map(
                (post: string, index: number) => (
                  <PostReplyCard replyID={post} key={index} />
                )
              )
            : ''}
        </div>
      </div>
    </div>
  );
};

export default ViewPost;
