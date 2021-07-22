const express = require('express');
const pool = require('../config/mysql');

const router = express.Router();

router.post('/signup', (request, response) => {
  const { nickname, password } = request.body;
  if (!nickname || !password) {
    response.sendStatus(403).send('Insert nickname and password');
  } else {
    pool.query(
      'INSERT INTO user (nickname, password) VALUES (?, ?)',
      [nickname, password],
      (error, results) => {
        if (error) {
          response.status(500).send(error);
        } else {
          response.status(201).send({
            id: results.insertId,
            ...request.body,
          });
        }
      }
    );
  }
});

module.exports = router;
