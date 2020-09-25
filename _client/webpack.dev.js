const webpack = require("webpack");
const path = require("path");
const appDir = path.join(__dirname, "src");
const buildDir = path.join(__dirname, "/dist/content/js");
const PORT = 9006;
const config = {
  entry: ["webpack-hot-middleware/client", appDir + "/index-dev.js"],
  output: {
    filename: "bundle.js",
    path: buildDir,
  },
  devtool: "inline-source-map",
  mode: "development",
  module: {
    rules: [
      { test: /\.(js|jsx)/, exclude: /node_modules/, use: "babel-loader" },
      { test: /\.css/, use: ["style-loader", "css-loader"] },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    hot: true,
    open: true,
    port: PORT,
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
};

module.exports = config;
