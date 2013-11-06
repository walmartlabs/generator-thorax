/* global describe, beforeEach, it */
var path    = require('path');
var chai = require('chai');
var expect = chai.expect;
var helpers = require('yeoman-generator').test;

describe('thorax generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) { return done(err); }

      this.app = helpers.createGenerator('thorax:app', ['../../app'], 'test');
      this.app.options['skip-install'] = true;

      helpers.mockPrompt(this.app, {
        'newDirectory': false,
        'starterApp': "None",
        'styleProcessor': "none",
        'includeBootstrap': false,
        'includeCoffeeScript': false,
        'useZepto': false
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
      '.jshintrc',
      '.editorconfig',
      ['bower.json', /"name": "test"/g],
      ['package.json', /"name": "test"/g],
      'Gruntfile.js',
      'js/views',
      'js/models',
      'js/collections',
      ['js/view.js', /Thorax.View.extend\(\{/],
      ['js/model.js', /Thorax.Model.extend\(\{/],
      ['js/collection.js', /Thorax.Collection.extend\(\{/],
      ['js/helpers.js', /define\(\['handlebars'\]/],
      'public/index.html',
      'dist/index.html',
      'css/base.css',
      'tasks/ensure-installed.js',
      'tasks/open-browser.js',
      'tasks/styles.js',
      'tasks/templates.js',
      'tasks/options/clean.js',
      'tasks/options/connect.js',
      'tasks/options/copy.js',
      'tasks/options/cssmin.js',
      'tasks/options/handlebars.js',
      'tasks/options/requirejs.js',
      'tasks/options/thorax.js',
      'tasks/options/watch.js'
    ];

    helpers.assertFiles(expected);
  });

  describe('Thorax Router', function () {
    it('generates a Backbone router', function (done) {
      var router = helpers.createGenerator('thorax:router', ['../../router'], ['foo']);

      router.run([], function () {
        helpers.assertFiles([
          ['js/routers/foo.js', /Backbone.Router.extend\(\{/]
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
          ['js/views/foo.js', /View.extend\(\{/],
          ['js/views/foo.js', /name: 'foo'/],
          'js/templates/foo.handlebars'
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
          ['js/models/foo.js', /Model.extend\(\{/],
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
          ['js/collections/foo.js', /Collection.extend\(\{/],
          ['js/collections/foo.js', /name: 'foo'/]
        ]);
        done();
      });
    });
  });

  describe('Thorax Collection View', function () {
    it('generates a Thorax collection view', function (done) {
      var collectionView = helpers.createGenerator('thorax:collection-view', ['../../collection-view'], ['fooBar']);

      collectionView.run([], function () {
        helpers.assertFiles([
          ['js/views/foo-bar.js', /CollectionView.extend\(\{/],
          ['js/views/foo-bar.js', /name: 'fooBar'/],
          'js/templates/foo-bar.handlebars',
          'js/templates/foo-bar-item.handlebars',
          'js/templates/foo-bar-empty.handlebars'
        ]);
        done();
      });
    });
  });

  describe('CoffeeScript', function () {
    beforeEach(function (done) {
      helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
        if (err) { return done(err); }

        this.app = helpers.createGenerator('thorax:app', ['../../app'], 'test');
        this.app.options['skip-install'] = true;

        helpers.mockPrompt(this.app, {
          'newDirectory': true,
          'starterApp': "None",
          'styleProcessor': "none",
          'includeBootstrap': false,
          'includeCoffeeScript': true,
          'useZepto': false
        });

        this.app.run({}, done);
      }.bind(this));
    });

    it('generates CoffeeScript templates when requested', function () {
      helpers.assertFiles([
        'js/views',
        'js/models',
        'js/collections',
        'js/views/root.coffee',
        ['js/view.coffee', /class View extends Thorax.View/],
        ['js/model.coffee', /class Model extends Thorax.Model/],
        ['js/collection.coffee', /class Collection extends Thorax.Collection/],
        ['js/collection-view.coffee', /class CollectionView extends Thorax.CollectionView/],
        ['js/layout-view.coffee', /class LayoutView extends Thorax.LayoutView/]
      ]);
    });

    it('generates CoffeeScript grunt config file', function () {
      helpers.assertFiles([
        'tasks/options/coffee.js'
      ]);
    });

    it('integrates with requirejs via the require-cs package', function () {
      helpers.assertFiles([
        ['tasks/options/requirejs.js', /location: '..\/..\/bower_components\/require-cs'/]
      ]);
    });

  });

  describe('CoffeeScript - HelloWorld', function () {
    beforeEach(function (done) {
      helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
        if (err) { return done(err); }

        this.app = helpers.createGenerator('thorax:app', ['../../app'], 'test');
        this.app.options['skip-install'] = true;

        helpers.mockPrompt(this.app, {
          'newDirectory': true,
          'starterApp': "Hello World",
          'styleProcessor': "none",
          'includeBootstrap': false,
          'includeCoffeeScript': true,
          'useZepto': false
        });

        this.app.run({}, done);
      }.bind(this));
    });

    it('generates CoffeeScript templates when requested', function () {
      helpers.assertFiles([
        'js/views',
        'js/models',
        'js/collections',
        'js/views/root.coffee',
        'js/routers/hello-world.coffee',
        'js/views/hello-world/index.coffee',
        ['js/view.coffee', /class View extends Thorax.View/],
        ['js/model.coffee', /class Model extends Thorax.Model/],
        ['js/collection.coffee', /class Collection extends Thorax.Collection/],
        ['js/collection-view.coffee', /class CollectionView extends Thorax.CollectionView/],
        ['js/layout-view.coffee', /class LayoutView extends Thorax.LayoutView/]
      ]);
    });

    it('generates CoffeeScript grunt config file', function () {
      helpers.assertFiles([
        'tasks/options/coffee.js'
      ]);
    });
  });

  describe('CoffeeScript - Todo List', function () {
    beforeEach(function (done) {
      helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
        if (err) { return done(err); }

        this.app = helpers.createGenerator('thorax:app', ['../../app'], 'test');
        this.app.options['skip-install'] = true;

        helpers.mockPrompt(this.app, {
          'newDirectory': true,
          'starterApp': "Todo List",
          'styleProcessor': "none",
          'includeBootstrap': false,
          'includeCoffeeScript': true,
          'useZepto': false
        });

        this.app.run({}, done);
      }.bind(this));
    });

    it('generates CoffeeScript templates when requested', function () {
      helpers.assertFiles([
        'js/views',
        'js/models',
        'js/collections',
        'js/views/root.coffee',
        'js/routers/todo-list.coffee',
        'js/views/todo-list/index.coffee',
        ['js/view.coffee', /class View extends Thorax.View/],
        ['js/model.coffee', /class Model extends Thorax.Model/],
        ['js/collection.coffee', /class Collection extends Thorax.Collection/],
        ['js/collection-view.coffee', /class CollectionView extends Thorax.CollectionView/],
        ['js/layout-view.coffee', /class LayoutView extends Thorax.LayoutView/]
      ]);
    });

    it('generates CoffeeScript grunt config files', function () {
      helpers.assertFiles([
        'tasks/options/coffee.js'
      ]);
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
          'includeBootstrap': false,
          'includeCoffeeScript': false,
          'useZepto': this.useZeptoOption
        });

        this.app.run({}, done);
      }.bind(this));
    });

    describe('jQuery', function () {
      before(function () {
        this.useZeptoOption = false;
      });

      it('is included when selected in the prompt', function () {
        helpers.assertFiles([
          ['bower.json', /jquery/],
          ['js/main.js', /jquery/],
          ['tasks/options/requirejs.js', /bower_components\/jquery\/jquery/],
          ['tasks/options/requirejs.js', /deps: \['jquery', 'underscore'\]/],
          ['tasks/options/requirejs.js', /deps: \['jquery'\]/]
        ]);
      });
    });

    describe('Zepto', function () {
      before(function () {
        this.useZeptoOption = true;
      });

      it('is included when selected in the prompt', function () {
        helpers.assertFiles([
          ['bower.json', /zepto/],
          ['js/main.js', /zepto/],
          ['tasks/options/requirejs.js', /bower_components\/zepto\/zepto/],
          ['tasks/options/requirejs.js', /deps: \['zepto', 'underscore'\]/],
          ['tasks/options/requirejs.js', /deps: \['zepto'\]/],
          ['tasks/options/requirejs.js', /exports: '\$'/]
        ]);
      });
    });

  });

  describe('Style Processors', function(){

    beforeEach(function (done){
      helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
        if (err) { return done(err); }

        this.app = helpers.createGenerator('thorax:app', ['../../app'], 'test');
        this.app.options['skip-install'] = true;

        helpers.mockPrompt(this.app, {
          'newDirectory': false,
          'starterApp': "None",
          'styleProcessor': this.styleOption,
          'includeBootstrap': false,
          'includeCoffeeScript': false,
          'useZepto': false
        });

        this.app.run({}, done);
      }.bind(this));
    });

    describe('SASS', function () {
      before(function () {
        this.styleOption = "sass";
      });

      it('is included when selected in the prompt', function () {
        helpers.assertFiles([
          'tasks/options/sass.js',
          ['tasks/styles.js', /'sass'/],
          ['package.json', /grunt-contrib-sass/]
        ]);
      });
    });

    describe('LESS', function () {
      before(function () {
        this.styleOption = "less";
      });

      it('is included when selected in the prompt', function () {
        helpers.assertFiles([
          'tasks/options/less.js',
          ['tasks/styles.js', /'less'/],
          ['package.json', /grunt-contrib-less/]
        ]);
      });
    });

    describe('Stylus', function () {
      before(function () {
        this.styleOption = "stylus";
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

  describe('Bootstrap', function () {
    beforeEach(function (done) {
      helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
        if (err) { return done(err); }

        this.app = helpers.createGenerator('thorax:app', ['../../app'], 'test');
        this.app.options['skip-install'] = true;

        helpers.mockPrompt(this.app, {
          'newDirectory': true,
          'starterApp': "None",
          'styleProcessor': "none",
          'includeBootstrap': true,
          'includeCoffeeScript': false,
          'useZepto': false
        });

        this.app.run({}, done);
      }.bind(this));
    });

    it('generates Bootstrap grunt config file', function () {
      helpers.assertFiles([
        ['tasks/styles.js', /'copy:bootstrap'/],
        ['tasks/options/copy.js', /bootstrap: \{/],
        ['bower.json', /"bootstrap"/]
      ]);
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
            'includeBootstrap': false,
            'includeCoffeeScript': false,
            'useZepto': false
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

    });
  });

});