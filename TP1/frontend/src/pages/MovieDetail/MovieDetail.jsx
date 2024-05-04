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
  const [trailerUrl, setTrailerUrl] = useState(null); // Stocke l'URL de la bande annonce
  const [rating, setRating] = useState(0); // Stocke la note donnée par l'utilisateur (par défaut, 0 étoiles)

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

  // Fonction pour enregistrer la note dans la base de données
  const saveRating = () => {
    // Envoyer la note au backend pour enregistrement
    axios.post(`URL_DU_BACKEND`, { movieId, rating })
      .then(response => {
        console.log('Note enregistrée avec succès:', response.data);
        // Vous pouvez afficher un message de confirmation ou effectuer d'autres actions si nécessaire
      })
      .catch(error => {
        console.error('Erreur lors de l\'enregistrement de la note:', error);
        // Vous pouvez gérer les erreurs de manière appropriée
      });
  };

  // Si les données du film sont en cours de chargement, affichez un message de chargement
  if (loading) {
    return <div>Chargement...</div>;
  }

  // Si une erreur s'est produite lors de la récupération des données du film, affichez un message d'erreur
  if (error) {
    return <div>Une erreur s'est produite : {error.message}</div>;
  }

  // Fonction pour ouvrir la bande annonce en grand
  const openTrailer = () => {
    window.open(trailerUrl, '_blank');
  };

  // Fonction pour mettre à jour la note lorsqu'une étoile est cliquée
  const handleStarClick = (starValue) => {
    // Vérifier si la note actuelle est égale à la valeur de l'étoile cliquée
    // Si c'est le cas, définir la note sur 0 pour annuler la note précédente
    const newRating = starValue === rating ? 0 : starValue;
    setRating(newRating);
  };

  // Affichez les détails du film une fois qu'ils sont disponibles
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '800px', padding: '20px', background: 'rgba(255, 255, 255, 0.8)', borderRadius: '10px' }}>
        <h1 style={{ fontSize: '2em', textAlign: 'center', color: 'black' }}>{movie.title}</h1>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} style={{ width: '200px', marginRight: '20px', cursor: 'pointer' }} onClick={() => openTrailer()} />
          <div>
            <p style={{ color: 'black' }}><strong><u>Date de sortie :</u></strong> {movie.release_date}</p>
            <p style={{ color: 'black' }}><strong><u>Langue originale :</u></strong> {movie.spoken_languages[0].name}</p>
            <p style={{ color: 'black' }}><strong><u>Genres :</u></strong> {movie.genres.map(genre => genre.name).join(', ')}</p>
            <p style={{ color: 'black' }}><strong><u>Synopsis :</u></strong> {movie.overview}</p>
            <p style={{ color: 'black' }}><strong><u>Une production de :</u></strong> {movie.production_companies.map(production_companies => production_companies.name).join(', ')}</p>
            <p style={{ color: 'black' }}><strong><u>Popularité :</u></strong> {movie.popularity}</p>
            <p style={{ color: 'black' }}><strong><u>Vote moyen :</u></strong> {movie.vote_average}</p>
            <p style={{ color: 'black' }}><strong><u>Nombre de votes :</u></strong> {movie.vote_count}</p>
            <p style={{ color: 'black' }}><strong><u>Adulte :</u></strong> {movie.adult ? 'Oui' : 'Non'}</p>
            {/* Affichage des étoiles pour la notation */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              {[1, 2, 3, 4, 5].map((starValue) => (
                <span key={starValue} style={{ cursor: 'pointer', color: starValue <= rating ? 'yellow' : 'gray' }} onClick={() => handleStarClick(starValue)}>★</span>
              ))}
            </div>
            {/* Bouton pour enregistrer la note */}
            <button onClick={saveRating}>Enregistrer</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
