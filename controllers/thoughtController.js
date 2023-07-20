const { Thought, User, } = require("../models");

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      
      res.status(200).json(thoughts);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Get single thought by ID
  async getThoughtById(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: "No thought found" });
      }
      
      res.status(200).json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Creates new thought
  async createNewThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      // adds thought to users thought array
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thought._id }},
        { runValidators: true, new: true},
      );
      
      if (!user) {
        return res.status(404).json({ message: "No user found" });
      }

      res.status(200).json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Update thought
  async updateThoughtById(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId},
        { $set: req.body },
        { runValidators: true, new: true }
      );
      
      if (!thought) {
        return res.status(404).json({ message: "No thought found" });
      }

      res.status(200).json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Delete thought by ID
  async deleteThoughtById(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: "No thought found" });
      }

      // removes thought from the users thought array
      const user = await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId }},
        { new: true }
      )

      res.status(200).json({ message: "Thought deleted" });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Create reaction
  async createReaction(req, res) {
    try {
 
      const reaction = {
        reactionBody: req.body.reactionBody,
        username: req.body.username,
      }

      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: reaction }},
        { new: true },
      )
      
      if (!thought) {
        return res.status(404).json({ message: "No thought found" });
      }

      res.status(200).json(reaction);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Delete reaction
  async deleteReaction(req, res) {
    try {
     
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { _id: req.params.reactionId }}},
        { new: true }
      );
      
      if (!thought) {
        return res.status(404).json({ message: "No thought found" });
      }

      res.status(200).json({ message: "Reaction deleted" });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
}