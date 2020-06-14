import React from "react";
import "./UserOutput.css";
import Radium from "radium";

const userOutput = (props) => {
  const style = { fontSize: "40px", color: props.textColor, "@media (max-width: 500px)": { fontSize: "30px" } };

  return (
    <div className={props.textColor === "red" ? "incorrect" : null}>
      <p style={style}>{props.name}</p>
    </div>
  );
};

export default Radium(userOutput);
