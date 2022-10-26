import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import MovieForm from "./movieForm";

function MovieDetail() {
  const navigate = useNavigate();

  let { id } = useParams();
  // console.log(id);
  return (
    <div>
      <MovieForm id={id} navigate={navigate} />
    </div>
  );
}

export default MovieDetail;
