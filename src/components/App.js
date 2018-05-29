import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import Categories from './Categories';
import Posts from './Posts';
import Postdetails from './PostDetails'
import { Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" render={() => (
          <div className="grid-container">
            <div className="grid-header">
              Aqui vai ficar o título, ordenação e novo post
          </div>
            <Categories />
            <Posts />
          </div>
        )} />
        <Route path="/postdetails" render={() => (
          <div>
            <Postdetails/>
          </div>
        )} />
      </div>
    );
  }
}

export default App;
