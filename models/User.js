const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
require("mongoose-type-email");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: {
      type: mongoose.SchemaTypes.Email,
      required: true,
      unique: true,
      lowercase: true,
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.plugin(uniqueValidator);

userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = mongoose.model("user", userSchema);

module.exports = User;
