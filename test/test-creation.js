/* global describe, beforeEach, it */
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
}

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
      ['js/helpers.js', /define\(\['handlebars', 'thorax'\]/],
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
          ['tasks/options/requirejs.js', /exports: '\$'/]
        ]);
      });
    });

  });

  describe('Style Processors', function(){

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

  describe('Testing', function () {

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
          'useZepto': false
        });

        this.app.run({}, done);
      }.bind(this));
    });
    it('generates an app that supports testing with karma', function () {
      helpers.assertFiles([
        'karma.conf.js',
        'tasks/options/karma.js',
        ['package.json', /"karma"/],
        ['package.json', /"karma-mocha"/],
        ['package.json', /"grunt-karma"/],
        ['package.json', /"karma-safari-launcher"/]
      ]);
    });
    it('generates an app that supports testing with phantomjs', function () {
      helpers.assertFiles([
        'tasks/options/mocha_phantomjs.js',
        ['package.json', /"mocha-phantomjs"/],
        ['package.json', /"phantomjs"/],
        ['package.json', /"grunt-mocha-phantomjs"/]
      ]);
    });
    it('generates a test directory setup with requirejs', function () {
      helpers.assertFiles([
        'test/index.html',
        'test/app.spec.js', // branch for cs version?
        'test/main.js',
        'test/main.karma.js',
        'test/test-setup-all.js',
        'test/test-setup-browser.js',
        'test/collections/.gitkeep',
        'test/fixtures/.gitkeep',
        'test/helpers/.gitkeep',
        'test/models/.gitkeep',
        'test/routers/.gitkeep',
        'test/utils/.gitkeep',
        'test/views/.gitkeep',
      ]);
      it('generates some example tests to help when getting started', function () {
        // TODO: how deep should we go into this?
        // - will it matter which app we generated(perhaps).
        // - which directories are the most important? helpers and views?
        // - provide js and cs versions? or just always support cs(current way)
        helpers.assertFiles([
          'test/views/root.spec.js',
          'test/views/root-coffee.spec.coffee', // TODO: cs support? right now it's just default
        ]);
      });
      it('shows examples of how to use helpers with fixtures', function () {
        helpers.assertFiles([
          'test/fixtures/adding-machine.hbs',
          'test/fixtures/example.hbs',
          'test/fixtures/example2.html',
          'test/fixtures/example3.handlebars',
          'test/fixtures/get-excited.hbs',
          'test/helpers/helpers.spec.js',
          'test/helpers/view-helpers.spec.js',
        ]);
      });
      it('generates bower with right dependencies', function () {
        helpers.assertFiles([
          ['bower.json', /"fixtures"/],
          ['bower.json', /"mocha"/],
          ['bower.json', /"chai"/],
          ['bower.json', /"sinon"/],
          ['bower.json', /"sinon-chai"/]
        ]);
      });
      it('provides support for travis ci out of the box', function () {
        helpers.assertFile('.travis.yml');
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
          'includeBootstrap': false,
          'includeCoffeeScript': false,
          'useZepto': false
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
          'includeBootstrap': false,
          'includeCoffeeScript': false,
          'useZepto': false
        });

        this.app.run({}, done);
      }.bind(this));
    });
    it('public/index.html should provide first config during development', function () {
      helpers.assertFile('public/index.html', /baseUrl: '..\/js'/);
    });
    it('should generate a base main.js file for development use', function () {
      helpers.assertFile('main.js');
    });
    it('uses requirejs-hbs JIT handlebars compiler(tagged version)', function () {
      helpers.assertFile('bower.json', /"text"/);
      helpers.assertFile('bower.json', /"requirejs-hbs": "trombom\/requirejs-hbs#v0.1"/);
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