import { useEffect, useState } from 'react';
import malacy from './PetitPoisson.png'
import poisson from './2560px-Common_goldfish_silhouette.svg.png'
import poisson2 from './PoissonGauche.png'
import './Home.css';
import Movie from '../../components/Movie/Movie.jsx'
import MoviesTable from '../../components/MoviesTable/MoviesTable';
import axios from 'axios';


function Home() {
  const [movies, setMovies] = useState([]);
  const [movieName, setMovieName] = useState("");

  const [minRating, setMinRating] = useState(0);
  const [page, setPage] = useState(1);
  const next_page = (event) => {
    if (page != 10) { setPage(page + 1); }
  }
  const prev_page = (event) => {
    if (page != 1) { setPage(page - 1); }
  }
  //const [sort, setSort] = useState(0);//0 : pas de tri 1: film plus recent 2: film plus ancien
  const [sortName, setSortName] = useState("Pas de tri");
  const next_sort = (event) => {    
    if (sortName == "film ancien") { setSortName("Pas de tri");}
    if (sortName == "Pas de tri") { setSortName("film recent");}
    if (sortName == "film recent") { setSortName("film ancien");}


  }
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
      <div className="container">
        <div className="bulles"><img src={poisson2} className="image-align-left" alt="Petit poisson" /></div>
      </div>
      <div className="container">
        <div className="bulles"><img src={poisson} className="image-align-right" alt="Petit poisson" /></div>
      </div>
      <header className="App-header">
        <p>{movieName}</p>
        <img src={malacy} className="App-logo" alt="logo" />
        <h1>Recommendations de films</h1>
        <label htmlFor="textInput">Rechercher un film :
          <input type="text" id="film" name="film" size="10" value={movieName} onChange={(event) => setMovieName(event.target.value)} />
          <br/> 
          Note minimale : {minRating}<br/> 
          <input 
                type="range" 
                min="0" 
                max="10" 
                step="0.1" 
                value={minRating} 
                onChange={e => setMinRating(parseFloat(e.target.value))} 
                style={{ width: '80%', marginBottom: '20px' }} 
            /> <br/> 
            <button onClick={next_sort}>
            {sortName}</button>     
        </label>
        <p>
          <button onClick={prev_page}>
            prev</button> {page} <button onClick={next_page}>
            next</button>
        </p>

        <MoviesTable page={page} search={movieName} note_min={minRating} sort_type={sortName}> </MoviesTable>

        <p>
          <button onClick={prev_page}>
            prev</button> {page} <button onClick={next_page}>
            next</button>
        </p>
        <ul class="movies-container">
          {
            //movies.map((movie, index) => <Movie key={index} movie={movie}/>)
          }
        </ul>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
          ></a>
      </header>
    </div>
  );
}

export default Home;
