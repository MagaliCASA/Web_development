import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Suppose que vous utilisez axios pour faire des appels API
import '../../components/Movie/Movie.css';

function MovieDetail() {
  const { movieId } = useParams(); // Extrait l'identifiant du film de l'URL
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    // Faites un appel API pour récupérer les détails du film en fonction de movieId
    axios.get(`URL_de_votre_API/${movieId}`)
      .then(response => {
        setMovie(response.data); // Met à jour l'état avec les données du film
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des détails du film:', error);
      });
  }, [movieId]);

  // Si les données du film sont en cours de chargement ou n'existent pas encore, affichez un message de chargement
  if (!movie) {
    return <div>Chargement...</div>;
  }

  // Affichez les détails du film une fois qu'ils sont disponibles
  return (
    <div>
      <h2>{movie.original_title}</h2>
      <p>Titre du film : {movie.original_title}</p>
      <p>Date de sortie : {movie.release_date}</p>
      {/* Ajoutez d'autres détails du film ici */}
    </div>
  );
}

export default MovieDetail;
