import Loading from '../PublicComponents/Loading';
import Post from './Post';
import PleaseLogIn from '../PublicComponents/PleaseLogIn';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { useQuery } from '@apollo/client';
import { GET_POSTS, GET_CURRENT_USER_VOTED_POSTS } from '../../graphql/queries';
interface Props {}

const Home = (props: Props) => { // Home component – includes both discover and friend activity components. The main home page once the user is logged in.

  const { isLoading, isAuthenticated, user } = useAuth0(); // Auth0 variables

  const { data } = useQuery(GET_POSTS); // Retrieves all posts – Need to edit in the future to only return original posts, not replies

  let userVotedPosts = useQuery(GET_CURRENT_USER_VOTED_POSTS, { // Retrieves the posts the currently authenticated user has upvoted or downvoted
    variables: {email: user!.email}
  })

  if (isLoading) {
    return <Loading />;
  }
  if (!isAuthenticated) {
    return <PleaseLogIn />;
  }

  
  return (
    <div className="home-page-container">
      <div className="home-page-posts">
        {data && userVotedPosts.data ? data.posts.map((el: any, id: number) => (
          <Post
            postInfo={el}
            currentUserLikedPosts={userVotedPosts.data.currentUser[0].liked_posts}
            currentUserDislikedPosts={userVotedPosts.data.currentUser[0].disliked_posts}
            currentUserId={userVotedPosts.data.currentUser[0].id}
            key={id}
          />
        )) : ''}
      </div>
    </div>
  );
};


export default withAuthenticationRequired(Home, {
  onRedirecting: () => <Loading />,
});
