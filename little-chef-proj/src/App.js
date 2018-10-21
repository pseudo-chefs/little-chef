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
          
        <edamamAPI data={this.state.value}/>
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
class edamamAPI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      base_uri: 'https://api.edamam.com/search?q=',
      url: ''
    };
  }
  constructURL (props) {
    let api_key = 'a43bf8507f8003e4e71a462df8432988';
    let app_id = 'ae25febc';
    let construct_url = this.state.base_uri + this.props.query + '&app_id=' + app_id + '&app_key=' + api_key;
    this.setState({
      url: construct_url,
    });
    console.log(this.state.url);

  }
  retrieveAPIresults (url) {
    fetch(this.state.url)
      .then(function(response){
        return response.json();
      }) 
      .then(function(myJson) {
        let ret = JSON.stringify(myJson);
        console.log(ret);
        this.props.query(ret);
      })
  }
  render() {
    return (
      <div>
        <h1>This is where the JSON information should be inserted. Or it is completed.</h1>
      </div>
    );
  }
}
export default App;