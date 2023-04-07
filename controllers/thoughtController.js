const { findOneAndUpdate } = require("../models/User");
const { Thought, User } = require("../models/index");

module.exports = {
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => {
        return res.status(200).json(thoughts);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  getOneThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .populate("reactions")
      .then((oneThought) =>
        !oneThought
          ? res.status(404).json({ message: "No thought with this ID" })
          : res.status(200).json(oneThought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { username: req.body.username },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({
              message: "Thought created, but no user was found with that ID",
            })
          : res.status(200).json({ message: "Thought created!" })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { thoughtText: req.body.thoughtText },
      {
        new: true,
      }
    )
      .then((updatedThought) => {
        !updatedThought
          ? res.status(404).json({ message: "No thought with this ID found!" })
          : res.status(200).json(updatedThought);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((response) => {
        !response
          ? res.status(404).json({ message: "No thought with that ID found" })
          : User.findOneAndUpdate(
              { username: req.body.username },
              { $pull: { thoughts: { _id: req.params.thoughtId } } }
            );
      })
      .then(() =>
        res
          .status(200)
          .json({ message: "Thought deleted and removed from User" })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  getReactions(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .populate("reactions")
      .then((oneThought) => {
        !oneThought
          ? res.status(404).json({ message: "No thought with that ID found" })
          : res.status(200).json(oneThought.reactions);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } }
    )
      .then((thought) => {
        !thought
          ? res.status(404).json({ message: "No thought with that ID found" })
          : res.status(200).json(thought);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: req.params.reactionId } }
    )
      .then((thought) => {
        !thought
          ? res.status(404).json({ message: "No thought with that ID found" })
          : res.status(200).json(thought);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};
