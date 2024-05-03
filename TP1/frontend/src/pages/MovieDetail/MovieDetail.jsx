import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function MovieDetail() {
  const params = useParams(); // Récupère l'identifiant du film de l'URL
  const movieId = params.movieId;
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Faites un appel API pour récupérer les détails du film en fonction de movieId
    axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=57359ff087905e870d40ba4880a1dce0`)
      .then(response => {
        setMovie(response.data); // Met à jour l'état avec les données du film
        setLoading(false); // Met à jour l'état de chargement
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des détails du film:', error);
        setError(error); // Met à jour l'état d'erreur
        setLoading(false); // Met à jour l'état de chargement
      });
  }, [movieId]);

  // Si les données du film sont en cours de chargement, affichez un message de chargement
  if (loading) {
    return <div>Chargement...</div>;
  }

  // Si une erreur s'est produite lors de la récupération des données du film, affichez un message d'erreur
  if (error) {
    return <div>Une erreur s'est produite : {error.message}</div>;
  }

  // Affichez les détails du film une fois qu'ils sont disponibles
  return (
    <div>
      <h2>{movie.title}</h2>
      <p>Titre du film : {movie.title}</p>
      <p>Date de sortie : {movie.release_date}</p>
      <p>Popularité : {movie.popularity}</p>
      <p>Vote moyen : {movie.vote_average}</p>
      <p>Nombre de votes : {movie.vote_count}</p>
      <p>Adulte : {movie.adult ? 'Oui' : 'Non'}</p>
      <p>Langue originale : {movie.original_language}</p>
      <p>Synopsis : {movie.overview}</p>
      <p>Image d'arrière-plan : <img src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`} alt={movie.title} /></p>
      <p>Affiche : <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} /></p>
      {/* Ajoutez d'autres détails du film ici */}
    </div>
  );
}

export default MovieDetail;
