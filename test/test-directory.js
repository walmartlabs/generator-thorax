/* global describe, beforeEach, it */
var fs      = require('fs');
var path    = require('path');
var assert  = require('assert');
var helpers = require('yeoman-generator').test;

describe('thorax generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), done);
  });

  it('will generate the app in a new directory', function (done) {
    var app = helpers.createGenerator('thorax:app', ['../../app'], 'testApp');
    app.options['skip-install'] = true;

    helpers.mockPrompt(app, {
      'newDirectory': true,
      'starterApp': "none",
      'includeBootstrap': false
    });

    app.run([], function () {
      assert(fs.existsSync(path.join(__dirname, 'temp', 'test-app')));
      helpers.assertFiles([
        '.jshintrc',
        '.editorconfig',
        'Gruntfile.js',
        'README.md',
        'js/views',
        'js/models',
        'js/routers',
        'js/collections',
        'public/index.html'
      ]);
      done();
    });
  });
});
