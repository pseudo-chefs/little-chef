import React from 'react';
import logo from './little-chef.gif';
import './App.css';
var unirest = require('unirest');

function Search() {
  return (
    <div className="center">
      <button className="search-button hvr-bounce-in noSelect" type="button">Search!</button>
    </div>
  );
}

function DidYouMean(props) {
  const shoppingList = props.ingredients;
  return shoppingList.length === 0 ?
    <h3>Type in your ingredients, separated by comma.</h3> :
    <h3>Or did you want something else?</h3>;
}

function Ingredient(props) {
  return(
    <div className="center">
      {DidYouMean(props)}
      <input
        type="text"
        ingredients={props.ingredients}
        onKeyPress={props.onKeyPress}
        onChange={props.onChange}
        value={props.response}
        placeholder="food it up"
      />
    </div>
  );
}

class Kitchen extends React.Component {
  renderHeader() {
    return (
      <div>
        <h1>Search recipes by ingredients.</h1>
      </div>
    );
  }

  renderShoppingList() {
    // const shoppingList = this.props.ingredients.length === 0 ?
    //   this.props.ingredients :
    //   this.props.ingredients[0].split(",");
    const shoppingList = this.props.ingredients;
    return (
      shoppingList.length === 0 ?
        <h3>What have you got today?</h3> :
        <h3>[{shoppingList}]</h3>
    );
  }

  render() {
    return (
      <div>
        <div className="topHeader">
          {this.renderHeader()}
          {this.renderShoppingList()}
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: [],
      response: "",
    }
  }

  inputKeyPress = (event) => {
    if (event.key === "Enter") {
      const newIngredients = [event.target.value];
      this.setState({
        ingredients: newIngredients,
        response: "",
      });
    }
  }

  updateResponse = (event) => {
    this.setState({
      response: event.target.value,
    });
  }

  renderSearch() {
    return <Search />;
  }

  callApi() {
    unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?ingredients=apples%2Cflour%2Csugar&number=5&ranking=1")
    .header("X-Mashape-Key", "p2eaMsxod7mshNp5OgBebfh11quOp1tgODZjsnGKP763XkQeCB")
    .header("X-Mashape-Host", "spoonacular-recipe-food-nutrition-v1.p.mashape.com")
    .end(function (result) {
      console.log(result.status, result.headers, result.body);
    });

    // this.setState({
    //   quote: data.quote,
    //   author: data.author,
    //   category: data.category
    // })
  }

  render() {
    return(
      <div className="App">
        <header className="App-header">
          <h1>Little Chef</h1>
          <img src={logo} className="App-logo" alt="logo" />
          <p>Welcome to <b>Little Chef</b>! Currently under construction.</p>
          <p>Built for HackHarvard 2018.</p>
          <div className="arrow"></div>
        </header>
        <div className="main">
          <Kitchen
            ingredients={this.state.ingredients}
          />
          <Ingredient
            ingredients={this.state.ingredients}
            onKeyPress={this.inputKeyPress}
            onChange={this.updateResponse}
            response={this.state.response}
          />
          <div>
            {this.state.ingredients.length === 0 ? "" : this.renderSearch()}
          </div>
          <div className="ingredient-info">
            {this.callApi()}
            {/* <ol>{moves}</ol> */}
          </div>
        </div>
      </div>
    );
  }
}

// ========================================

export default App;
