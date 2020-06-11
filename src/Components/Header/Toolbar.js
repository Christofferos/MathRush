import React from "react";
import "./Toolbar.css";
import logo from "../../images/logo.png";

const toolbar = (props) => (
  <header className="Toolbar">
    <div className="Desktop">ADDITION</div>
    <div className="Mobile">ADD</div>
    <div className="Desktop">SUBTRACTION</div>
    <div className="Mobile">SUB</div>
    <div className="logoDiv">
      <img className="logo" src={logo} alt="Logo"></img>
    </div>
    <div className="Desktop">MULTIPLICATION</div>
    <div className="Mobile">MULT</div>
    <div className="Desktop">DIVISION</div>
    <div className="Mobile">DIV</div>
  </header>
);

export default toolbar;
