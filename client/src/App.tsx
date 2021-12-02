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
import ViewPost from './Components/ViewPost/ViewPost';
import ViewProfile from './Components/User/ViewProfile';
import UserSearch from './Components/UserSearch';

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />
  }

  return (
    <div id="app">
      <NavBar /> {/* NavBar always visible. Components are replaced based on route */}
      <div>
        <Switch>
          <Route path="/" exact component={Public} /> {/*External view page for unauthenticated users*/}
          <Route path="/home" exact component={Home} /> {/*Home page for authenticated users*/}
          <Route path="/users/search" component={UserSearch} />
          <Route path="/users/:userID" children={<ViewProfile />} />
          <Route path="/profile" component={Profile} /> {/*Profile for currently authenticated user*/}
          <Route path="/createpost" component={CreatePost} /> {/*Placeholder page for creating a post*/}
          <Route path='/post/:postedBy/:postId' children={<ViewPost />} /> {/*Component for viewing a specific post*/}
          <Route path="/getusers" component={GetUsers} /> {/*Component that retrieves all users*/}
          <Route path="/settings" component={Settings} /> {/*Settings page for updating currently authenticated user's settings*/}
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
