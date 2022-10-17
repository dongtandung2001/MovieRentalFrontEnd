import React from "react";
import Like from "./common/like";

function MovieTable(props) {
  const { movies, onDelete, onLike } = props;
  return (
    <table className="table">
      <thead className="thead-dark">
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Genre</th>
          <th scope="col">Stock</th>
          <th scope="col">Rate</th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {movies.map((movie) => {
          const { _id, title, genre, numberInStock, dailyRentalRate, liked } =
            movie;
          return (
            <tr key={_id}>
              <td className="w-10" key={title}>
                {title}
              </td>
              <td className="w-20" key={genre}>
                {genre.name}
              </td>
              <td className="w-20" key={numberInStock}>
                {numberInStock}
              </td>
              <td className="w-20" key={dailyRentalRate}>
                {dailyRentalRate}
              </td>
              <td className="w-15">
                <Like liked={liked} onLikeToggle={() => onLike(movie)} />
              </td>
              <td className="w-15">
                <button
                  onClick={() => onDelete(_id)}
                  className="btn btn-danger btn small"
                >
                  Remove
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default MovieTable;
