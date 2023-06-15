
const { User } = require('../models');

module.exports = {
// Retrieve all users
 async getUsers(req, res) {
  try {
    // Use populate() to include referenced 'thoughts' and 'friends' 
    const users = await User.find()
      .populate('thoughts')
      .populate('friends');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving users' });
  }
},

// Retrieve a specific user by ID
 async getUserById (req, res) {
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
},

// Create a new user
async createUser(req, res) {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user)
    console.log('Success!');
  } catch (error) {
    res.status(400).json({ error: 'Failed to create the user' });
  }
},

// Update a user
 async updateUser(req, res) {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update the user' });
  }
},

// Delete a user by id
async deleteUser(req, res) {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete the user' });
  }
},

// Add a new friend to a user's friend list
async addFriend(req, res) {
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
  },
  
  // DELETE route to remove a friend from a user's friend list
 async deleteFriend(req, res) {
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
  },
  
};
