/* global describe, beforeEach, it */
var path    = require('path');
var assert  = require('assert');
var helpers = require('yeoman-generator').test;

describe('thorax generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) { return done(err); }

      this.app = helpers.createGenerator('thorax:app', ['../../app'], 'test');
      this.app.options['skip-install'] = true;

      helpers.mockPrompt(this.app, {
        'newDirectory': false
      });

      this.app.run({}, done);
    }.bind(this));
  });

  it('every generator can be required without throwing', function () {
    assert(require('../app'));
    assert(require('../collection'));
    assert(require('../collection-view'));
    assert(require('../helper'));
    assert(require('../model'));
    assert(require('../router'));
    assert(require('../view'));
    assert(require('../view-helper'));
  });

  describe('each generater', function () {
    ['app', 'collection', 'collection-view', 'helper', 'model',
     'router', 'view', 'view-helper'].forEach(function (name) {
      it(name + ' can be run without an explicit name', function (done) {
        var test = helpers.createGenerator('thorax:' + name, ['../../' + name]);
        test.options['skip-install'] = true;
        helpers.mockPrompt(test, {
          'name': 'test'
        });

        test.run([], done);
      });
    });
  });

  it('creates expected files', function (done) {
    var expected = [
      '.jshintrc',
      '.editorconfig',
      ['bower.json', /"name": "test"/g],
      ['package.json', /"name": "test"/g],
      ['lumbar.json', /"name": "Test"/g],
      'Gruntfile.js',
      'README.md',
      'js/views',
      'js/models',
      'js/routers',
      'js/collections',
      ['js/init.js', /var Test = window.Test = new Thorax.LayoutView\(\{/],
      ['js/view.js', /Test.View = Thorax.View.extend\(\{/],
      ['js/model.js', /Test.Model = Thorax.Model.extend\(\{/],
      ['js/collection.js', /Test.Collection = Thorax.Collection.extend\(\{/],
      'public/index.html',
      'stylesheets/base.css',
      'tasks/ensure-installed.js',
      'templates/application.handlebars'
    ];

    helpers.assertFiles(expected);
    done();
  });

  describe('Thorax Router', function () {
    it('generates a Backbone router', function (done) {
      var router = helpers.createGenerator('thorax:router', ['../../router'], ['foo']);

      router.run([], function () {
        helpers.assertFiles([
          ['js/routers/foo.js', /new \(Backbone.Router.extend\(\{/]
        ]);
        done();
      });
    });
  });

  describe('Thorax View', function () {
    it('generates a Thorax view', function (done) {
      var view = helpers.createGenerator('thorax:view', ['../../view'], ['foo']);

      view.run([], function () {
        helpers.assertFiles([
          ['js/views/foo.js', /Test.View.extend\(\{/],
          ['js/views/foo.js', /name: 'foo'/]
        ]);
        done();
      });
    });
  });

  describe('Thorax Model', function () {
    it('generates a Thorax model', function (done) {
      var model = helpers.createGenerator('thorax:model', ['../../model'], ['foo']);

      model.run([], function () {
        helpers.assertFiles([
          ['js/models/foo.js', /Test.Model.extend\(\{/],
          ['js/models/foo.js', /name: 'foo'/]
        ]);
        done();
      });
    });
  });

  describe('Thorax Collection', function () {
    it('generates a Thorax collection', function (done) {
      var collection = helpers.createGenerator('thorax:collection', ['../../collection'], ['foo']);

      collection.run([], function () {
        helpers.assertFiles([
          ['js/collections/foo.js', /Test.Collection.extend\(\{/],
          ['js/collections/foo.js', /name: 'foo'/]
        ]);
        done();
      });
    });
  });

  describe('Thorax Collection View', function () {
    it('generates a Thorax collection view', function (done) {
      var collectionView = helpers.createGenerator('thorax:collection-view', ['../../collection-view'], ['foo']);

      collectionView.run([], function () {
        helpers.assertFiles([
          ['js/views/foo.js', /Test.CollectionView.extend\(\{/],
          ['js/views/foo.js', /name: 'foo'/]
        ]);
        done();
      });
    });
  });

  describe('Thorax Helper', function () {
    it('generates a Handlebars helper', function (done) {
      var helper = helpers.createGenerator('thorax:helper', ['../../helper'], ['foo']);

      helper.run([], function () {
        helpers.assertFiles([
          ['js/helpers/foo.js', /Handlebars.registerHelper\('foo', function/]
        ]);
        done();
      });
    });
  });

  describe('Thorax View Helper', function () {
    it('generates a Handlebars view helper', function (done) {
      var viewHelper = helpers.createGenerator('thorax:view-helper', ['../../view-helper'], ['foo']);

      viewHelper.run([], function () {
        helpers.assertFiles([
          ['js/helpers/foo.js', /Handlebars.registerViewHelper\('foo', function/]
        ]);
        done();
      });
    });
  });
});
