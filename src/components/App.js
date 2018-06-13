import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import Categories from './Categories';
import Posts from './Posts';
import PostDetails from './PostDetails'
import CreatePost from './CreatePosts'
import Comments from './Comments'
import CreateComment from './CreateComment'
import { Route, Switch } from 'react-router-dom'


class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" render={() => (
            <div className="grid-container">
              <div className="grid-header">
                <h1>My Posts</h1>
              </div>
              <Categories />
              <Posts />
            </div>
          )} />

          <Route exact path="/posts/add/" render={() => (
            <CreatePost />)}
          />

          <Route exact path="/comments/edit" render={() => (
            <CreateComment />)}
          />

          <Route path="/:category/:post_id" render={() => (
            <div>
              <PostDetails />
              <CreateComment />
              <Comments />
            </div>
          )} />
          
          <Route path="/:category" render={() => (
            <div className="grid-container">
              <div className="grid-header">
                <h1>My Posts</h1>
              </div>
              <Categories />
              <Posts />
            </div>
          )} />
          
        </Switch>
      </div>
    );
  }
}

export default App;
