import React, { Component } from "react";

const Like = () => {
  let classes = "fa fa-heart";
  if (!this.props.liked) {
    classes += "-o";
  }
  return (
    <button className="btn btn-sm border-0">
      <i
        className={classes}
        aria-hidden="true"
        onClick={this.props.onLikeToggle}
      ></i>
    </button>
  );
};

export default Like;
