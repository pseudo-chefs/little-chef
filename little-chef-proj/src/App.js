import React from 'react';
import './App.css';
import logo from './remy.gif';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      query: '',
      data: [],
      loading: false,
    }
    this.handleSearchTerms = this.handleSearchTerms.bind(this);
  }
  handleSearchTerms (data) {
    this.setState({
      query: data,
    });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} alt="rat_mascot" height="300" width="300" />
          <p>Welcome to Little Chef!</p>
          <NameForm result={this.handleSearchTerms}/>
          <p>You've selected: {this.state.query}</p>
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
    this.props.result(this.state.value);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} target='_self'>
          <label>
            Please give me your ingredient(s): {'         '}
            <input type="text" placeholder="ingredient" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit"/>
        </form>
      </div>
    );
  }
}
class Edamam_API extends React.Component {
  constructor() {
    super();
    this.state = {
      base_uri: 'https://api.edamam.com/search',
      url: ''
    };
  }
  retrieveAPIresults () {
    fetch(this.state.url) 
  }
  render() {
    return <p>inserrt actual results</p>
  }
}
export default App;