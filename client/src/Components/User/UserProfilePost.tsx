import { GET_POST_BY_ID } from '../../graphql/queries';
import { useQuery } from '@apollo/client';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from '../PublicComponents/Loading';
import { Link } from 'react-router-dom';

interface Props {
  postID: string;
  userID: string;
}

const UserProfilePost = (props: Props) => {
  
  // Retrieves post from DB with the post's ID
  const postData = useQuery(GET_POST_BY_ID, { 
    variables: {
      id: props.postID,
    },
  });

  return (
    <div>
      {postData.data ? (
        postData.data.getPostById[0].reply === true ? (
          <Link
            to={`/post/${postData.data.getPostById[0].in_reply_to_user_id}/${postData.data.getPostById[0].in_reply_to_post_id}`}
          >
            Reply: {postData.data.getPostById[0].text}
          </Link>
        ) : (
          <Link to={`/post/${props.userID}/${props.postID}`}>
            {postData.data.getPostById[0].title}
          </Link>
        )
      ) : (
        ''
      )}
    </div>
  );
};


export default withAuthenticationRequired(UserProfilePost, {
  onRedirecting: () => <Loading />,
});
