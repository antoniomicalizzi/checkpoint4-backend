const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authentificationRoute = require('./src/routes/authentification');

const app = express();

app.use(express.json());

app.use(cors());

app.use('/auth', authentificationRoute);

const PORT = process.env.PORT || 8000;

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Express server listening on ${PORT}`);
  }
});
