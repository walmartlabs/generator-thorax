/* global describe, beforeEach, it */
var fs      = require('fs');
var path    = require('path');
var chai = require('chai');
var expect = chai.expect;
var helpers = require('yeoman-generator').test;

describe('thorax generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), done);
  });

  it('should generate the app in a new directory', function (done) {
    var app = helpers.createGenerator('thorax:app', ['../../app'], 'testApp');
    app.options['skip-install'] = true;

    helpers.mockPrompt(app, {
      'newDirectory': true,
      'starterApp': "None",
      'styleProcessor': "none",
      'includeBootstrap': false,
      'includeCoffeeScript': false,
      'useZepto': false
    });

    app.run([], function () {
      expect(fs.existsSync(path.join(__dirname, 'temp', 'test-app'))).to.equal(true);
      helpers.assertFiles([
        'bower.json',
        'package.json',
        'Gruntfile.js',
        'js',
        'css',
        'js/views',
        'js/templates',
        'public',
        '.jshintrc',
        '.editorconfig',
        '.bowerrc',
        '.gitignore'
      ]);
      done();
    });
  });
});
