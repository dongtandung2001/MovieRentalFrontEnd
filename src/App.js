import './App.css';
import React from 'react';
import NavBar from './components/navbar';
import Movies from './components/movies';
import { Routes, Route } from 'react-router-dom';
import Customers from './components/customers';
import Rentals from './components/rentals';
import MovieDetail from './components/movieDetail';
import NotFound from './components/notFound';
import { Navigate } from 'react-router-dom';

function App() {
  return (
    <main className='container'>
      <NavBar />
      <Routes>
        <Route path='/movies' element={<Movies />} />
        <Route path='/movies/:id' element={<MovieDetail />} />
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
