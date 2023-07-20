const Thought = require('../models/Thought');

module.exports = {
// Retrieve all thoughts
async getThoughts(req, res)  {
  try {
    const thoughts = await Thought.find();
    res.status(200).json(thoughts);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving thoughts' });
  }
},

// Retrieve a specific thought by ID
async getThoughtById(req, res) {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ error: 'Thought not found' });
    }
    res.json(thought);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the thought' });
  }
},

// Create a new thought
async createNewThought(req, res) {
  try {
    const thought = await Thought.create(req.body);
    await User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: thought._id } });
    res.status(201).json(thought);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create the thought' });
  }
},

// Update a thought
async updateThoughtById(req, res) {
  try {
    const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true });
    if (!thought) {
      return res.status(404).json({ error: 'Thought not found' });
    }
    res.json(thought);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update the thought' });
  }
},

// Delete a thought
async  deleteThoughtById(req, res) {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ error: 'Thought not found' });
    }
    res.json({ message: 'Thought deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete the thought' });
  }
},

// Create a reaction for a thought
async createReaction(req, res) {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ error: 'Thought not found' });
    }
    thought.reactions.push(req.body);
    await thought.save();
    res.status(201).json(thought);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create the reaction' });
  }
},

// Delete a reaction from a thought
async deleteReaction(req, res) {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ error: 'Thought not found' });
    }
    thought.reactions.pull(req.params.reactionId);
    await thought.save();
    res.json(thought);
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete the reaction' });
  }
},
};