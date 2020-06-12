import React from "react";
import "./Toolbar.css";
import logo from "../../images/logo.png";

const style = {
  cursor: "pointer",
};

const toolbar = (props) => (
  <header className="Toolbar">
    <div style={style} onClick={props.onClick} className="Desktop">
      ADDITION
    </div>
    <div onClick={props.onClick} className="Mobile">
      ADD
    </div>
    <div style={style} className="Desktop">
      <a onClick={props.onClick}>SUBTRACTION</a>
    </div>
    <div onClick={props.onClick} className="Mobile">
      SUB
    </div>
    <div className="logoDiv">
      <img className="logo" src={logo} alt="Logo"></img>
    </div>
    <div style={style} onClick={props.onClick} className="Desktop">
      MULTIPLICATION
    </div>
    <div onClick={props.onClick} className="Mobile">
      MULT
    </div>
    <div style={style} onClick={props.onClick} className="Desktop">
      DIVISION
    </div>
    <div onClick={props.onClick} className="Mobile">
      DIV
    </div>
  </header>
);

export default toolbar;
