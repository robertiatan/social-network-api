// Dependencies
const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");

// Set up Express app
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// Start server after DB connection
db.once("open", () => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});
