import React, { Component } from "react";
import { Link } from "react-router-dom";
import getMovies from "../services/fakeMovieService";
import { deleteMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { paginate } from "../utils/paginate";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import MoviesTable from "./movieTable";
import SearchBar from "./search";

import _ from "lodash";
class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    searchQuery: "",
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({
      movies: getMovies(),
      genres,
      selectedGenre: genres[0],
    });
  }

  handleDelete = (id) => {
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

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  render() {
    // Do not display table if there arent any movies in the database
    if (this.state.movies.length === 0)
      return <p>There are no movies in the database</p>;
    // If delete all movies on a page, don't show an empty page but rather go back to previus page
    if (
      this.state.currentPage >
      Math.ceil(this.state.movies.length / this.state.pageSize)
    ) {
      this.setState({ currentPage: this.state.currentPage - 1 });
    }

    // filter before paginating
    let filtered = this.state.movies;

    if (this.state.searchQuery) {
      filtered = filtered.filter((m) =>
        m.title.toLowerCase().startsWith(this.state.searchQuery.toLowerCase())
      );
    } else {
      filtered =
        this.state.selectedGenre && this.state.selectedGenre._id
          ? this.state.movies.filter(
              (m) => m.genre._id === this.state.selectedGenre._id
            )
          : this.state.movies;
    }

    const sorted = _.orderBy(
      filtered,
      [this.state.sortColumn.path],
      [this.state.sortColumn.order]
    );
    const movies = paginate(
      sorted,
      this.state.currentPage,
      this.state.pageSize
    );
    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            items={this.state.genres}
            onItemSelect={this.handleGenreSelect}
            selectedItem={this.state.selectedGenre}
            // textProperty="name" // define Default Props in listGroup.jsx
            // valueProperty="_id"
          />
        </div>
        <div className="col">
          <Link className="nav nav-link" to="/movies/new">
            <button className="btn btn-sm btn-primary">New Movies</button>
          </Link>
          <p>Showing {filtered.length} movies in the database</p>
          <SearchBar
            value={this.state.searchQuery}
            onChange={this.handleSearch}
          />
          <MoviesTable
            movies={movies}
            sortColumn={this.state.sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={filtered.length}
            pageSize={this.state.pageSize}
            onPageChange={this.handleChange}
            currentPage={this.state.currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
