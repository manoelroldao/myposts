import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import Categories from './Categories';
import Posts from './Posts';
import {Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="grid-container">
        <div className="grid-header">
            Aqui vai ficar o título, ordenação e novo post
        </div>     
        <Categories/>
        <Posts/>
      </div>      
    );
  }
}

export default App;
