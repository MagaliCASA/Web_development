import express from 'express';
import { appDataSource } from '../datasource.js';
import Movie from '../entities/movie.js';

const router = express.Router();

router.get('/', (req,res) => {
  const movieRepository = appDataSource.getRepository(Movie);
  movieRepository
    .find({})
    .then( (resultat) => {
      res.json({
        resultat: resultat
      })
    })
});

router.post('/new', (req, res) => {
    const movieRepository = appDataSource.getRepository(Movie);
    const newMovie = movieRepository.create({
        name: req.body.name,
        date: req.body.date,
      });

    movieRepository
      .insert(newMovie)
      .then( () => {
        res.json({
          message:`Le film ${newMovie.name} a bien été ajouté`
        })
        // console.log('le film a bien été ajouté')
        })
      .catch(function (error) {
        console.error(error);
        if (error.code === '23505') {
          res.status(400).json({
            message: `Le film ${newMovie.name} existe déjà`,
          });
        } else {
          res.status(500).json({ message: 'Erreur dans l\'ajout du film'});
        }
      })
});

router.delete('/delete', (req,res) => {
  const movieRepository = appDataSource.getRepository(Movie);

  movieRepository
    .delete(req.body.name)
    .then(() => {
      res.json({
        message: `Le film ${req.body.name} a bien été supprimé`
      })
    })
})



export default router;