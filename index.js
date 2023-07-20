const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

// Set the PORT and initialize instance of Express.js
const PORT = process.env.PORT || 3001;
const app = express();

// Set up Express to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', routes);

// Start the connection
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server  running on port ${PORT}!`);
  });
});
