const router = require('express').Router();
const {
  getThoughts,
  getThoughtById,
  createNewThought,
  updateThoughtById,
  deleteThoughtById,
  createReaction,
  deleteReaction
} = require('../../controllers/thoughtController');

router.route('/thoughts')
.get(getThoughts)
.post(createNewThought)

router.route('/thoughts/:thoughtId')
.get(getThoughtById)
.put(updateThoughtById)
.delete(deleteThoughtById)


router.route('/thoughts/:thoughtId/reactions')
.post(createReaction)
.delete(deleteReaction)

module.exports = router;