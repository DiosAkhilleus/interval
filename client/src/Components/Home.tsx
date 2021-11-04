import React from 'react';
import Loading from './Loading';
import Post from './Post';
import { useAuth0 } from '@auth0/auth0-react';
interface Props {}

const Home = (props: Props) => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className='home-page-container'>
      <div className='home-page-options'>
      </div>
      <div className='home-page-posts'>
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
      <div className='home-trending-activity'>
      </div>
    </div>
  );
};

export default Home;
