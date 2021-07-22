const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../config/mysql');

const router = express.Router();

router.post('/signup', (request, response) => {
  const { nickname, password } = request.body;
  if (!nickname || !password) {
    response.sendStatus(403).send('Insert nickname and password');
  } else {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        response.status(500).send(err);
      } else {
        pool.query(
          'INSERT INTO user (nickname, password) VALUES (?, ?)',
          [nickname, hash],
          (error, results) => {
            if (error) {
              response.status(500).send(error);
            } else {
              response.status(201).send({
                id: results.insertId,
                ...request.body,
                password: 'hidden',
              });
            }
          }
        );
      }
    });
  }
});

module.exports = router;
