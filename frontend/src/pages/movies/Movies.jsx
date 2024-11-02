import React, { useEffect, useState } from 'react'
import {useLocation} from 'react-router-dom';
import './movies.css';

const Movies = () => {

  const [movies, setMovies] = useState([]);
  
  const {search} = useLocation();

  const fetchMovies = async()=>{
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/movies${search}`);
      const movies = await response.json();
      setMovies(movies);
    } catch (error) {
      console.log("Error in fetching", error);
    }
  }

  useEffect(()=>{
    fetchMovies();
  },[]);
  return (
    <div className='Movies_container'>
      {movies && movies.map(movie => (
          <div key={movie.id} className='blog-post'>
            <img src={movie.imageurl} alt={movie.title} className='movie-image' />
            <div className="movie-info">
              <h2>{movie.name}</h2>
              <p>{movie.description}</p>
              <p>Rating: {movie.ratings} | Release Year: {movie.releaseyear}{" "}
                | total Rating: {movie.totalrating} | Duration: {movie.duration}
              </p>
            </div>
          </div>
        ))}
    </div>
  )
}

export default Movies