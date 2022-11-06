import React, { Component } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import NavBar from "./components/navbar";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import MovieDetail from "./components/movieDetail";
import NotFound from "./components/notFound";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import LogOut from "./components/logout";
import User from "./components/user";
import auth from "./services/authService";
import ProfileForm from './components/profileForm';
import PrivateRoutes from "./components/common/protectedRoutes";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";
class App extends Component {
  state = {};
  async componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }
  render() {
    return (
      <main className='container'>
        <NavBar user={this.state.user} />
        <ToastContainer />
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route element={<MovieDetail />} path='/movies/:id' />
            <Route element={<ProfileForm />} path='/profile' />

          </Route>
          <Route path='/movies' element={<Movies user={this.state.user} />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/logout' element={<LogOut />} />
          <Route path='/register' element={<RegisterForm />} />
          <Route path='/customers' element={<Customers />} />
          <Route path='/rentals' element={<Rentals />} />
          <Route path='/user' element={<User />} />
          <Route path='/not-found' element={<NotFound />} />
          <Route path='/' element={<Navigate to={"/movies"} />} />
          <Route path='*' element={<Navigate to={"not-found"} />} />
        </Routes>
      </main>
    );
  }
}

export default App;
