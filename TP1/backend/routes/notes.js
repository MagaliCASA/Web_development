import express from 'express';
import { appDataSource } from '../datasource.js';
import Note from '../entities/note.js';

const router = express.Router();

router.post('/new', (req, res) => {
    const noteRepository = appDataSource.getRepository(Note);
    const newNote = noteRepository.create({
        note: req.body.rating
      });

    noteRepository
      .insert(newNote)
      .then( () => {
        res.json({
          message:`La note a bien été ajouté`
        })
        })
      .catch(function (error) {
        console.error(error);
        if (error.code === '23505') {
          res.status(400).json({
            message: `code d'erreur 23505 ?`,
          });
        } else {
          res.status(500).json({ message: 'Erreur dans l\'ajout du film'});
        }
      })
});

router.delete('/delete', (req,res) => {
    const noteRepository = appDataSource.getRepository(Note);
  
    noteRepository
      .delete(req.body.rating)
      .then(() => {
        res.json({
          message: `La note ${req.body.rating} a bien été supprimée`
        })
      })
  });

export default router;