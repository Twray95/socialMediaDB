const Thought = require("../models/index");

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
  createThough(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
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
    Thought.deleteOne({ _id: req.params.thoughtId })
      .then((res) => {
        !res
          ? res.status(404).json({ message: "No thought with that ID found" })
          : res.status(200).json({
              message: `Thought with _id: ${req.params.thoughtId} has been deleted`,
            });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};
