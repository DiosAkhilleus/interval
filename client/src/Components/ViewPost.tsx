import { useParams, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { GET_POST_BY_ID, GET_USER_BY_ID } from '../graphql/queries';
import { useQuery } from '@apollo/client';

interface Props {}

const ViewPost = (props: Props) => {
  const { postId } = useParams<{ postId?: string }>();
  const postFromId = useQuery(GET_POST_BY_ID, { variables: { id: postId } });
  let history = useHistory();

  const postCreator = useQuery(GET_USER_BY_ID, {
    variables: { id: postFromId.data.getPostById[0].posted_by },
  });

  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <div className="home-page-container">
      <div className="post-page-card">
        <div className="post-page-header">
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
        </div>
        {postFromId.data ? (
          <div>{postFromId.data.getPostById[0].text}</div>
        ) : (
          ''
        )}
        {postCreator.data ? postCreator.data.getUserById[0].name : ''}
      </div>
    </div>
  );
};

export default ViewPost;
