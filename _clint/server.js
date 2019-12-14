var path = require('path');
var express = require('express');
var open = require('open');
var app = express();
var PORT = process.env.PORT || 9006;

if (process.env.NODE_ENV !== 'production') {
    var webpackDevMiddleware = require('webpack-dev-middleware');
    var webpackHotMiddleware = require('webpack-hot-middleware');
    var webpack = require('webpack');
    var config = require('./webpack.dev.config');
    var compiler = webpack(config);

    app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
    app.use(webpackHotMiddleware(compiler));
}

app.use('/', (req, res, next) => {
    var path = req.path;
    res.sendFile(path === '/' ? 'index.html' : path, { root: 'dist' }, function (err) {
        if (err) {
            next();
        } else {

        }
    })
})

app.listen(PORT, function(error) {
    if (error) {
        console.error(error);
    } else {
        console.info("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
        // NOTE
        // Comment out if not needed!
        open('http://localhost:' + PORT);
    }
});