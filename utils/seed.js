const connection = require('../config/connection');
const { User, Thought } = require('../models');

console.time('seeding');

connection.once('open', async () => {
  try {
    await User.deleteMany({});
    await Thought.deleteMany({});

    const users = await User.insertMany([
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

    const thoughts = await Thought.insertMany([
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

    users[0].thoughts.push(thoughts[0]._id);
    users[1].thoughts.push(thoughts[1]._id);
    await Promise.all([users[0].save(), users[1].save()]);

    console.log('Data seeded successfully');
    console.timeEnd('seeding');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
});
