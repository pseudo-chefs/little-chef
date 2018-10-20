import React, { Component } from 'react';
import './App.css';
import logo from './remy.gif';

class App extends Component {
  constructor() {
    super()
    this.state = {
      query: '',
      data: [],
      loading: false,
    }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} alt="rat_mascot" height="300" width="300" />
          <p>Welcome to Little Chef!</p>
          <select>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option selected value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
          <NameForm result={this.state.query}/>
          <h2 id='return'>Hello</h2>
        </header>
      </div>
    );
  }
}
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    console.log('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} target='_self'>
        <label>
          Name: 
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit"/>
      </form>
    );
  }
}
export default App;