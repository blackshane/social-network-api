const express = require('express');
const router = express.Router();
const Thought = require('../models/Thought');


// GET route for retrieving all thoughts
router.get('/thoughts', async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving thoughts' });
  }
});

// GET route for retrieving a specific thought by ID
router.get('/thoughts/:thoughtId', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ error: 'Thought not found' });
    }
    res.json(thought);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the thought' });
  }
});

// POST route for creating a new thought
router.post('/thoughts', async (req, res) => {
  try {
    const thought = await Thought.create(req.body);
    res.status(201).json(thought);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create the thought' });
  }
});

// PUT route for updating a thought
router.put('/thoughts/:thoughtId', async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true });
    if (!thought) {
      return res.status(404).json({ error: 'Thought not found' });
    }
    res.json(thought);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update the thought' });
  }
});

// DELETE route for deleting a thought
router.delete('/thoughts/:thoughtId', async (req, res) => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ error: 'Thought not found' });
    }
    res.json({ message: 'Thought deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete the thought' });
  }
});

// POST route for creating a reaction for a thought
router.post('/thoughts/:thoughtId/reactions', async (req, res) => {
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
});

// DELETE route for deleting a reaction from a thought
router.delete('/thoughts/:thoughtId/reactions/:reactionId', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ error: 'Thought not found' });
    }
    thought.reactions.id(req.params.reactionId).remove();
    await thought.save();
    res.json(thought);
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete the reaction' });
  }
});

module.exports = router;
