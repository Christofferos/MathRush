import React, { useState, useEffect } from "react";
import Radium from "radium";
import UserInput from "./UserInput";

let countdownInterval;
let activateTimer = true;
let newNumbers;
let firstNr;
let secondNr;
let points;

const playground = (props) => {
  useState(() => {
    newNumbers = props.newNumber;
    firstNr = 0;
    secondNr = 0;
    points = 0;
  });
  useEffect(() => {
    // Render update in funcitonal component.
    // console.log("[Play] asd");
  });

  const style = {
    textTransform: "uppercase",
    margin: "0.6em",
  };
  const styleButton = {
    borderRadius: "5px",
    cursor: "pointer",
    height: "1.5em",
    backgroundColor: "rgb(255, 83, 40)",
    fontSize: "20px",
    border: "none",
    ":hover": {
      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
    },
  };
  const h6Style = {
    margin: "5px",
    padding: "5px",
  };
  const countdownStyle = {
    fontSize: "100%",
  };
  const styleMathDisplay = {
    margin: "5%",
  };
  const resultStyle = {
    margin: "10% 0px 0px 0px",
  };

  let startButton = null;
  let timer = null;
  if (!props.gameStarted) {
    startButton = (
      <div>
        <button style={styleButton} onClick={props.toggleGameStatus}>
          Start Challenge
        </button>
      </div>
    );
    points = 0;
  } else {
    if (activateTimer) {
      countdownInterval = setInterval(props.countdown, 1000);
      activateTimer = false;
    }
    if (props.time === 0) {
      clearInterval(countdownInterval);
      props.toggleGameStatus();
      activateTimer = true;
    }
    timer = (
      <h6 style={h6Style}>
        Countdown:
        <span style={countdownStyle}> {props.time}</span>
      </h6>
    );
  }

  let mathDisplay = null;
  let result = 0;
  let operationSymb = "";

  if (props.gameStarted) {
    if (newNumbers) {
      firstNr = Math.floor(Math.random() * 10) + 2;
      secondNr = Math.floor(Math.random() * 6) + 5;
      newNumbers = false;
    }
    // console.log(props.opperation);
    if (props.opperation === "ADDITION" || props.opperation === "ADD") {
      operationSymb = <span> + </span>;
      result = firstNr + secondNr;
    } else if (props.opperation === "SUBTRACTION" || props.opperation === "SUB") {
      operationSymb = <span> - </span>;
      result = firstNr - secondNr;
    } else if (props.opperation === "MULTIPLICATION" || props.opperation === "MULT") {
      operationSymb = <span> * </span>;
      result = firstNr * secondNr;
    } else if (props.opperation === "DIVISION" || props.opperation === "DIV") {
      operationSymb = <span> / </span>;
      result = firstNr / secondNr;
    }

    let checkAnswerHandler = (event) => {
      if (result.toString(10) === event.target.value) {
        console.log("Correct answer!");
        newNumbers = true;
        props.newNumberHandler();
        points = points + 1;
        result = -1;
      }
    };

    mathDisplay = (
      <div style={styleMathDisplay}>
        <span>{firstNr}</span>
        {operationSymb}
        <span>{secondNr}</span>
        <p style={resultStyle}>Answer: </p>
        <UserInput changed={(event) => checkAnswerHandler(event)} newNumber={newNumbers} />
        <span>Points: {points}</span>
      </div>
    );
  }

  return (
    <div className="playground">
      <p style={style}>{props.opperation}</p>
      {startButton}
      {timer}
      {mathDisplay}
    </div>
  );
};

export default Radium(playground);
