import React from "react";

const userOutput = (props) => {
  const style = { fontSize: "40px" };

  return (
    <div>
      <p style={style}>{props.name}</p>
    </div>
  );
};

export default userOutput;
