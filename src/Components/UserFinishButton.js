import React from "react";

const userFinishButton = (props) => {
  const style = {
    margin: "3px",
    cursor: "pointer",
    width: "20%",
    height: "2.5em",
    border: "none",
    backgroundColor: "Transparent",
  };
  const styleButton = { width: "50%", margin: "10px" };

  return (
    <div>
      <button style={style} onClick={props.onClick}>
        <img style={styleButton} src={require("../arrow.png")} />
      </button>
    </div>
  );
};

export default userFinishButton;
