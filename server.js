'use strict';

/* eslint-disable no-console */
var express = require('express');
var path = require('path');
var PORT = process.env.PORT || 5001;
var serverUtils = require('substance/util/server');
var app = express();

var browserifyConfig = {
  debug: true
};

serverUtils.serveJS(app, '/publisher/app.js', {
  sourcePath: path.join(__dirname, 'examples/publisher', 'app.js'),
  browserify: browserifyConfig,
});
serverUtils.serveHTML(app, '/publisher', path.join(__dirname, 'examples/publisher', 'index.html'), {});

serverUtils.serveJS(app, '/author/app.js', {
  sourcePath: path.join(__dirname, 'examples/author', 'app.js'),
  browserify: browserifyConfig,
});
serverUtils.serveHTML(app, '/author', path.join(__dirname, 'examples/author', 'index.html'), {});

// static served data
app.use('/data', express.static(path.join(__dirname, 'examples/data')));
app.use(express.static(path.join(__dirname, 'examples')));
app.use('/fonts', express.static(path.join(__dirname, 'node_modules/font-awesome/fonts')));

app.use(express.static(__dirname));
app.use('/substance', express.static(path.join(__dirname, 'node_modules/substance')));
app.use('/font-awesome', express.static(path.join(__dirname, 'node_modules/font-awesome')));

serverUtils.serveTestSuite(app, "test/**/*.test.js");

app.listen(PORT);
console.log('Server is listening on %s', PORT);
console.log('To view the docs go to http://localhost:%s', PORT);
