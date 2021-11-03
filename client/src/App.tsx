import React from 'react';
import {Route, Switch } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import NavBar from './Components/Nav/NavBar';
import Footer from './Components/Nav/Footer';
import Profile from './Components/Profile';
import Loading from './Components/Loading';
import Home from './Components/Home'
import CreatePost from './Components/CreatePost';
import './App.css';

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />
  }

  return (
    <div id="app" className="d-flex flex-column h-100">
      <NavBar />
      <div className="container flex-grow-1">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/profile" component={Profile} />
          <Route path="/post" component={CreatePost} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
