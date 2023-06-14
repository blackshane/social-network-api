const { connect, connection } = require('mongoose');

// TODO: mongodb connection goes here
const connectionString =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialmediaDB!';

connect(connectionString);


module.exports = connection;