import express from 'express';
import { appDataSource } from '../datasource.js';
import Comment from '../entities/comment.js';

const router = express.Router();

router.get('/', function (req, res) {
    appDataSource
      .getRepository(Comment)
      .find({})
      .then(function (comments) {
        res.json({ comments: comments });
      });
  });

  router.get('/:movieId/comments', async (req, res) => {
    try {
      const { movieId } = req.params;
      
      appDataSource
      .getRepository(Comment)
      .find({ where : { movieId }})
      .then(function (comments) {
        res.json({ comments: comments });
      });
    } catch (error) {
        console.error('Erreur lors de la récupération des commentaires:', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des commentaires' });
      }
  });

router.post('/new', (req, res) => {
    const commentRepository = appDataSource.getRepository(Comment);
    const newComment = commentRepository.create({
        movieId: req.body.movieId,
        comment: req.body.comment
      });

    commentRepository
      .insert(newComment)
      .then( () => {
        res.json({
          message:`Le commentaire a bien été ajouté`
        })
        })
      .catch(function (error) {
        console.error(error);
        if (error.code === '23505') {
          res.status(400).json({
            message: `code d'erreur 23505 ?`,
          });
        } else {
          res.status(500).json({ message: 'Erreur dans l\'ajout du commentaire'});
        }
      })
});

router.delete('/delete', (req,res) => {
    const commentRepository = appDataSource.getRepository(Comment);
  
    commentRepository
      .delete(req.body.comment)
      .then(() => {
        res.json({
          message: `Le commentaire ${req.body.comment} a bien été supprimé`
        })
      })
  });

export default router;