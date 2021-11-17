import React from 'react';
import Loading from '../Loading';
import Post from './Post';
import PleaseLogIn from '../PleaseLogIn';
import FriendActivityCard from './FriendActivityCard';
import Discover from './Discover';
import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from '@apollo/client';
import { GET_POSTS } from '../../graphql/queries';
// import { postUser } from '../../logic/userLogic';
interface Props {}

const Home = (props: Props) => {
  const { isLoading, isAuthenticated, user } = useAuth0();
  const { email } = user!;

  const { loading, error, data } = useQuery(GET_POSTS);

  console.log(data);

  if (isLoading) {
    return <Loading />;
  }
  if (!isAuthenticated) {
    return <PleaseLogIn />;
  }
  const posts = [
    {
      name: 'Jim Brown',
      handle: '@jimbrown',
      interval: 234,
      profile_image:
        'https://s.gravatar.com/avatar/c5aee30741780469d8b802522c6b550d?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fjb.png',
      tags: ['#asdf', '#cheese', '#apples', '#coolstuff'],
      text: "I like running with the football very fast and jumping everywhere. I was a Cleveland Browns' RB",
    },
    {
      name: 'John Doe',
      handle: '@johndoe',
      interval: 15,
      profile_image:
        'https://s.gravatar.com/avatar/c5aee30741780469d8b802522c6b550d?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fjd.png',
      tags: ['#iam', '#john', '#doe'],
      text: 'I am john doe what a dumb name that is very non-unique if you can believe it, so stupid placeholder name',
    },
    {
      name: 'Baker Mayfield',
      handle: '@bmayfield6',
      interval: 543,
      profile_image:
        'https://s.gravatar.com/avatar/c5aee30741780469d8b802522c6b550d?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fbm.png',
      tags: ['#futbol', '#football', '#sooners'],
      text: "OBJ is such a diva I wish he were off the team it's such a distraction to still have him on this Browns team",
    },
    {
      name: 'Nick Chubb',
      handle: '@nchubb27',
      interval: 24,
      profile_image:
        'https://s.gravatar.com/avatar/c5aee30741780469d8b802522c6b550d?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fnc.png',
      tags: ['#batman', '#super', '#strong'],
      text: 'I like batman',
    },
  ];

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
        {data ? data.posts.map((el: any, id: number) => (
          <Post
            postInfo={el}
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
