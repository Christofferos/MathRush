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
    points: 0,
  };

  componentDidMount() {
    this.fetchFromAPI("additions");
  }

  fetchFromAPI = (opperationType) => {
    // fetch returns a promise.
    if (opperationType === "additions") {
      fetch("/api/v1/" + opperationType)
        .then((res) => res.json())
        .then((additions) => {
          this.setState({ databaseHighscores: additions.data.additions }, () =>
            // console.log("Additions fetched..", additions)
            console.log("Additions fetched..")
          );
        });
    } else if (opperationType === "subtractions") {
      fetch("/api/v1/" + opperationType)
        .then((res) => res.json())
        .then((subtractions) => {
          this.setState({ databaseHighscores: subtractions.data.subtractions }, () =>
            // console.log("Subtractions fetched..", subtractions)
            console.log("Subtractions fetched..")
          );
        });
    } else if (opperationType === "multiplications") {
      fetch("/api/v1/" + opperationType)
        .then((res) => res.json())
        .then((multiplications) => {
          this.setState({ databaseHighscores: multiplications.data.multiplications }, () =>
            // console.log("Multiplications fetched..", multiplications)
            console.log("Multiplications fetched..")
          );
        });
    } else if (opperationType === "divisions") {
      fetch("/api/v1/" + opperationType)
        .then((res) => res.json())
        .then((divisions) => {
          this.setState({ databaseHighscores: divisions.data.divisions }, () =>
            // console.log("Divisions fetched..", divisions)
            console.log("Divisions fetched..")
          );
        });
    }
  };

  postToAPI = (opperationType) => {
    fetch("/api/v1/" + opperationType, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.state.username,
        score: Number(this.state.points),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .then(() => {
        this.setState({ points: 0 });
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  deleteFromAPI = (opperationType, id) => {
    fetch("/api/v1/" + opperationType + "/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
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

  identifyOperationHandler = () => {
    let operationType = "";
    if (this.state.opperationSelected === "ADDITION" || this.state.opperationSelected === "ADD")
      operationType = "additions";
    if (this.state.opperationSelected === "SUBTRACTION" || this.state.opperationSelected === "SUB")
      operationType = "subtractions";
    if (this.state.opperationSelected === "MULTIPLICATION" || this.state.opperationSelected === "MULT")
      operationType = "multiplications";
    if (this.state.opperationSelected === "DIVISION" || this.state.opperationSelected === "DIV")
      operationType = "divisions";
    return operationType;
  };

  identifyOperationHandlerParam = (opperation) => {
    let operationType = "";
    if (opperation === "ADDITION" || opperation === "ADD") operationType = "additions";
    if (opperation === "SUBTRACTION" || opperation === "SUB") operationType = "subtractions";
    if (opperation === "MULTIPLICATION" || opperation === "MULT") operationType = "multiplications";
    if (opperation === "DIVISION" || opperation === "DIV") operationType = "divisions";
    return operationType;
  };

  opperationHandler = (event) => {
    if (!this.state.startTest) {
      this.setState({
        opperationSelected: event.target.innerText,
      });
      let operationType = this.identifyOperationHandlerParam(event.target.innerText);
      this.fetchFromAPI(operationType); // Set type of highscore list to display.
    }
  };

  gameOverHandler = (score) => {
    this.setState({
      points: score,
    });

    let max = 0;
    let id;
    this.state.databaseHighscores.map((addition) => {
      if (addition.username === this.state.username) {
        if (max < addition.score) {
          id = addition._id;
          max = addition.score;
        }
      }
      return;
    });
    // Post new record and delete the old one for this user.
    if (max < this.state.points) {
      let operationType = this.identifyOperationHandler();
      this.postToAPI(operationType);
      this.deleteFromAPI(operationType, id);
    }
  };

  toggleGameStatusHandler = (score) => {
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
        // Game over..
        this.gameOverHandler(score);
      }, 3000);
    }
  };

  // NOT IN USE
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
        /* Display highscores */
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
        this.state.databaseHighscores.map((operation) => {
          let row = {};
          row.score = operation.score;
          row.username = operation.username;
          highestScoresArr.push(row);
          return highestScoresArr;
        });

        highestScoresArr = highestScoresArr.sort(descendingScores);
        const uniqueNamesArr = [];
        const result = [];

        for (let i = 0; i < highestScoresArr.length; i++) {
          if (!uniqueNamesArr.includes(highestScoresArr[i].username)) {
            uniqueNamesArr.push(highestScoresArr[i].username);
            let row = {};
            row.score = highestScoresArr[i].score;
            row.username = highestScoresArr[i].username;
            row.id = i;
            result.push(row);
          }
        }

        highscores = (
          <div className="highscores">
            <h1>Highscores</h1>
            {
              <ul className="highscoreRows">
                {result.map((addition) => (
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
            gameOverHandler={(points) => this.gameOverHandler(points)}
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
