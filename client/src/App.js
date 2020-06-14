import React, { Component } from "react";
import "./App.css";
import Toolbar from "./Components/Header/Toolbar.js";
import Radium, { StyleRoot } from "radium";
import UserInput from "./Components/UserInput";
import UserOutput from "./Components/UserOutput";
import UserFinishButton from "./Components/UserFinishButton";
import Playground from "./Components/Playground";

// import "whatwg-fetch";
// let express = require("express");
// let additionRouter = require("./../../backend/routes/addition.js");
// let app = express();

class App extends Component {
  testTime = 6;
  state = {
    username: "Write your name",
    usernameLen: 0,
    usernameColor: "white",
    placeholder: "...",
    showUsernameCard: true,
    opperationSelected: "ADDITION",
    startTest: false,
    time: this.testTime,
    newNumber: true,
    error: "",
    databaseHighscores: [],
  };

  componentDidMount() {
    this.callAPI();
  }

  callAPI = () => {
    // fetch returns a promise.
    fetch("/api/v1/additions") // api/v1/additions
      .then((res) => res.json())
      .then((additions) => {
        this.setState({ databaseHighscores: additions.data.additions }, () =>
          console.log("Additions fetched..", additions)
        );
      });
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

  opperationHandler = (event) => {
    if (!this.state.startTest) {
      this.setState({
        opperationSelected: event.target.innerText,
      });
    }
  };

  toggleGameStatusHandler = (event) => {
    if (!this.state.startTest) {
      this.setState({
        startTest: true,
      });
    } else {
      setTimeout(() => {
        this.setState({
          startTest: false,
          time: this.testTime,
        });
      }, 3000);
    }
  };

  countdownHandler = () => {
    if (this.state.time > 0) {
      this.setState({
        time: this.state.time - 1,
      });
    } else if (this.state.time === 0) {
      this.setState({
        time: this.testTime,
      });
      console.log("Time: " + this.state.time);
    }
  };

  newNumberHandler = () => {
    if (this.state.newNumber) {
      this.setState({
        newNumber: false,
      });
    } else {
      this.setState({
        newNumber: true,
      });
    }
  };

  render() {
    let usernameCard = null;
    let mainPage = null;
    let highscores = null;
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
    } else {
      if (!this.state.startTest) {
        function descendingScores(a, b) {
          if (a.score < b.score) {
            return 1;
          } else if (a.score > b.score) {
            return -1;
          } else {
            return 0;
          }
        }

        let highestScoresArr = [];
        this.state.databaseHighscores.map((addition) => {
          let row = new Object();
          row.score = addition.score;
          row.username = addition.username;
          highestScoresArr.push(row);
        });
        highestScoresArr = highestScoresArr.sort(descendingScores);
        let result = [];

        highscores = (
          <div className="highscores">
            <h1>Highscores</h1>
            {
              <ul className="highscoreRows">
                {this.state.databaseHighscores.map((addition) => (
                  <li key={addition.id}>
                    {addition.username} - {addition.score} points
                  </li>
                ))}
              </ul>
            }
          </div>
        );
      }
      mainPage = (
        <div className="mainPageContainer">
          <div className="usernameDisplay">{this.state.username}</div>
          <Playground
            opperation={this.state.opperationSelected}
            gameStarted={this.state.startTest}
            toggleGameStatus={this.toggleGameStatusHandler}
            time={this.state.time}
            countdown={this.countdownHandler}
            newNumber={this.state.newNumber}
            newNumberHandler={this.newNumberHandler}
          />
          {highscores}
        </div>
      );
    }

    return (
      <StyleRoot>
        <Toolbar onClick={(event) => this.opperationHandler(event)} />
        <div className="App">
          <div className="container">
            {usernameCard}
            {mainPage}
          </div>
        </div>
      </StyleRoot>
    );
  }
}

// Higher order component.
export default Radium(App);