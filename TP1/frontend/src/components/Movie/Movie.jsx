// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import './Movie.css';

// function Movie(props) { /*ou props puis props.movie dans le <li>*/

// // const [data, setdata] = useState([]);

// //   axios
// //     .get(`https://image.tmdb.org/t/p/original${props.movie.poster_path}`)
// //     .then((response) => {
// //       setdata(response);
// //     })
// //     .catch((error) => {
// //       // Do something if call failed
// //       console.log(error)
// //     });

// //     console.log(data)

//   return (
//     <div>
//     <li>{props.movie.original_title} : {props.movie.release_date} : {props.movie.image}</li>
//     </div>
//   );
// }

// export default Movie;

import React from 'react';
import { Link } from 'react-router-dom';
import './Movie.css';

function Movie(props) {
  // Slugify function to convert title to URL-friendly string
  const slugify = (text) => {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w-]+/g, '')        // Remove all non-word chars
      .replace(/--+/g, '-');          // Replace multiple - with single -
  };

  return (
    <div>
      <p>
        <h3>{props.movie.original_title}</h3>
        <p>Date de sortie : {props.movie.release_date}<br/>
          Note : {props.movie.review}/10
        </p>
        {/* Utilisez Link pour créer un lien vers les détails du film avec les données du film en tant que paramètres d'URL */}
        <Link to={{ pathname: `movie_detail/${props.movie.id}/${slugify(props.movie.original_title)}`, state: { movie: props.movie } }}>
          {props.movie.image && <img src={props.movie.image} alt={props.movie.original_title} className='movie-item' />}
        </Link>
      </p>
    </div >
  );
}

export default Movie;
