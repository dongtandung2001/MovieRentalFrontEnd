import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "./../services/genreService";
import { paginate } from "../utils/paginate";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import MoviesTable from "./movieTable";
import SearchBar from "./search";
import * as customerService from "../services/customerService";
import * as auth from "../services/authService";
import * as rentService from "../services/rentingService";

import _ from "lodash";
import { toast } from "react-toastify";
import { withRouter } from "../utils/withRouter";
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

  async componentDidMount() {
    // calling api services
    const { data: movies } = await getMovies();
    const { data: allGenres } = await getGenres();

    const genres = [{ _id: "", name: "All Genres" }, ...allGenres];

    this.setState({
      movies: movies,
      genres,
      selectedGenre: genres[0],
    });
  }

  handleDelete = async (movie) => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter((m) => m._id !== movie._id);
    this.setState({ movies });

    try {
      await deleteMovie(movie);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("This movie has been already deleted");
      }

      this.setState({ movies: originalMovies });
    }
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

  handleRent = async (movie) => {
    // Redirect if user has not login
    const user = auth.getCurrentUser();
    if (!user) {
      return this.props.navigate("/login", { replace: true });
    }

    // get customer information for making a rental
    const { data: customer } = await customerService.getCustomer(user.customer);

    try {
      await rentService.rent(movie, customer);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error(ex.response.data);
      }
    }
  };

  render() {
    // Dynamically show compenent based on user's information
    // Get user from the props
    const { user } = this.props;
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
          {user && user.isAdmin && (
            <React.Fragment>
              <Link className="nav nav-link" to="/movies/new">
                <button className="btn btn-sm btn-primary">New Movies</button>
              </Link>
            </React.Fragment>
          )}
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
            onRent={this.handleRent}
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

export default withRouter(Movies);
