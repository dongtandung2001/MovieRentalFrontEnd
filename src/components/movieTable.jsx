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
    {
      key: "Rent",
      content: (movie) => (
        <button
          onClick={() => this.props.onRent(movie)}
          className="btn btn-primary btn-sm"
        >
          Rent
        </button>
      ),
    },
  ];

  deleteColumn = {
    key: "Delete",
    content: (movie) => (
      <button
        onClick={() => this.props.onDelete(movie)}
        className="btn btn-danger btn-sm"
      >
        Remove
      </button>
    ),
  };

  rentColumn = {
    key: "Rent",
    content: (movie) => {
      <button
        onClick={() => this.props.onRent(movie)}
        className="btn btn-primary btn-sm"
      >
        Rent
      </button>;
    },
  };

  // Dynamically show a column
  constructor() {
    super();
    const user = auth.getCurrentUser();
    // Manage what admin can see
    if (user && user.isAdmin) {
      // Only admin can see the delete button
      this.columns.push(this.deleteColumn);
      this.columns.filter((c) => c.path === "title")[0].content = (movie) => (
        <Link className="nav nav-link" to={`/movies/${movie._id}`}>
          {movie.title}
        </Link>
      );
      // Only show Rent button to user, not admin
      this.columns.splice(
        this.columns.findIndex((c) => c.key === "Rent"),
        1
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
