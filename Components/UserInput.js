import React from "react";

const userInput = (props) => {
  const style = {
    width: "50%",
    height: "2.5em",
    border: "2px solid black",
    borderRadius: "5px",
    textAlign: "center",
  };

  return (
    <div>
      <input
        type="text"
        style={style}
        onChange={props.changed}
        placeholder={props.placeholder}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
      />
    </div>
  );
};

export default userInput;
