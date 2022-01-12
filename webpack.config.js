const path = require("path");

module.exports = {
  entry: path.join(__dirname, "client", "game", "index.js"),
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "client", "dist"),
  },
};
