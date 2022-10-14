import React, { Component } from "react";
import { deleteMovie } from "../services/fakeMovieService";
import getMovies from "../services/fakeMovieService";

class MovieTable extends Component {
  state = { movies: getMovies() };

  removeFunc = id => {
    deleteMovie(id);
    this.setState({movies: getMovies()});

  };

  render() {
    return (
      <React.Fragment>
        {this.state.movies.length !== 0 && <h3>Showing {this.state.movies.length} movies in the database</h3>}
        {this.state.movies.length === 0 && <h3>There are no movies in the database</h3>}
        {this.state.movies && this.state.movies.length > 0 &&
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
            {this.state.movies.map(({_id,title, genre, numberInStock, dailyRentalRate}) => {
              return (
                <tr key={_id}>
                  <td className="w-25" key={title}>{title}</td>
                  <td className="w-25" key={genre}>{genre.name}</td>
                  <td className="w-25" key={numberInStock}>{numberInStock}</td>
                  <td className="w-25" key={dailyRentalRate}>{dailyRentalRate}</td>
                  <td className="w-25">
                    <button 
                      onClick={() => this.removeFunc(_id)} 
                      className="btn btn-danger btn small">Remove
                      </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        }
      </React.Fragment>
    );
  };
}

export default MovieTable;
