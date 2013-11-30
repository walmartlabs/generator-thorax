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

describe('Stylesheet Generators', function(){

  sharedExamples.create('should not generate css/base.css', function () {
    helpers.assertNoFile('css/base.css');
  });

  beforeEach(function (done){
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) { return done(err); }

      this.app = helpers.createGenerator('thorax:app', ['../../app'], 'test');
      this.app.options['skip-install'] = true;

      helpers.mockPrompt(this.app, {
        'newDirectory': false,
        'starterApp': "None",
        'styleProcessor': this.styleOption,
        'features': this.features || []
      });

      this.app.run({}, done);
    }.bind(this));
  });

  describe('SASS', function () {
    before(function () {
      this.styleOption = "sass";
    });

    sharedExamples.invoke('should not generate css/base.css');
    it('should generate css/base.scss', function () {
      helpers.assertFile('css/base.scss');
    });
    it('is included when selected in the prompt', function () {
      helpers.assertFiles([
        'tasks/options/sass.js',
        ['tasks/styles.js', /'sass'/],
        ['package.json', /grunt-contrib-sass/]
      ]);
    });

  });

  describe('LESS(comes with bootstrap by default)', function () {
    before(function () {
      this.styleOption = "less";
    });

    it('is included when selected in the prompt', function () {
      helpers.assertFiles([
        'tasks/options/less.js',
        ['tasks/styles.js', /'less'/],
        ['package.json', /grunt-contrib-less/],
        ['bower.json', /"bootstrap"/]
      ]);
    });
    it('generates css/base.less instead of css/base.css', function () {
      helpers.assertFile('css/base.less', /import "..\/bower_components\/bootstrap\/less\/bootstrap";/);

    });
  });

  describe('Stylus', function () {
    before(function () {
      this.styleOption = "stylus";
    });

    sharedExamples.invoke('should not generate css/base.css');
    it('should generate css/base.scss', function () {
      helpers.assertFile('css/base.styl');
    });

    it('is included when selected in the prompt', function () {
      helpers.assertFiles([
        'tasks/options/stylus.js',
        ['tasks/styles.js', /'stylus'/],
        ['package.json', /grunt-contrib-stylus/]
      ]);
    });
  });
});