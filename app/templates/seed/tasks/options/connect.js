var grunt = require('grunt');

var openUrl = 'http://' + grunt.config('settings.hostname') + ':' + grunt.config('settings.port');

module.exports = {
  development: {
    options: {
      hostname: grunt.config('settings.hostname'),
      port: grunt.config('settings.port'),
      middleware: devMiddlewares,
      open: openUrl
    }
  },
  production:  {
    options: {
      hostname: grunt.config('settings.hostname'),
      base: grunt.config('paths.dist'),
      port: grunt.config('settings.port'),
      keepalive: true,
      open: openUrl
    }
  },
  CIServer: {
    options: {
      base: '.',
      port: grunt.config('settings.mochaPhantomPort'),
    }
  }
};

// TODO: move to seperate file, likely when creating mock api feature
// use express as connect middleware
var express = require('express');
var app = express();
var path = require('path');

var appBase = path.resolve(__dirname, '../..');

// keep app from being browsable @ /public
app.get('/public', function (req, res) {
  res.redirect('/');
});
app.get('/public/index.html', function (req, res) {
  res.redirect('/');
});

// serve everything
app.use('/', express.static(appBase));

// serve /public @ /
app.use('/', express.static(path.join(appBase, 'public')));

function devMiddlewares(connect, options) {
  return [
    require('connect-livereload')({port: grunt.config('settings.liveReloadPort')}),
    connect().use(app),
  ];
}