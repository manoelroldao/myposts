import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import Categories from './Categories';
import Posts from './Posts';

class App extends Component {
  render() {
    return (
      <div className="grid-container">
        <div className="grid-header">
            Aqui vai ficar o título, ordenação e novo post
        </div>
     { /*  <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
    </header>                */}
        <Categories/>
        <Posts/>
      </div>      
    );
  }
}

export default App;
