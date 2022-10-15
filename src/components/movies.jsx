import React, { Component } from "react";
import { deleteMovie } from "../services/fakeMovieService";
import getMovies from "../services/fakeMovieService";
import Like from "./like";

class MovieTable extends Component {
  state = {
    movies: getMovies(),
  };

  removeFunc = (id) => {
    deleteMovie(id);
    this.setState({ movies: getMovies() });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.movies.length !== 0 && (
          <h3>Showing {this.state.movies.length} movies in the database</h3>
        )}
        {this.state.movies.length === 0 && (
          <h3>There are no movies in the database</h3>
        )}
        {this.state.movies && this.state.movies.length > 0 && (
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
              {this.state.movies.map((movie) => {
                const {
                  _id,
                  title,
                  genre,
                  numberInStock,
                  dailyRentalRate,
                  liked,
                } = movie;
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
                      <Like
                        liked={liked}
                        onLikeToggle={() => this.handleLike(movie)}
                      />
                    </td>
                    <td className="w-15">
                      <button
                        onClick={() => this.removeFunc(_id)}
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
        )}
      </React.Fragment>
    );
  }
}

export default MovieTable;
