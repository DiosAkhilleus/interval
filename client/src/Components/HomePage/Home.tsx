import React from 'react';
import Loading from '../Loading';
import Post from './Post';
import PleaseLogIn from '../PleaseLogIn';
import FriendActivityCard from './FriendActivityCard';
import Discover from './Discover';
import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from '@apollo/client';
import { GET_POSTS, GET_CURRENT_USER_VOTED_POSTS } from '../../graphql/queries';
// import { postUser } from '../../logic/userLogic';
interface Props {}

const Home = (props: Props) => {
  const { isLoading, isAuthenticated, user } = useAuth0();
  const { email } = user!;

  const { loading, error, data } = useQuery(GET_POSTS);

  let userVotedPosts = useQuery(GET_CURRENT_USER_VOTED_POSTS, {
    variables: {email: email}
  })
  console.log(userVotedPosts.data);


  if (isLoading) {
    return <Loading />;
  }
  if (!isAuthenticated) {
    return <PleaseLogIn />;
  }

  const placeholderFriendActivity = [
    {
      handle: '@jimbrown',
      action: 'liked',
      post_name: 'OBJ Sucks',
    },
    {
      handle: '@bmayfield6',
      action: 'reposted',
      post_name: 'Baker Mayfield is Good',
    },
    {
      handle: '@nchubb27',
      action: 'liked',
      post_name: 'Batman Good',
    },
  ];

  return (
    <div className="home-page-container">
      <div className="home-page-discover">
        <Discover />
      </div>
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
      <div className="home-friend-activity">
        <h2 style={{fontFamily: 'Roboto'}}>Friend Activity</h2>
        {placeholderFriendActivity.map((el, ind) => (
          <FriendActivityCard
            handle={el.handle}
            action={el.action}
            postName={el.post_name}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
