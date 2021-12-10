import { useState, useEffect } from 'react';
import { GET_POST_BY_ID } from '../../graphql/queries';
import { useQuery } from '@apollo/client';
import Post from '../HomePage/Post';
import { Link } from 'react-router-dom';

interface Props {
  postID: string;
  userID: string;
}

const UserProfilePost = (props: Props) => {
  const postData = useQuery(GET_POST_BY_ID, {
    variables: {
      id: props.postID,
    },
  });

  useEffect(() => {
    if (postData.data) {
      console.log(postData.data);
    }
  }, [postData]);

  return (
    <div>
      {postData.data ? (
        postData.data.getPostById[0].reply ? (
          <div>{postData.data.getPostById[0].text}</div>
        ) : (
          <Link to={`/post/${props.userID}/${props.postID}`}>{postData.data.getPostById[0].title}</Link>
        )
      ) : (
        ''
      )}
    </div>
  );
};

export default UserProfilePost;
