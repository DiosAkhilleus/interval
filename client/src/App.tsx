import React from 'react';
import {Route, Switch } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import NavBar from './Components/Nav/NavBar';
import Footer from './Components/Nav/Footer';
import Profile from './Components/Profile';
import Loading from './Components/Loading';
import Home from './Components/HomePage/Home'
import CreatePost from './Components/CreatePost';
import './App.css';
import GetUsers from './Components/GetUsers';
import PostUser from './Components/PostUser';
import Settings from './Components/Settings';
import Public from './Components/Public';

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
          <Route path="/post" component={CreatePost} />
          <Route path="/getusers" component={GetUsers} />
          <Route path="/postuser" component={PostUser} />
          <Route path="/settings" component={Settings} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
