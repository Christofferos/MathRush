import React from "react";
import Radium from "radium";
import arrow from "../images/arrow.png";

const userFinishButton = (props) => {
  // Inline styles:
  const style = {
    margin: "3px",
    cursor: "pointer",
    width: "30%",
    height: "2.5em",
    border: "none",
    backgroundColor: "Transparent",
  };
  const styleButton = {
    width: "50%",
    margin: "10px",

    ":hover": {
      filter: "saturate(1.75)",
      width: "52%",
    },
    "@media (max-width: 500px)": { width: "50px" },
  };

  return (
    <div>
      <button style={style} onClick={props.onClick}>
        <img style={styleButton} alt={"..."} src={arrow} />
      </button>
    </div>
  );
};

export default Radium(userFinishButton);
