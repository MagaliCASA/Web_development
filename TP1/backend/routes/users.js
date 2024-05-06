import express from 'express';
import { appDataSource } from '../datasource.js';
import User from '../entities/user.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/login', function (req, res) {
  const { email, password } = req.body;

  appDataSource
    .getRepository(User)
    .findOne({ where: { email: email } }) // Ajoutez les conditions de sélection ici
    .then(function (user) {
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      if (user.password !== password) {
        res.status(401).json({ message: 'Invalid password' });
        return;
      }

      // Authentification réussie
      const token = jwt.sign(email, "abcd");
      console.log(token);
      res.status(200).json({ message: 'Login successful', token, name: user.name });


    })
    .catch(function (error) {
      console.error(error);
      res.status(500).json({ message: 'Error while logging in' });
    });
});


router.get('/', function (req, res) {
  appDataSource
    .getRepository(User)
    .find({})
    .then(function (users) {
      res.json({ users: users });
    });
});

router.post('/new', function (req, res) {
  const userRepository = appDataSource.getRepository(User);
  const newUser = userRepository.create({
    email: req.body.email,
    name: req.body.name, // Ajoute le nom de l'utilisateur
    password: req.body.password,
  });

  userRepository
    .insert(newUser)
    .then(function (newDocument) {
      res.status(201).json(newDocument);
    })
    .catch(function (error) {
      console.error(error);
      if (error.code === '23505') {
        res.status(400).json({
          message: `User with email "${newUser.email}" already exists`,
        });
      } else {
        res.status(500).json({ message: 'Error while creating the user' });
      }
    });
});


router.delete('/:userId', function (req, res) {
  appDataSource
    .getRepository(User)
    .delete({ id: req.params.userId })
    .then(function () {
      res.status(204).json({ message: 'User successfully deleted' });
    })
    .catch(function () {
      res.status(500).json({ message: 'Error while deleting the user' });
    });
});

// The verify endpoint that checks if a given JWT token is valid
router.post('/verify', (req, res) => {
  const tokenHeaderKey = 'jwt-token'
  const authToken = req.headers[tokenHeaderKey]
  try {
    const verified = jwt.verify(authToken, jwtSecretKey)
    if (verified) {
      return res.status(200).json({ status: 'logged in', message: 'success' })
    } else {
      // Access Denied
      return res.status(401).json({ status: 'invalid auth', message: 'error' })
    }
  } catch (error) {
    // Access Denied
    return res.status(401).json({ status: 'invalid auth', message: 'error' })
  }
})

export default router;
