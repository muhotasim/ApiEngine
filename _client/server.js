var express = require("express");
var path = require("path");
var webpack = require("webpack");
var opn = require("opn");
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpackHotMiddleware = require("webpack-hot-middleware");
var webpackConfig = require("./webpack.dev");
const compiler = webpack(webpackConfig);
const app = express();
const port = 9006;
app.use(webpackDevMiddleware(compiler));
app.use(
  webpackHotMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.path,
  })
);
app.use(express.static(path.join(__dirname, "dist")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "dist") + "/index.html");
});

app.listen(port, "0.0.0.0", function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info(
    "==> 🌎 Listening on port %s. Open up http://localhost:%s/ in your browser.",
    port,
    port
  );
  opn(`http://localhost:${port}/`);
});
