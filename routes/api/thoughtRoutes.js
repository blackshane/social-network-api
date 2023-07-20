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

router.route("/").get(getThoughts).post(createNewThought);
router.route("/:thoughtId").get(getThoughtById).put(updateThoughtById).delete(deleteThoughtById);
router.route("/:thoughtId/reactions").post(createReaction);
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);
module.exports = router;