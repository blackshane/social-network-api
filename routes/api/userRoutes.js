const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET route for retrieving all users
router.get('/users', async (req, res) => {
  try {
    // Use populate() to include referenced 'thoughts' and 'friends' 
    const users = await User.find()
      .populate('thoughts')
      .populate('friends');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving users' });
  }
});

// GET route for retrieving a specific user by ID
router.get('/users/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .populate('thoughts')
      .populate('friends');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the user' });
  }
});

// POST route for creating a new user
router.post('/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create the user' });
  }
});

// PUT route for updating a user
router.put('/users/:userId', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update the user' });
  }
});

// DELETE route for deleting a user
router.delete('/users/:userId', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete the user' });
  }
});

// POST route to add a new friend to a user's friend list
router.post('/users/:userId/friends/:friendId', async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      const friend = await User.findById(req.params.friendId);
      if (!friend) {
        return res.status(404).json({ error: 'Friend not found' });
      }
      if (user.friends.includes(friend._id)) {
        return res.status(400).json({ error: 'Friend already exists in user\'s friend list' });
      }
      user.friends.push(friend._id);
      await user.save();
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while adding the friend' });
    }
  });
  
  // DELETE route to remove a friend from a user's friend list
  router.delete('/users/:userId/friends/:friendId', async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      const friend = await User.findById(req.params.friendId);
      if (!friend) {
        return res.status(404).json({ error: 'Friend not found' });
      }
      if (!user.friends.includes(friend._id)) {
        return res.status(400).json({ error: 'Friend does not exist in user\'s friend list' });
      }
      user.friends = user.friends.filter(id => id.toString() !== friend._id.toString());
      await user.save();
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while removing the friend' });
    }
  });
  

module.exports = router;
