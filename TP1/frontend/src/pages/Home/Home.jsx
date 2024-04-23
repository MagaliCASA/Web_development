import logo from './logo.svg';
import './Home.css';
import React, { useEffect, useState } from 'react';
import Movie from '../../components/Movie/Movie.jsx'
import axios from 'axios';

const useFetchMovies = () => {
  const [movies, setmovies] = useState([])
  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/popular?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb`)
      .then((response) => {
        setmovies(movies.concat(response.data.results));
      })
      .catch((error) => {
        // Do something if call failed
        console.log(error)
      });
  }, []);
  return { movies, setmovies };
};

function Home() {
  const [movieName, setmovieName] = useState("");
  const { movies, setmovies } = useFetchMovies();

  console.log(movies);
  return (
    <div className="App">
      <header className="App-header">
        <label>
          Recherche de films :
          <input type="text" Name="film" value={movieName} onChange={(event) =>
            setmovieName(event.target.value)} />
        </label>
        <input type="submit" value="Submit" />

        <h3>Résultats de la recherche</h3>
        <p>
          {movieName}
        </p>

        <div>
          <h2>Liste de films populaires :</h2>
          <ul>
            {movies.map((movie) => <Movie />
            )}
          </ul>
        </div>

        <h1>Recommendations de films</h1>
        <p>
          1. Insaisissables
        </p>
        <p>
          2. Indiana Jones
        </p>
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default Home;
