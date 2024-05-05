import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

async function fetchMovieNotesAndUpdateStats(movieId, oldAverage, oldTotalVotes) {
  try {
    // Effectuer une requête GET vers l'endpoint backend pour récupérer les notes du film
    const response = await axios.get(`/api/notes/${movieId}/notes`);
    const { notes, newAverage, totalNotes } = response.data;

    return {newAverage , totalNotes};

    // Vous pouvez maintenant mettre à jour votre interface utilisateur avec les nouvelles statistiques
  } catch (error) {
    console.error('Une erreur est survenue lors de la récupération des notes du film:', error);
    // Gérez l'erreur de manière appropriée dans votre application
  }
}

function MovieDetail() {
  const params = useParams(); // Récupère l'identifiant du film de l'URL
  const movieId = params.movieId;
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null); // Stocke l'URL de l'image d'arrière-plan
  const [trailerUrl, setTrailerUrl] = useState(null); // Stocke l'URL de la bande annonce
  const [rating, setRating] = useState(0); // Stocke la note donnée par l'utilisateur (par défaut, 0 étoiles)
  const [hoverRating, setHoverRating] = useState(0); // Stocke la note en survol de la souris
  const [comment, setComment] = useState(""); // Stocke le commentaire de l'utilisateur
  const [comments, setComments] = useState([]); // Stocke les commentaires du film
  const [commenting, setCommenting] = useState(true); // Boolean pour afficher ou non le champ de commentaire
  const [voting, setVoting] = useState(true); // Boolean pour afficher ou non les étoiles de vote

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

  useEffect(() => {
    // Mettre à jour la note par défaut avec la note moyenne du film
    if (movie && movie.vote_average) {
      setRating(movie.vote_average / 2); // Note moyenne divisée par 2
    }
  }, [movie]);

  // Fonction pour enregistrer la note dans la base de données
  const saveRating = () => {
    // Envoyer la note au backend pour enregistrement
    axios.post(`${import.meta.env.VITE_BACKDEND_URL}/notes/new`, { movieId, rating })
      .then(response => {
        console.log('Note enregistrée avec succès:', response.data);
        // Vous pouvez afficher un message de confirmation ou effectuer d'autres actions si nécessaire
        setVoting(false); // Masquer les étoiles de vote
      })
      .catch(error => {
        console.error('Erreur lors de l\'enregistrement de la note:', error);
        // Vous pouvez gérer les erreurs de manière appropriée
      });
  };

  // Fonction pour enregistrer le commentaire dans la base de données
  const saveComment = () => {
    // Envoyer le commentaire au backend pour enregistrement
    axios.post(`URL_DU_BACKEND`, { movieId, comment })
      .then(response => {
        console.log('Commentaire enregistré avec succès:', response.data);
        // Mettre à jour la liste des commentaires
        setComments([...comments, comment]);
        // Effacer le champ de commentaire après l'enregistrement
        setComment("");
        setCommenting(false); // Masquer le champ de commentaire
      })
      .catch(error => {
        console.error('Erreur lors de l\'enregistrement du commentaire:', error);
        // Vous pouvez gérer les erreurs de manière appropriée
      });
  };

  // Fonction pour ouvrir la bande annonce en grand
  const openTrailer = () => {
    window.open(trailerUrl, '_blank');
  };

  // Fonction pour mettre à jour la note lorsqu'une étoile est cliquée
  const handleStarClick = (starValue) => {
    setRating(starValue);
    saveRating(); // Enregistrer la note
  };

  const {newAverage, totalNotes} = fetchMovieNotesAndUpdateStats(movieId, movie.vote_average, movie.vote_count)

  // Affichez les détails du film une fois qu'ils sont disponibles
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '800px', padding: '20px', background: 'rgba(255, 255, 255, 0.8)', borderRadius: '10px' }}>
        <h1 style={{ fontSize: '2em', textAlign: 'center', color: 'black' }}>{movie && movie.title}</h1>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img src={`https://image.tmdb.org/t/p/original${movie && movie.poster_path}`} alt={movie && movie.title} style={{ maxWidth: '50%', maxHeight: 'auto', marginRight: '20px', cursor: 'pointer' }} onClick={() => openTrailer()} />
          {movie && movie.adult && <img src="https://example.com/adult-image.png" alt="Interdit aux moins de 18 ans" />}
          <div>
            <p style={{ color: 'black' }}><strong><u>Date de sortie :</u></strong> {movie && movie.release_date}</p>
            <p style={{ color: 'black' }}><strong><u>Langue originale :</u></strong> {movie && movie.original_language}</p>
            <p style={{ color: 'black' }}><strong><u>Genres :</u></strong> {movie && movie.genres.map(genre => genre.name).join(', ')}</p>
            <p style={{ color: 'black' }}><strong><u>Synopsis :</u></strong> {movie && movie.overview}</p>
            <p style={{ color: 'black' }}><strong><u>Une production de :</u></strong> {movie && movie.production_companies.map(production_companies => production_companies.name).join(', ')}</p>
            <p style={{ color: 'black' }}><strong><u>Popularité :</u></strong> {movie && movie.popularity}</p>
            <p style={{ color: 'black' }}><strong><u>Vote moyen :</u></strong> {movie && newAverage}</p>
            <p style={{ color: 'black' }}><strong><u>Nombre de votes :</u></strong> {movie && totalNotes}</p>
            {/* Affichage des étoiles pour la notation */}
            {voting && (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <p style={{ color: 'black', marginRight: '10px' }}>Donnez votre note :</p>
                {[1, 2, 3, 4, 5].map((starValue) => (
                  <span
                    key={starValue}
                    style={{
                      cursor: 'pointer',
                      color: (starValue <= (hoverRating || rating)) ? 'yellow' : 'gray',
                      fontSize: '1.5em'
                    }}
                    onMouseEnter={() => setHoverRating(starValue)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => handleStarClick(starValue)}
                  >
                    ★
                  </span>
                ))}
                {/* Bouton pour enregistrer la note */}
                <button style={{ padding: '10px 20px', justifyContent: 'center', fontSize: '1em', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginLeft: '10px' }} onClick={saveRating}>Envoyer la note</button>
              </div>
            )}
            {/* Phrase pour inviter à commenter */}
            {commenting && <p style={{ color: 'black', marginTop: '10px' }}>Laissez un commentaire pour partager votre avis sur le film :</p>}
            {/* Champ de commentaire */}
            {commenting && <textarea placeholder="Laissez un commentaire..." value={comment} onChange={(e) => setComment(e.target.value)} style={{ width: '100%', minHeight: '100px', marginTop: '10px' }} />}
            {/* Bouton pour enregistrer le commentaire */}
            {commenting && <button style={{ marginTop: '10px', padding: '10px 20px', fontSize: '1em', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={saveComment}>Envoyer le commentaire</button>}
            {/* Affichage des commentaires */}
            <div style={{ marginTop: '20px' }}>
              <h2 style={{ color: 'black' }}>Derniers commentaires :</h2>
              <ul>
                {comments.map((comment, index) => (
                  <li key={index}>{comment}</li>
                ))}
              </ul>
            </div>
            {/* Phrase de remerciement pour avoir voté */}
            {!voting && <p style={{ color: 'black', marginTop: '20px' }}>Merci d'avoir voté !</p>}
            {/* Phrase de remerciement pour avoir commenté */}
            {!commenting && <p style={{ color: 'black', marginTop: '20px' }}>Merci d'avoir commenté !</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// function MovieDetail() {
//   const params = useParams(); // Récupère l'identifiant du film de l'URL
//   const movieId = params.movieId;
//   const [movie, setMovie] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [backgroundImage, setBackgroundImage] = useState(null); // Stocke l'URL de l'image d'arrière-plan
//   const [trailerUrl, setTrailerUrl] = useState(null); // Stocke l'URL de la bande annonce
//   const [rating, setRating] = useState(0); // Stocke la note donnée par l'utilisateur (par défaut, 0 étoiles)
//   const [hoverRating, setHoverRating] = useState(0); // Stocke la note en survol de la souris
//   const [comment, setComment] = useState(""); // Stocke le commentaire de l'utilisateur
//   const [comments, setComments] = useState([]); // Stocke les commentaires du film
//   const [commenting, setCommenting] = useState(true); // Boolean pour afficher ou non le champ de commentaire
//   const [voting, setVoting] = useState(true); // Boolean pour afficher ou non les étoiles de vote

//   useEffect(() => {
//     // Faites un appel API pour récupérer les détails du film en fonction de movieId
//     axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=57359ff087905e870d40ba4880a1dce0`)
//       .then(response => {
//         setMovie(response.data); // Met à jour l'état avec les données du film
//         setBackgroundImage(`https://image.tmdb.org/t/p/original${response.data.backdrop_path}`); // Met à jour l'URL de l'image d'arrière-plan
//         setLoading(false); // Met à jour l'état de chargement
//       })
//       .catch(error => {
//         console.error('Erreur lors de la récupération des détails du film:', error);
//         setError(error); // Met à jour l'état d'erreur
//         setLoading(false); // Met à jour l'état de chargement
//       });
//   }, [movieId]);

//   useEffect(() => {
//     // Mettre à jour la note par défaut avec la note moyenne du film
//     if (movie && movie.vote_average) {
//       setRating(movie.vote_average / 2); // Note moyenne divisée par 2
//     }
//   }, [movie]);

//   // Fonction pour enregistrer la note dans la base de données
//   const saveRating = () => {
//     // Envoyer la note au backend pour enregistrement
//     axios.post(`URL_DU_BACKEND`, { movieId, rating })
//       .then(response => {
//         console.log('Note enregistrée avec succès:', response.data);
//         // Vous pouvez afficher un message de confirmation ou effectuer d'autres actions si nécessaire
//         setVoting(false); // Masquer les étoiles de vote
//       })
//       .catch(error => {
//         console.error('Erreur lors de l\'enregistrement de la note:', error);
//         // Vous pouvez gérer les erreurs de manière appropriée
//       });
//   };

//   // Fonction pour enregistrer le commentaire dans la base de données
//   const saveComment = () => {
//     // Envoyer le commentaire au backend pour enregistrement
//     axios.post(`URL_DU_BACKEND`, { movieId, comment })
//       .then(response => {
//         console.log('Commentaire enregistré avec succès:', response.data);
//         // Mettre à jour la liste des commentaires
//         setComments([...comments, comment]);
//         // Effacer le champ de commentaire après l'enregistrement
//         setComment("");
//         setCommenting(false); // Masquer le champ de commentaire
//       })
//       .catch(error => {
//         console.error('Erreur lors de l\'enregistrement du commentaire:', error);
//         // Vous pouvez gérer les erreurs de manière appropriée
//       });
//   };

//   // Fonction pour ouvrir la bande annonce en grand
//   const openTrailer = () => {
//     window.open(trailerUrl, '_blank');
//   };

//   // Fonction pour mettre à jour la note lorsqu'une étoile est cliquée
//   const handleStarClick = (starValue) => {
//     setRating(starValue);
//     saveRating(); // Enregistrer la note
//   };

//   // Affichez les détails du film une fois qu'ils sont disponibles
//   return (
//     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>
//       <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '800px', padding: '20px', background: 'rgba(255, 255, 255, 0.8)', borderRadius: '10px' }}>
//         <h1 style={{ fontSize: '2em', textAlign: 'center', color: 'black' }}>{movie && movie.title}</h1>
//         <div style={{ display: 'flex', justifyContent: 'center' }}>
//           <img src={`https://image.tmdb.org/t/p/original${movie && movie.poster_path}`} alt={movie && movie.title} style={{ maxWidth: '50%', maxHeight: 'auto', marginRight: '20px', cursor: 'pointer' }} onClick={() => openTrailer()} />
//           {movie && movie.adult && <img src="https://example.com/adult-image.png" alt="Interdit aux moins de 18 ans" />}
//           <div>
//             <p style={{ color: 'black' }}><strong><u>Date de sortie :</u></strong> {movie && movie.release_date}</p>
//             <p style={{ color: 'black' }}><strong><u>Langue originale :</u></strong> {movie && movie.original_language}</p>
//             <p style={{ color: 'black' }}><strong><u>Genres :</u></strong> {movie && movie.genres.map(genre => genre.name).join(', ')}</p>
//             <p style={{ color: 'black' }}><strong><u>Synopsis :</u></strong> {movie && movie.overview}</p>
//             <p style={{ color: 'black' }}><strong><u>Une production de :</u></strong> {movie && movie.production_companies.map(production_companies => production_companies.name).join(', ')}</p>
//             <p style={{ color: 'black' }}><strong><u>Popularité :</u></strong> {movie && movie.popularity}</p>
//             <p style={{ color: 'black' }}><strong><u>Vote moyen :</u></strong> {movie && movie.vote_average}</p>
//             <p style={{ color: 'black' }}><strong><u>Nombre de votes :</u></strong> {movie && movie.vote_count}</p>
//             {/* Affichage des étoiles pour la notation */}
//             {voting && (
//               <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//                 <p style={{ color: 'black', marginRight: '10px' }}>Donnez votre note :</p>
//                 {[1, 2, 3, 4, 5].map((starValue) => (
//                   <span
//                     key={starValue}
//                     style={{
//                       cursor: 'pointer',
//                       color: (starValue <= (hoverRating || rating)) ? 'yellow' : 'gray',
//                       fontSize: '1.5em'
//                     }}
//                     onMouseEnter={() => setHoverRating(starValue)}
//                     onMouseLeave={() => setHoverRating(0)}
//                     onClick={() => handleStarClick(starValue)}
//                   >
//                     ★
//                   </span>
//                 ))}
//                 {/* Bouton pour enregistrer la note */}
//                 <button style={{ padding: '10px 20px', justifyContent: 'center', fontSize: '1em', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginLeft: '10px' }} onClick={saveRating}>Envoyer la note</button>
//               </div>
//             )}
//             {/* Phrase pour inviter à commenter */}
//             {commenting && <p style={{ color: 'black', marginTop: '10px' }}>Laissez un commentaire pour partager votre avis sur le film :</p>}
//             {/* Champ de commentaire */}
//             {commenting && <textarea placeholder="Laissez un commentaire..." value={comment} onChange={(e) => setComment(e.target.value)} style={{ width: '100%', minHeight: '100px', marginTop: '10px' }} />}
//             {/* Bouton pour enregistrer le commentaire */}
//             {commenting && <button style={{ marginTop: '10px', padding: '10px 20px', fontSize: '1em', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={saveComment}>Envoyer le commentaire</button>}
//             {/* Affichage des commentaires */}
//             <div style={{ marginTop: '20px' }}>
//               <h2 style={{ color: 'black' }}>Derniers commentaires :</h2>
//               <ul>
//                 {comments.map((comment, index) => (
//                   <li key={index}>{comment}</li>
//                 ))}
//               </ul>
//             </div>
//             {/* Phrase de remerciement pour avoir voté */}
//             {!voting && <p style={{ color: 'black', marginTop: '20px' }}>Merci d'avoir voté !</p>}
//             {/* Phrase de remerciement pour avoir commenté */}
//             {!commenting && <p style={{ color: 'black', marginTop: '20px' }}>Merci d'avoir commenté !</p>}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MovieDetail;
