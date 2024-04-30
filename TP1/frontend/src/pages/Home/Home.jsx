import { useEffect, useState } from 'react';
import logo from './logo.svg';
import malacy from './malacyv2.png'
import './Home.css';
import Movie from '../../components/Movie/Movie.jsx'
import axios from 'axios';

function Home() {
  const [movies, setMovies] = useState([]);
  const [movieName, setMovieName] = useState("");

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/popular?api_key=57359ff087905e870d40ba4880a1dce0`)
      .then((response) => {
        const popularMovies = response.data.results;
        // Pour chaque film, récupérer l'image
        Promise.all(popularMovies.map(movie =>
          axios.get(`https://image.tmdb.org/t/p/original${movie.poster_path}`)
        )).then(responses => {
          // Pour chaque réponse, ajouter l'image au film correspondant
          const moviesWithImages = popularMovies.map((movie, index) => ({
            ...movie,
            image: responses[index].config.url
          }));
          // Mettre à jour l'état des films avec les images
          setMovies(moviesWithImages);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <label htmlFor="textInput">Rechercher un film : 
          <input type="text" id="film" name="film" size="10" value={movieName} onChange={(event) => setMovieName(event.target.value)} />
        </label>
        <p>{movieName}</p>
        <img src={malacy} className="App-logo" alt="logo" />
        <h1>Recommendations de films</h1>
        <ul class="movies-container">
          {movies.map((movie, index) => <Movie key={index} movie={movie}/>)}
        </ul>
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
