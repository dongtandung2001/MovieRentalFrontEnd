import React, { Component } from "react";
import { deleteMovie } from "../services/fakeMovieService";
import getMovies from "../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";

class MovieTable extends Component {
  state = {
    movies: getMovies(),
    pageSize: 4,
    currentPage: 1,
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

  handleChange = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    // If delete all movies on a page, don't show an empty page but rather go back to previus page
    if (
      this.state.currentPage >
      Math.ceil(this.state.movies.length / this.state.pageSize)
    ) {
      this.setState({ currentPage: this.state.currentPage - 1 });
    }

    // Do not display table if there arent any movies in the database
    if (this.state.movies.length === 0)
      return <p>There are no movies in the database</p>;

    const movies = paginate(
      this.state.movies,
      this.state.currentPage,
      this.state.pageSize
    );
    return (
      <React.Fragment>
        <h3>Showing {movies.length} movies in the database</h3>
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
        <Pagination
          itemsCount={this.state.movies.length}
          pageSize={this.state.pageSize}
          onPageChange={this.handleChange}
          currentPage={this.state.currentPage}
        />
      </React.Fragment>
    );
  }
}

export default MovieTable;
