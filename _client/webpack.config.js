const webpack = require("webpack");
const path = require("path");
const appDir = path.join(__dirname, "src");
const buildDir = path.join(__dirname, "/dist/content/js");
const config = {
  entry: appDir + "/index.js",
  output: {
    filename: "bundle.js",
    path: buildDir,
  },
  mode: "production",
  module: {
    rules: [
      { test: /\.(js|jsx)/, exclude: /node_modules/, use: "babel-loader" },
      { test: /\.css/, use: ["style-loader", "css-loader"] },
    ],
  },
  plugins: [],
};

module.exports = config;
