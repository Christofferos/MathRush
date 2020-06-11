import React, { Component } from "react";
import "./App.css";
import Toolbar from "./Components/Header/Toolbar.js";
import Radium, { StyleRoot } from "radium";
import UserInput from "./Components/UserInput";
import UserOutput from "./Components/UserOutput";
import UserFinishButton from "./Components/UserFinishButton";

class App extends Component {
  state = {
    username: "Write your name",
    usernameLen: 0,
    usernameColor: "white",
    placeholder: "...",
    showUsernameCard: true,
  };

  usernameChangedHandler = (event) => {
    if (event.target.value.length === 0) {
      this.setState({
        username: "Write your name",
        usernameLen: 0,
        usernameColor: "white",
      });
    } else {
      this.setState({
        username: event.target.value,
        usernameLen: event.target.value.length,
        usernameColor: "white",
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

  usernameEnteredHandler = (event, usernameLen) => {
    if (usernameLen >= 3 && usernameLen < 15) {
      this.setState({
        showUsernameCard: false,
      });
    } else if (usernameLen < 3) {
      this.setState({
        username: "Text too short",
        usernameColor: "red",
      });
    } else if (usernameLen >= 15) {
      this.setState({
        username: "Text too long",
        usernameColor: "red",
      });
    }
  };

  render() {
    let usernameCard = null;
    if (this.state.showUsernameCard) {
      usernameCard = (
        <div className="card">
          <UserOutput name={this.state.username} textColor={this.state.usernameColor} />
          <UserInput
            placeholder={this.state.placeholder}
            onFocus={this.usernameFocusedHandler}
            onBlur={this.usernameBlurredHandler}
            name={this.state.username}
            changed={this.usernameChangedHandler}
          />
          <UserFinishButton onClick={(event) => this.usernameEnteredHandler(event, this.state.usernameLen)} />
        </div>
      );
    }

    return (
      <StyleRoot>
        <Toolbar />
        <div className="App">
          <div className="container">{usernameCard}</div>
        </div>
      </StyleRoot>
    );
  }
}

// Higher order component.
export default Radium(App);
