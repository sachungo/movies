import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const Presenter = props => (
  <div className="movies-list">
    {props.movies.map(movie => (
      <div className="movie">
        <image src={movie.image} alt="movie-poster"/>
        <p>{movie.title}</p>
      </div>
    ))}
  </div>
);

export default Presenter;
