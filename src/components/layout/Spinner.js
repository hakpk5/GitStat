import React, { Fragment } from "react";
import spinner from "./spinner.gif";

const imgStyle = {
  width: "200px",
  margin: "auto",
  display: "block",
};

function Spinner(props) {
  return (
    <Fragment>
      <img src={spinner} alt="Loading..." style={imgStyle} />
    </Fragment>
  );
}

export default Spinner;
