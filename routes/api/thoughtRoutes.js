const router = require("express").Router();
const {
  getThoughts,
  getOneThought,
  createThought,
  updateThought,
  deleteThought,
  getReactions,
  addReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");

router.route("/").get(getThoughts).post(createThought);

router
  .route("/:thoughtId")
  .get(getOneThought)
  .put(updateThought)
  .delete(deleteThought);

router.route("/:thoughtId/reactions").get(getReactions);

router
  .route("/thoughtId/reactions/:reactionId")
  .post(addReaction)
  .delete(deleteReaction);

module.exports = router;
