import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/navbar';
import Movies from './components/movies';
import Customers from './components/customers';
import Rentals from './components/rentals';
import MovieDetail from './components/movieDetail';
import NotFound from './components/notFound';
import LoginForm from './components/loginForm';
import './App.css';

function App() {
  return (
    <main className='container'>
      <NavBar />
      <Routes>
        <Route path='/movies/:id' element={<MovieDetail />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/customers' element={<Customers />} />
        <Route path='/rentals' element={<Rentals />} />
        <Route path='/not-found' element={<NotFound />} />
        <Route path='*' element={<Navigate to={'not-found'} />} />
        <Route path='/' element={<Navigate to={'/movies'} />} />
      </Routes>
    </main>
  );
}

export default App;
