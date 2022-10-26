import React, { Component } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import jwtDecode from "jwt-decode";

import NavBar from "./components/navbar";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import MovieDetail from "./components/movieDetail";
import NotFound from "./components/notFound";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import { getUser } from "./services/userService";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import LogOut from "./components/logout";
class App extends Component {
  state = {};
  async componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      // decode using npm jwt-decode
      const user = jwtDecode(jwt);
      this.setState({ user });
    } catch (error) {}
  }
  render() {
    return (
      <main className='container'>
        <NavBar user={this.state.user} />
        <ToastContainer />
        <Routes>
          <Route path='/movies/:id' element={<MovieDetail />} />
          <Route path='/movies' element={<Movies />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/logout' element={<LogOut />} />
          <Route path='/register' element={<RegisterForm />} />
          <Route path='/customers' element={<Customers />} />
          <Route path='/rentals' element={<Rentals />} />
          <Route path='/not-found' element={<NotFound />} />
          <Route path='*' element={<Navigate to={"not-found"} />} />
          <Route path='/' element={<Navigate to={"/movies"} />} />
        </Routes>
      </main>
    );
  }
}

export default App;
