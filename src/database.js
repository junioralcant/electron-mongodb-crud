const mongoose = require("mongoose");

const connect = mongoose.connect("mongodb://localhost:27017/electroncrud", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

function getConnection() {
  return connect;
}

module.exports = { getConnection };
