const { User, Thought } = require("../models");

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();

      return res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Get one user by their ID
  async getUserById(req, res) {
    try {
    
      const user = await User.findOne({ _id: req.params.userId });

      // Find associated thoughts using user variable
      const thoughts = await Thought.find({ username: user.username });

      const friends = [];
      // Finds friends  
      for (let i = 0; i < user.friends.length; i++) {
        const friend = await User.findOne({ _id: user.friends[i] });
        friends.push(friend);
      }

      if (!user) {
        return res.status(404).json({ message: "No users found" });
      }

      res.status(200).json({
        user: user,
        thoughts: thoughts,
        friends: friends,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Create User
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Update User by ID
  async updateUserById(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "No users found" });
      }

      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Delete user by ID
  async deleteUserById(req, res) {
    try {
      const user = await User.findOneAndRemove({ _id: req.params.userId });
     
      await Thought.deleteMany({ username: user.username });
      await Thought.updateMany(
        { "reactions.username": user.username },
        {
          $set: {
            "reactions.$.username": "[deleted]"
          }
        },
        { new: true },
      );
      
      await User.updateMany(
        { friends: req.params.userId },
        { $pull: { friends: req.params.userId }},
        { new: true },
      );

      if (!user) {
        return res.status(404).json({ message: "No users found" });
      }

      res.status(200).json({ message: `User ${user.username} deleted`});
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Add friend
  async addFriend(req, res) {
    try {
      
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: {friends: req.params.friendId} },
        { runValidators: true, new: true }
      );
      const friend = await User.findOne({ _id: req.params.friendId });

      if (!user) {
        return res.status(404).json({ message: "UserId not found" });
      }
      if (!friend) {
        return res.status(404).json({ message: "FriendId not found" });
      }

      res.status(200).json({ message: `Friend added`});
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Delete friend
  async deleteFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: {friends: req.params.friendId} },
        { runValidators: true, new: true }
      );
      const friend = await User.findOne({ _id: req.params.friendId });

      if (!user) {
        return res.status(404).json({ message: "UserId not found" });
      }
      if (!friend) {
        return res.status(404).json({ message: "FriendId not found" });
      }

      res.status(200).json({ message: `Friend deleted`});
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
}