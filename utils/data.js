const connection = require('../config/connection');
const { User, Thought } = require('../models');

connection.once('open', async () => {
    await User.deleteMany({});
    await Thought.deleteMany({});

    // Create users
    const users = await User.create([
      {
        username: 'Alice',
        email: 'alice@example.com',
        thoughts: [],
        friends: []
      },
      {
        username: 'Bob',
        email: 'bob@example.com',
        thoughts: [],
        friends: []
      }
    ]);

    // Create thoughts
    const thoughts = await Thought.create([
      {
        thoughtText: 'Hello, world!',
        username: users[0].username,
        reactions: []
      },
      {
        thoughtText: 'I love coding!',
        username: users[1].username,
        reactions: []
      }
    ]);
});


