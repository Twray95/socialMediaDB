const { connect, connection } = require("mongoose");

const dbURL = "mongodb://localhost/videosAndResponses";

connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
