import React from "react";

function Like(props) {
  let classes = "fa fa-heart";
  if (!props.liked) {
    classes += "-o";
  }
  return (
    <button className="btn btn-sm border-0">
      <i
        className={classes}
        aria-hidden="true"
        onClick={props.onLikeToggle}
      ></i>
    </button>
  );
}

export default Like;
