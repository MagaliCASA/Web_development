import express from 'express';
import { appDataSource } from '../datasource.js';
import Movie from '../entities/movie.js'

const router = express.Router();

router.get('/', function (req, res) {
    const movieRepository = appDataSource.getRepository(Movie);
    movieRepository
      .find({})
      .then((resultat)=> {
        res.json({
          resultat
      })
    })
});

router.post('/new', function (req, res) {
    const movieRepository = appDataSource.getRepository(Movie);
    const newMovie = movieRepository.create({
      title: req.body.title,
      date: req.body.date
    });
    
    movieRepository
    .insert(newMovie)
    .then(() => {
        res.json({
          message: `Movie "${newMovie.title}" added`
      })
    })
    .catch(function (error) {
      console.error(error);
      if (error.code === '23505') {
        res.status(400).json({
          message: `Movie "${newMovie.title}" already exists`,
        });
      } else {
        res.status(500).json({ message: 'Error while adding the movie' });
      }
    });
});

router.delete('/delete', function (req, res) {
  const movieRepository = appDataSource.getRepository(Movie);
  
  movieRepository
  .delete({
      title: req.body.title,
      date: req.body.date,
  })
  .then(() => {
      res.json({
        message: `Movie "${req.body.title}" deleted`
    })
  })
  .catch(function (error) {
    console.error(error);
    if (error.code === '23505') {
      res.status(400).json({
        message: `Movie "${deleteMovie.title}" does not exist`,
      });
    } else {
      res.status(500).json({ message: 'Error while deleting the movie' });
    }
  });
});

export default router;