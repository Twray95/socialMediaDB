const { User, Thought } = require("../models/index");

module.exports = {
  getUsers(req, res) {
    User.find()
      .then((users) => {
        return res.status(200).json(users);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  getOneUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate("thoughts")
      //   .populate("friends")
      .then((oneUser) => {
        !oneUser
          ? res.status(404).json({ message: "No user with that ID found" })
          : res.status(200).json(oneUser);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  createUser(req, res) {
    User.create(req.body)
      .then((userData) => res.status(200).json(userData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      {
        username: req.body.username,
        email: req.body.email,
      }
    )
      .then((updatedUser) => {
        !updatedUser
          ? res.status(404).json({ message: "No user with that ID found!" })
          : res
              .status(200)
              .json({ message: `Updated ${req.body.username} profile!` });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((deletedUser) =>
        !deletedUser
          ? res.status(404).json({ message: "No User with that ID" })
          : Thought.deleteMany({ _id: { $in: deletedUser.thoughts } })
      )
      .then(() => res.json({ message: "User and Thoughts deleted!" }))
      .catch((err) => res.status(500).json(err));
  },
  getFriends(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate("friends")
      .then((user) => {
        !user
          ? res.status(404).json({ message: "No user with that ID found!" })
          : res.status(200).json(user.friends);
      });
  },
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } }
    )
      .then((user) => {
        !user
          ? res.status(404).json({ message: "No user with that ID found!" })
          : res.status(200).json(user);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } }
    )
      .then((user) => {
        !user
          ? res.status(404).json({ message: "No user with that ID found!" })
          : res.status(200).json(user);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};
