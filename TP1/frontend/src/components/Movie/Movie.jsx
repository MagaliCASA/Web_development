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
import './Movie.css';

function Movie(props) {
  return (
    <div>
      <p>
        <h3>{props.movie.original_title}</h3>
        <p>Date de sortie : {props.movie.release_date}</p>
        <a href="../../movie_detail"> 
        {props.movie.image && <img src={props.movie.image} alt={props.movie.original_title} className='movie-item' />}
        </a>
      </p>
    </div>
  );
}

export default Movie;
