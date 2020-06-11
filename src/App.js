import React, { Component } from "react";
import "./App.css";
import UserInput from "./Components/UserInput";
import UserOutput from "./Components/UserOutput";
import UserFinishButton from "./Components/UserFinishButton";

class App extends Component {
  state = {
    username: "Write your name",
    placeholder: "...",
    showUsernameCard: true,
  };

  usernameChangedHandler = (event) => {
    if (event.target.value.length === 0) {
      this.setState({
        username: "Write your name",
      });
    } else {
      this.setState({
        username: event.target.value,
      });
    }
  };

  usernameFocusedHandler = (event) => {
    this.setState({
      placeholder: "",
    });
  };

  usernameBlurredHandler = (event) => {
    this.setState({
      placeholder: "...",
    });
  };

  usernameEnteredHandler = (event) => {
    this.setState({
      showUsernameCard: false,
    });
  };

  render() {
    let usernameCard = null;
    if (this.state.showUsernameCard) {
      usernameCard = (
        <div className="card">
          <UserOutput name={this.state.username} />
          <UserInput
            placeholder={this.state.placeholder}
            onFocus={this.usernameFocusedHandler}
            onBlur={this.usernameBlurredHandler}
            name={this.state.username}
            changed={this.usernameChangedHandler}
          />
          <UserFinishButton onClick={this.usernameEnteredHandler} />
        </div>
      );
    }

    return (
      <div className="App">
        <div className="container">{usernameCard}</div>
      </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default App;
