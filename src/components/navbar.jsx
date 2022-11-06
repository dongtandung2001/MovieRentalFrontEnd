import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand h1" to="/">
          Vidly
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link
              className="nav-item nav-link"
              aria-current="page"
              to="/movies"
            >
              Movies
            </Link>
            {user && user.isAdmin && (
              <Link className="nav-item nav-link" to="/customers">
                Customers
              </Link>
            )}

            {user && user.isAdmin && (
              <Link className="nav- item nav-link" to="/rentals">
                Rentals
              </Link>
            )}

            {!user && (
              <React.Fragment>
                <Link className="nav-item nav-link" to="/login">
                  Login
                </Link>
                <Link className="nav-item nav-link" to="/register">
                  Register
                </Link>
              </React.Fragment>
            )}

            {user && (
              <React.Fragment>
                <Link className="nav-item nav-link " to="/user">
                  MyProfile
                </Link>
                <Link className="nav-item nav-link" to="/logout">
                  Logout
                </Link>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
