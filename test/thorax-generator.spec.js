/* global describe, beforeEach, it, before */
var path    = require('path');
var chai = require('chai');
var expect = chai.expect;
var helpers = require('yeoman-generator').test;
var fs = require('fs');
var sharedExamples = require('./shared-examples');

var assert = chai.assert;

helpers.assertNoFile = function (file, reg) {
  var here = fs.existsSync(file);
  assert.ok(!here, file + ' DOES exist, something is wrong');

  if (!reg) {
    return assert.ok(!here);
  }

  var body = fs.readFileSync(file, 'utf8');
  assert.ok(!reg.test(body), file + ' DID MATCH, HOLD THE PHONE: match \'' + reg + '\'.');
};

helpers.assertFileHasNoContent = function(file, reg) {
  var here = fs.existsSync(file);
  assert.ok(here, file + ' does exist, we expected that');

  if (!reg) {
    return assert.fail('You must provide content via regex for this helper');
  }

  var body = fs.readFileSync(file, 'utf8');
  assert.ok(!reg.test(body), file + ' DID MATCH, STAHP!, control flow the following content or fix the test: match \'' + reg + '\'.');
};

function requireOption(option, message) {
  if (typeof option === 'undefined') { throw new Error(message); }
  return option;
};


/**
 * Note: if you  get an `index of undefined error` it's likely because
 * the features prompt is missing. It should be set to an array in cases
 * where it's not used, aka, 'features': this.features || []
 */


describe('Thorax Generator (yo thorax:app NAME)', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) { return done(err); }

      this.app = helpers.createGenerator('thorax:app', ['../../app'], 'test');
      this.app.options['skip-install'] = true;

      helpers.mockPrompt(this.app, {
        'newDirectory': false,
        'starterApp': "None",
        'styleProcessor': "none",
        'features': this.features || []
      });

      this.app.run({}, done);
    }.bind(this));
  });

  it('every generator can be required without throwing', function () {
    require('../app');
    require('../collection');
    require('../collection-view');
    require('../model');
    require('../router');
    require('../view');
  });

  it('creates expected files', function () {
    var expected = [
      ['bower.json', /"name": "test"/g],
      ['package.json', /"name": "test"/g],
      '.bowerrc',
      '.gitignore',
      '.jshintrc',
      '.editorconfig',
      'Gruntfile.js',
      'README.md',
      'public/index.html',
      'css/base.css',
      'tasks/ensure-installed.js',
      'tasks/open-browser.js',
      'tasks/styles.js',
      'tasks/options/clean.js',
      'tasks/options/connect.js',
      'tasks/options/copy.js',
      'tasks/options/cssmin.js',
      'tasks/options/requirejs.js',
      'tasks/options/thorax.js',
      'tasks/options/watch.js',
      ['require-config.js', /deps: \['main'\]/],
      'js',
      'css',
      'js/views',
      'js/templates',
      'public',
    ];

    helpers.assertFiles(expected);
  });

});


describe('jQuery or Zepto option', function () {

  beforeEach(function (done){
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) { return done(err); }

      this.app = helpers.createGenerator('thorax:app', ['../../app'], 'test');
      this.app.options['skip-install'] = true;

      helpers.mockPrompt(this.app, {
        'newDirectory': false,
        'starterApp': "None",
        'styleProcessor': "none",
        'features': this.features || []
      });

      this.app.run({}, done);
    }.bind(this));
  });

  describe('jQuery', function () {
    it('is included by default', function () {
      helpers.assertFiles([
        ['bower.json', /jquery/],
        ['js/main.js', /jquery/],
        ['tasks/options/requirejs.js', /bower_components\/jquery\/jquery/],
        ['tasks/options/requirejs.js', /deps: \['jquery', 'underscore'\]/],
        ['require-config.js', /bower_components\/jquery\/jquery/],
        ['require-config.js', /deps: \['jquery', 'underscore'\]/]
      ]);
    });
  });

  describe('Zepto', function () {
    before(function() { this.features = ['useZepto']; });


    it('is included when selected in the prompt', function () {
      helpers.assertFiles([
        ['bower.json', /zepto/],
        ['js/main.js', /zepto/],
        ['tasks/options/requirejs.js', /bower_components\/zepto\/zepto/],
        ['tasks/options/requirejs.js', /deps: \['zepto', 'underscore'\]/],
        ['tasks/options/requirejs.js', /exports: '\$'/],
        ['require-config.js', /'bower_components\/zepto\/zepto'/],
        ['require-config.js', /deps: \['zepto', 'underscore'\]/],
        ['require-config.js', /exports: '\$'/],
      ]);
    });
  });

});

describe('JSHint support', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) { return done(err); }

      this.app = helpers.createGenerator('thorax:app', ['../../app'], 'test');
      this.app.options['skip-install'] = true;

      helpers.mockPrompt(this.app, {
        'newDirectory': true,
        'starterApp': "None",
        'styleProcessor': "none",
        'features': this.features || []
      });

      this.app.run({}, done);
    }.bind(this));
  });
  it('supports js hint for every grunt tasks', function () {
    // hard to test this, but the sentence above should always be true
    // it should also run when watch sees any js file in the projcect change
    helpers.assertFiles([
      'tasks/options/jshint.js',
      '.jshintrc',
      ['package.json', /"grunt-contrib-jshint"/],
    ]);
  });
});

describe('Requirejs abstraction', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) { return done(err); }

      this.app = helpers.createGenerator('thorax:app', ['../../app'], 'test');
      this.app.options['skip-install'] = true;

      helpers.mockPrompt(this.app, {
        'newDirectory': true,
        'starterApp': "None",
        'styleProcessor': "none",
        'features': this.features || []
      });

      this.app.run({}, done);
    }.bind(this));
  });
  it('public/index.html should provide first config during development', function () {
    helpers.assertFile('public/index.html', /baseUrl: '..\/js'/);
    helpers.assertFile('public/index.html', /data-main="..\/require-config"/);
  });
  it('test/index.html should provide first config during development', function () {
    helpers.assertFile('test/index.html', /baseUrl: '..\/test'/);
    helpers.assertFile('test/index.html', /data-main="..\/require-config"/);
  });
  it('should generate a base require-config.js file for development use', function () {
    helpers.assertFile('require-config.js');
  });
  it('uses requirejs-hbs JIT handlebars compiler', function () {
    helpers.assertFile('bower.json', /"text"/);
    helpers.assertFile('bower.json', /"requirejs-hbs"/);
  });
});

describe('Production Build', function () {
  describe('The happy path(all options false, normal css)', function () {
    beforeEach(function (done) {
      helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
        if (err) { return done(err); }

        this.app = helpers.createGenerator('thorax:app', ['../../app'], 'test');
        this.app.options['skip-install'] = true;

        helpers.mockPrompt(this.app, {
          'newDirectory': true,
          'starterApp': "None",
          'styleProcessor': "none",
          'features': this.features || []
        });

        this.app.run({}, done);
      }.bind(this));
    });

    it('generates dist/index.html', function () {
      helpers.assertFiles([
        ['dist/index.html', /href="screen.css"/],
        ['dist/index.html', /src="main.js"/]
      ]);
    });

    it('generates files for easy deployment', function () {
      helpers.assertFiles([
        'server.js',
        'Procfile',
        ['package.json', /"start": "node \.\/server\.js"/]
      ]);
    });

  });
});