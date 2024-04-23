import { useEffect, useState } from 'react';
import axios from 'axios';
import './Movie.css';

const useData = () => {
  const [movie, date, setmovie, setdate] = useState([])

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/popular?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb`)
      .then((response) => {
        // Do something if call succeeded
        const movieTitle = response.data.results.map(movie => movie.original_title);
        const date_sortie = response.data.results.map(movie => movie.release_date);

        // Mettre à jour l'état de 'movies' avec la liste des titres originaux
        setmovie(movieTitle);
        setdate(date_sortie);
      })
      .catch((error) => {
        // Do something if call failed
        console.log(error)
      });
  }, []);

  return { movie, date };
};

function Movie() {
  const { movies, date } = useData();

  return (
    <div>
      <ul>
        {movies.map((movie) =>
          <li>{movie.original_title} "sorti le" {movie.original_title}</li>
        )}
      </ul>
    </div>
  );

};

export default Movie;
