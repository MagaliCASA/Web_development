import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function MovieDetail() {
  const params = useParams(); // Récupère l'identifiant du film de l'URL
  const movieId = params.movieId;
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null); // Stocke l'URL de l'image d'arrière-plan

  useEffect(() => {
    // Faites un appel API pour récupérer les détails du film en fonction de movieId
    axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=57359ff087905e870d40ba4880a1dce0`)
      .then(response => {
        setMovie(response.data); // Met à jour l'état avec les données du film
        setBackgroundImage(`https://image.tmdb.org/t/p/original${response.data.backdrop_path}`); // Met à jour l'URL de l'image d'arrière-plan
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
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '800px', padding: '20px', background: 'rgba(255, 255, 255, 0.8)', borderRadius: '10px' }}>
        <h1 style={{ fontSize: '2em', textAlign: 'center', color: 'black' }}>{movie.title}</h1>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} style={{ width: '200px', marginRight: '20px' }} />
          <div>
            <p style={{ color: 'black' }}><strong><u>Date de sortie :</u></strong> {movie.release_date}</p>
            <p style={{ color: 'black' }}><strong><u>Langue originale :</u></strong> {movie.original_language}</p>
            <p style={{ color: 'black' }}><strong><u>Synopsis :</u></strong> {movie.overview}</p>
            <p style={{ color: 'black' }}><strong><u>Popularité :</u></strong> {movie.popularity}</p>
            <p style={{ color: 'black' }}><strong><u>Vote moyen :</u></strong> {movie.vote_average}</p>
            <p style={{ color: 'black' }}><strong><u>Nombre de votes :</u></strong> {movie.vote_count}</p>
            <p style={{ color: 'black' }}><strong><u>Adulte :</u></strong> {movie.adult ? 'Oui' : 'Non'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
