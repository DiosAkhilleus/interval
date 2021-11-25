import { useParams, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { GET_POST_BY_ID, GET_USER_BY_ID } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import { Button } from 'react-bootstrap';

interface Props {}

const ViewPost = (props: Props) => {
  const { postedBy, postId } =
    useParams<{ postedBy?: string; postId?: string }>();
  const postFromId = useQuery(GET_POST_BY_ID, { variables: { id: postId } });
  let history = useHistory();

  const postCreator = useQuery(GET_USER_BY_ID, {
    variables: { id: postedBy },
  });

  const handleGoBack = () => {
    history.goBack();
  };

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
          <div className="post-page-reply"></div>
          <div className="post-page-reply"></div>
        <Button style={{width: 150, margin: 'auto', marginBottom: 10, marginTop: 14}} variant="outline-primary">Post Reply</Button>

        </div>

      </div>
    </div>
  );
};

export default ViewPost;
