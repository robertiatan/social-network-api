const { connect, connection } = require("mongoose");
const connectionString = process.env.MONGODB_URI || "";

connect(connectionString, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

module.exports = connection;
