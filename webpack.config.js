const path = require("path");
const dist = "C:/projects/puzzle/target";

module.exports = {
  entry: "./src/main/main.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(dist)
  },
  devtool: "#source-map"
};
