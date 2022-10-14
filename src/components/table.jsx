import React, { Component } from "react";
import { deleteMovie } from "../services/fakeMovieService";
import getMovies from "../services/fakeMovieService";

class MovieTable extends Component {
  state = { movies: getMovies() };

  removeFunc = id => {
    console.log(id);
    this.setState({movies: deleteMovie(id)});
  }

  render() {
    return (
      <main className="container">
        {this.state.movies.length !== 0 && <h3>Showing {this.state.movies.length} movies in the database</h3>}
        {this.state.movies.length === 0 && <h3>There are no movies in the database</h3>}
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Stock</th>
              <th scope="col">Rate</th>
            </tr>
          </thead>
          <tbody>
            {this.state.movies.length !== 0 && this.state.movies.map(({_id,title, genre, numberInStock, dailyRentalRate}) => {
              return (
                <tr key={_id}>
                  <td key={title}>{title}</td>
                  <td key={genre}>{genre.name}</td>
                  <td key={numberInStock}>{numberInStock}</td>
                  <td key={dailyRentalRate}>{dailyRentalRate}</td>
                  <td><button onClick={() => this.removeFunc({id:_id})} className="btn btn-danger btn small">Remove</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
    );
  }
}

export default MovieTable;
