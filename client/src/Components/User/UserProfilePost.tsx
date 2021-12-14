import { GET_POST_BY_ID } from '../../graphql/queries';
import { useQuery } from '@apollo/client';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from '../PublicComponents/Loading';
import { Button } from 'react-bootstrap';

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
    <div className="user-profile-info-card">
      {postData.data ? (
        postData.data.getPostByID[0].reply === true ? (
          <div className="user-profile-info-card-content">
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingBottom: 5}}>
              <img
                style={{
                  width: 30,
                  height: 30,
                  marginLeft: 10,
                  marginRight: 10,
                  transform: 'rotate(90deg) scale(1, -1)',
                }}
                src="https://img.icons8.com/material/48/000000/reply-arrow--v1.png"
                alt="reply-arrow"
              />
              <div>
                {postData.data.getPostByID[0].text.length > 20
                  ? `${postData.data.getPostByID[0].text.substring(0, 20)}...`
                  : `${postData.data.getPostByID[0].text}`}
              </div>
            </div>

            <Button
              href={`/post/${postData.data.getPostByID[0].in_reply_to_user_id}/${postData.data.getPostByID[0].in_reply_to_post_id}`}
              variant="primary"
              style={{width: 160}}
            >
              See Original Post
            </Button>
          </div>
        ) : (
          <div className="user-profile-info-card-content">
            <div style={{ marginLeft: 10, paddingBottom: 5}}>
              {postData.data.getPostByID[0].text.length > 24
                ? `${postData.data.getPostByID[0].text.substring(0, 24)}...`
                : `${postData.data.getPostByID[0].text}`}
            </div>

            <Button
              href={`/post/${props.userID}/${props.postID}`}
              variant="primary"
              style={{width: 160}}
            >
              See Your Post
            </Button>
          </div>
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
