import React, { Component } from "react";
import "./App.css";
import UserInput from "./Components/UserInput";
import UserOutput from "./Components/UserOutput";

class App extends Component {
  state = {
    username: "Kristopher",
  };

  usernameChangedHandler = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="card">
            <UserOutput name={this.state.username} />
            <UserInput name={this.state.username} changed={this.usernameChangedHandler} />
            <img src="./../images/arrow.png"></img>
          </div>
        </div>
      </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default App;
