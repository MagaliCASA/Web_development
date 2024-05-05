import express from 'express';
import { appDataSource } from '../datasource.js';
import Note from '../entities/note.js';

const router = express.Router();

router.get('/', function (req, res) {
    appDataSource
      .getRepository(Note)
      .find({})
      .then(function (notes) {
        res.json({ notes: notes });
      });
  });

  router.get('/:movieId/notes', async (req, res) => {
    try {
      const { movieId } = req.params;
      
      // Récupérer toutes les notes pour le movieId spécifié depuis la base de données
      const noteRepository = getRepository(Note);
      const notes = await noteRepository.find({ where: { movieId } });
  
      // Calculer la nouvelle moyenne et le nouveau nombre total de votes
      let totalVotes = 0;
      let totalNotes = 0;
      notes.forEach(note => {
        totalVotes += note.note;
        totalNotes++;
      });
      const newAverage = totalVotes / totalNotes;
  
      // Envoyer les notes récupérées, la nouvelle moyenne et le nouveau nombre total de votes en réponse
      res.json({ notes, newAverage, totalNotes });
    } catch (error) {
      console.error('Erreur lors de la récupération des notes:', error);
      res.status(500).json({ message: 'Erreur lors de la récupération des notes' });
    }
  });

router.post('/new', (req, res) => {
    const noteRepository = appDataSource.getRepository(Note);
    const newNote = noteRepository.create({
        movieId: req.body.movieId,
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