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

describe('App Generators', function () {

  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) { return done(err); }

      this.app = helpers.createGenerator('thorax:app', ['../../app'], 'test');
      this.app.options['skip-install'] = true;

      helpers.mockPrompt(this.app, {
        'newDirectory': true,
        'starterApp': requireOption(this.starterApp, "Forgot to provide starterApp"),
        'styleProcessor': "none",
        'features': this.features || [],
      });

      this.app.run({}, done);
    }.bind(this));
  });

  describe('When javascript is chosen(default)', function () {

    sharedExamples.create('generate default javascript templates', function () {
      it('generates default javascript templates', function () {
        helpers.assertFiles([
          'js/views',
          'js/models',
          'js/collections',
          'js/views/root.js',
          ['js/helpers.js', /define\(\['handlebars', 'thorax'\]/],
          ['js/view.js', /Thorax.View.extend\(\{/],
          ['js/model.js', /Thorax.Model.extend\(\{/],
          ['js/collection.js', /Thorax.Collection.extend\(\{/],
          ['js/collection-view.js', /Thorax.CollectionView.extend\(\{/],
          ['js/layout-view.js', /Thorax.LayoutView.extend\(\{/],
          ['js/main.js', /'helpers'/],
          ['js/main.js', /'views\/root'/],
        ]);
      });
    });

    before(function() { this.features = []; });

    describe('When starterApp is "None"', function () {
      before(function () { this.starterApp = "None"; });

      sharedExamples.invoke('generate default javascript templates');
    });

    describe('When starterApp is "Hello World"', function () {
      before(function () { this.starterApp = "Hello World"; });

      sharedExamples.invoke('generate default javascript templates');

      it('generates hello world specific javascript templates', function () {
        helpers.assertFiles([
          'js/routers/hello-world.js',
          ['js/views/hello-world/index.js', /'view'/],
          ['js/main.js', /'routers\/hello-world'/],
        ]);
      });
    });

    describe('When starterApp is "Todo List"', function () {
      before(function () { this.starterApp = "Todo List"; });

      sharedExamples.invoke('generate default javascript templates');

      it('generates todo-list app javascript templates', function () {
        helpers.assertFiles([
          'js/routers/todo-list.js',
          ['js/views/todo-list/index.js', /'view'/],
          ['js/main.js', /'routers\/todo-list'/],
        ]);
      });
    });
  });

  describe('when coffee script is chosen', function () {

    sharedExamples.create('generate default coffeescript templates', function () {
      it('generates default coffeescript templates', function () {
        helpers.assertFiles([
          'js/views',
          'js/models',
          'js/collections',
          'js/views/root.coffee',
          ['js/helpers.coffee', /define \["handlebars", "thorax"\], \(Handlebars\) ->/],
          ['js/view.coffee', /class View extends Thorax.View/],
          ['js/model.coffee', /class Model extends Thorax.Model/],
          ['js/collection.coffee', /class Collection extends Thorax.Collection/],
          ['js/collection-view.coffee', /class CollectionView extends Thorax.CollectionView/],
          ['js/layout-view.coffee', /class LayoutView extends Thorax.LayoutView/],
          ['js/main.js', /'cs!helpers'/],
          ['js/main.js', /'cs!views\/root'/],
        ]);
      });
    });

    before(function() { this.features = ['includeCoffeeScript']; });

    describe('When starterApp is "None"', function () {
      before(function () { this.starterApp = "None"; });

      sharedExamples.invoke('generate default coffeescript templates');
    });

    describe('When starterApp is "Hello World"', function () {
      before(function () { this.starterApp = "Hello World"; });

      sharedExamples.invoke('generate default coffeescript templates');

      it('generates hello world specific coffeescript templates', function () {
        helpers.assertFiles([
          'js/routers/hello-world.coffee',
          ['js/views/hello-world/index.coffee', /cs!view/],
          ['js/main.js', /'cs!routers\/hello-world'/],
        ]);
      });
    });

    describe('When starterApp is "Todo List"', function () {
      before(function () { this.starterApp = "Todo List"; });

      sharedExamples.invoke('generate default coffeescript templates');

      it('generates todo-list app coffeescript templates', function () {
        helpers.assertFiles([
          'js/routers/todo-list.coffee',
          ['js/views/todo-list/index.coffee', /cs!view/],
          ['js/main.js', /'cs!routers\/todo-list'/],
        ]);
      });
    });
  });

});