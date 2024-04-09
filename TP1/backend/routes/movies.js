import express from 'express';
import { appDataSource } from '../datasource.js';

const router = express.Router();

router.get('/', function (req, res) {
    res.json({movies : []})
});

router.post('/new', function (req, res) {
    const movieRepository = appDataSource.getRepository(Movie);
    res.json(req.body)
    movieRepository
    .insert(newMovie)
    .then(function (newDocument) {
        res.status(201).json(newDocument);
      })
      .catch(function (error) {
        console.error(error);
        if (error.code === '23505') {
          res.status(400).json({
            message: `Movie "${newMovie.title}" already exists`,
          });
        } else {
            res.status(500).json({ message: 'Error while creating the user' });
        }
    });
});

export default router;