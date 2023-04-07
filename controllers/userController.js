const User = require("../models/index");

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
    User.findOne({ _id: req.params.studentId })
      .select("-__v")
      .populate("thoughts")
      .populate("friends")
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
};
