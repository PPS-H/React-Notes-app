import React from "react";

const Alert = (props) => {
  return (
     props.msg && <div class={`alert alert-${props.type}`} role="alert">
      {props.msg}
    </div>
  );
};

export default Alert;
