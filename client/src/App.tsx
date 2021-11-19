import React from 'react';
import {Route, Switch } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import NavBar from './Components/Nav/NavBar';
import Footer from './Components/Nav/Footer';
import Profile from './Components/User/Profile';
import Loading from './Components/PublicComponents/Loading';
import Home from './Components/HomePage/Home'
import CreatePost from './Components/CreatePost';
import './App.css';
import GetUsers from './Components/GetUsers';
import Settings from './Components/User/Settings';
import Public from './Components/PublicComponents/Public';
import ViewPost from './Components/ViewPost';

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />
  }

  return (
    <div id="app">
      <NavBar />
      <div>
        <Switch>
          <Route path="/" exact component={Public} />
          <Route path="/home" exact component={Home} />
          <Route path="/profile" component={Profile} />
          <Route path="/createpost" component={CreatePost} />
          <Route path='/post/:postId' children={<ViewPost />} />
          <Route path="/getusers" component={GetUsers} />
          <Route path="/settings" component={Settings} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
