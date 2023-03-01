const router = require("express").Router();

const {
  getThought,
  getOneThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");

// GET and POST routes for thought
router.route("/").get(getThought).post(createThought);

// Single thought routes
router
  .route("/:thoughtId")
  .get(getOneThought)
  .put(updateThought)
  .delete(deleteThought);

//  POST routes for new reactions
router.route("/:thoughtId/reactions").post(createReaction);

// DELETE routes for reaction by ID
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
