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

describe('Sub Generators', function () {

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

  describe('yo thorax:router foo', function () {
    describe('When app is JS based(not CS)', function () {
      before(function() { this.features = ['']; });

      it('generates a Backbone router in javascript', function (done) {
        var router = helpers.createGenerator('thorax:router', ['../../router'], ['foo']);

        router.run([], function () {
          helpers.assertFiles([
            ['js/routers/foo.js', /Backbone.Router.extend\(\{/],
            ['js/routers/foo.js', /function \(Backbone, RootView\)/],
            ['test/routers/foo.spec.js', /define\(\['routers\/foo'\], function \(FooRouter\)/],
            ['test/routers/foo.spec.js', /expect\(FooRouter\)/]
          ]);
          done();
        });
      });
    });

    describe('When app is CS based', function () {
      before(function() { this.features = ['includeCoffeeScript']; });

      it('generates a backbone router in coffeescript', function (done) {
        var router = helpers.createGenerator('thorax:router', ['../../router'], 'foo');

        router.run([], function () {
          helpers.assertFiles([
            ['js/routers/foo.coffee', /Backbone.Router.extend/],
            ['js/routers/foo.coffee', /\(Backbone, RootView\) ->/],
            ['test/routers/foo.spec.coffee', /define \["cs!routers\/foo"\], \(FooRouter\)/],
            ['test/routers/foo.spec.coffee', /expect\(FooRouter\)/]
          ]);
          done();
        });
      });

    });
  });

  describe('yo thorax:view foo/index', function () {
    describe('when app is JS based(not CS)', function () {

      before(function() { this.features = []; });

      it('generates a Thorax view', function (done) {
        var view = helpers.createGenerator('thorax:view', ['../../view'], ['foo/index']);

        view.run([], function () {
          helpers.assertFiles([
            ['js/views/foo/index.js', /View.extend\(\{/],
            ['js/views/foo/index.js', /name: 'foo\/index'/],
            'js/templates/foo/index.hbs',
            ['test/views/foo/index.spec.js', /define\(\['views\/foo\/index'\], function \(FooIndexView\)/],
            ['test/views/foo/index.spec.js', /expect\(FooIndexView\)/]
          ]);
          done();
        });
      });
    });

    describe('when app is CS based', function () {
      before(function() { this.features = ['includeCoffeeScript']; });

      it('generates a Thorax view', function (done) {
        var view = helpers.createGenerator('thorax:view', ['../../view'], ['foo/index']);

        view.run([], function () {
          helpers.assertFiles([
            ['js/views/foo/index.coffee', /View.extend/],
            ['js/views/foo/index.coffee', /name: 'foo\/index'/],
            ['js/views/foo/index.coffee', /'hbs!templates\/foo\/index'/],
            ['js/views/foo/index.coffee', /'cs!view'/],
            'js/templates/foo/index.hbs',
            ['test/views/foo/index.spec.coffee', /define \["cs!views\/foo\/index"\], \(FooIndexView\) ->/],
            ['test/views/foo/index.spec.coffee', /expect\(FooIndexView\)/]
          ]);
          done();
        });
      });
    });
  });

  describe('yo thorax:model', function () {
    describe('when app is JS based(not CS)', function () {
      before(function() { this.features = []; });

      it('generates a Thorax model', function (done) {
        var model = helpers.createGenerator('thorax:model', ['../../model'], ['foo']);

        model.run([], function () {
          helpers.assertFiles([
            ['js/models/foo.js', /Model.extend\(\{/],
            ['js/models/foo.js', /name: 'foo'/],
            ['test/models/foo.spec.js', /define\(\['models\/foo'\], function \(Foo\)/],
            ['test/models/foo.spec.js', /expect\(Foo\)/]
          ]);
          done();
        });
      });

    });

    describe('when app is CS based', function () {
      before(function() { this.features = ['includeCoffeeScript']; });

      it('generates a Thorax model', function (done) {
        var model = helpers.createGenerator('thorax:model', ['../../model'], ['foo']);

        model.run([], function () {
          helpers.assertFiles([
            ['js/models/foo.coffee', /Model.extend/],
            ['js/models/foo.coffee', /name: 'foo'/],
            ['js/models/foo.coffee', /'cs!model'/],
            ['test/models/foo.spec.coffee', /define \["cs!models\/foo"\], \(Foo\)/],
            ['test/models/foo.spec.coffee', /expect\(Foo\)/]
          ]);
          done();
        });
      });
    });
  });

  describe('yo thorax:collection todos', function () {
    describe('when app is JS based(not CS)', function () {

      before(function() { this.features = []; });

      it('generates a Thorax collection', function (done) {
        var collection = helpers.createGenerator('thorax:collection', ['../../collection'], ['todos']);

        collection.run([], function () {
          helpers.assertFiles([
            ['js/collections/todos.js', /Collection.extend\(\{/],
            ['js/collections/todos.js', /name: 'todos'/],
            ['js/collections/todos.js', /'collection'/],
            ['test/collections/todos.spec.js', /define\(\['collections\/todos'\], function \(Todos\)/],
            ['test/collections/todos.spec.js', /expect\(Todos\)/]
          ]);
          done();
        });
      });

    });

    describe('when app is CS based', function () {
      before(function() { this.features = ['includeCoffeeScript']; });

      it('generates a Thorax collection', function (done) {
        var collection = helpers.createGenerator('thorax:collection', ['../../collection'], ['todos']);

        collection.run([], function () {
          helpers.assertFiles([
            ['js/collections/todos.coffee', /Collection.extend/],
            ['js/collections/todos.coffee', /name: 'todos'/],
            ['js/collections/todos.coffee', /'cs!collection'/],
            ['test/collections/todos.spec.coffee', /define \["cs!collections\/todos"\], \(Todos\)/],
            ['test/collections/todos.spec.coffee', /expect\(Todos\)/]
          ]);
          done();
        });
      });
    });
  });

  describe('yo thorax:collection-view fooBar', function () {
    describe('when app is JS based(not CS)', function () {

      before(function() { this.features = []; });

      it('generates a Thorax collection view', function (done) {
        var collectionView = helpers.createGenerator('thorax:collection-view', ['../../collection-view'], ['fooBar']);

        collectionView.run([], function () {
          helpers.assertFiles([
            ['js/views/foo-bar.js', /CollectionView.extend\(\{/],
            ['js/views/foo-bar.js', /name: 'foo-bar'/],
            ['js/views/foo-bar.js', /'collection-view'/],
            ['js/views/foo-bar.js', /'hbs!templates\/foo-bar'/],
            ['js/views/foo-bar.js', /'hbs!templates\/foo-bar-item'/],
            ['js/views/foo-bar.js', /'hbs!templates\/foo-bar-empty'/],
            'js/templates/foo-bar.hbs',
            'js/templates/foo-bar-item.hbs',
            'js/templates/foo-bar-empty.hbs',
            // tests
            ['test/views/foo-bar.spec.js', /define\(\['views\/foo-bar'\], function \(FooBarCollectionView\)/],
            ['test/views/foo-bar.spec.js', /expect\(FooBarCollectionView\)/]
          ]);
          done();
        });
      });

    });

    describe('when the app is CS based', function () {
      before(function() { this.features = ['includeCoffeeScript']; });
      it('generates a Thorax collection view', function (done) {
        var collectionView = helpers.createGenerator('thorax:collection-view', ['../../collection-view'], ['fooBar']);

        collectionView.run([], function () {
          helpers.assertFiles([
            ['js/views/foo-bar.coffee', /CollectionView.extend/],
            ['js/views/foo-bar.coffee', /name: 'foo-bar'/],
            ['js/views/foo-bar.coffee', /'cs!collection-view'/],
            ['js/views/foo-bar.coffee', /'hbs!templates\/foo-bar'/],
            ['js/views/foo-bar.coffee', /'hbs!templates\/foo-bar-item'/],
            ['js/views/foo-bar.coffee', /'hbs!templates\/foo-bar-empty'/],
            'js/templates/foo-bar.hbs',
            'js/templates/foo-bar-item.hbs',
            'js/templates/foo-bar-empty.hbs',
            // tests
            ['test/views/foo-bar.spec.coffee', /define \["cs!views\/foo-bar"\], \(FooBarCollectionView\) ->/],
            ['test/views/foo-bar.spec.coffee', /expect\(FooBarCollectionView\)/]
          ]);
          done();
        });
      });
    });

  });
});