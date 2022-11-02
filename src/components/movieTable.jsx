import React, { Component } from "react";
import { Link } from "react-router-dom";
import auth from "../services/authService";
import Like from "./common/like";
import Table from "./common/table";

class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "Like",
      content: (movie) => (
        <Like
          liked={movie.liked}
          onLikeToggle={() => this.props.onLike(movie)}
        />
      ),
    },
  ];

  deleteColumn = {
    key: "Delete",
    content: (movie) => (
      <button
        onClick={() => this.props.onDelete(movie)}
        className="btn btn-danger btn small"
      >
        Remove
      </button>
    ),
  };

  // Dynamically show a column
  constructor() {
    super();
    const user = auth.getCurrentUser();
    // Only admin can see the delete button
    if (user && user.isAdmin) {
      this.columns.push(this.deleteColumn);
      this.columns.filter((c) => c.path === "title")[0].content = (movie) => (
        <Link className="nav nav-link" to={`/movies/${movie._id}`}>
          {movie.title}
        </Link>
      );
    }
  }

  render() {
    const { movies, onSort, sortColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        data={movies}
        onSort={onSort}
        sortColumn={sortColumn}
      />
    );
  }
}

export default MoviesTable;
