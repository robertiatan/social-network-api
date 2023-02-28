const { User, Thought, user } = require("../models");

module.exports = {
  // Get thoughts
  getThought(req, res) {
    Thought.find({})
      .then((thought) => res.json(thought))
      .catch((error) => res.status(500).json(err));
  },

  // Get one thought
  getOneThought(req, res) {
    Thought.findOne({ _id: req.params.thought.id })
      .select("-__v")
      .then((thought) => res.json(thought))
      .catch((error) => res.status(500).json(err));
  },

  // Create a new thought
  createThought(req, res) {
    Thought.create(req.body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "No user found with id '" + _id + "'." })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Update an existing thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, New: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: "No thought with id '" + _id + "'." })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Delete an existing thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "No thought with id '" + _id + "'." })
          : User.findOneAndUpdate(
              { thoughts: req.params.thoughtId },
              { $pull: { thoughts: req.params.thoughtId } },
              { new: true }
            )
      )
      .catch((err) => res.status(500).json(err));
  },

  // Create reaction
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "Reaction not found." })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Delete reaction
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "Thought not found." })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};
