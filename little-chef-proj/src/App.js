import React, { Component } from 'react';
import './App.css';
import logo from './remy.gif';
import SearchBox from 'react-search-box';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} height="150" width="150" />
          <p>
            Welcome to Little Chef!
          </p>
        <SearchBox />
        </header>
      </div>
    );
  }
}

export default App;
