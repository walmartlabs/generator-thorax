/**
 * This file contains the defualt routes that come first in the
 * middleware stack of your development express server
 *
 * Do not change this file unless you know what it does.
 *
 * @see  api/server.js for more information
 */

var path = require('path');
var express = require('express');

module.exports = function (server) {
  var serverBase = server.get('serverBase');

  // keep server from being browsable @ /public
  server.get('/public', function (req, res) {
    res.redirect('/');
  });
  server.get('/public/index.html', function (req, res) {
    res.redirect('/');
  });

  // serve everything
  server.use('/', express.static(serverBase));

  // serve /public @ /
  server.use('/', express.static(path.join(serverBase, 'public')));
};