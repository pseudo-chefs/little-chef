import React from 'react';
import './App.css';
import logo from './remy.gif';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      query: '',
      data: '',
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
        <EdamamAPI result={this.state.query}/>
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
    console.log('Submitted query: ' + this.state.value);
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
class EdamamAPI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      base_uri: 'https://api.edamam.com/search?q=',
      url: ''
    }
    this.setURL = this.setURL.bind(this);
  }
  constructURL () {
    let api_key = 'a43bf8507f8003e4e71a462df8432988';
    let app_id = 'ae25febc';
    let construct_url = this.state.base_uri + this.props.result + '&app_id=' + app_id + '&app_key=' + api_key + '&from=0' + '&to=3';
    return construct_url;
  }
  setURL(data) {
    this.setState({
      url: data,
    });
  }
  retrieveAPIresults(url) {
    let extract = [];
    fetch(url)
      .then(function(response){
        if (response.status >= 400) {
          throw new Error ("Bad response from Server");
        }
        return response.json();
      }) 
      .then(function(myJson) {
        Object.entries(myJson).forEach(([key, value]) => {
          // do something with key and val
          // console.log([key, value]);
          if (key === "hits") {
            Object.entries(value).forEach(([index, recipe]) => {
              // console.log([index, recipe]);
              Object.entries(recipe).forEach(([r, v]) => {
                // console.log([r, v]);
                if (r === "recipe") {
                  Object.entries(v).forEach(([r, v]) => {
                    // console.log([r, v]);
                    if (r === "label" || r === "image" || r === "url" || r === "ingredientsLines") {
                      extract.push(v);
                    }
                  });
                } 
              });
            });
          }
        });
      })
    return extract;
  }
  render() {
    let url = this.constructURL();
    let j = this.retrieveAPIresults(url);
    let nj = JSON.stringify(j)
   
    console.log(nj);
    let listJ = j.map((elem) => <li>{elem}</li>);
    console.log(listJ);
    return (
      <div>
        <ul>{listJ}</ul>
      </div>
    );
  }
}
export default App;