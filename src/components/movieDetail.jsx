import React, { Component } from "react";
import { useParams, useNavigate } from "react-router-dom";

function MovieDetail() {
  const navigate = useNavigate();

  let { id } = useParams();
  console.log(id);
  return (
    <div>
      <h1>Movie Form {id}</h1>
      <button
        className="btn btn-sm btn-primary"
        onClick={() => navigate("/movies", { replace: true })}
      >
        Save
      </button>
    </div>
  );
}

export default MovieDetail;
