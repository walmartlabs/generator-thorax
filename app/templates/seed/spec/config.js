require.config({
  baseUrl: "../js",
  paths: {
    thorax: '../bower_components/thorax/thorax',
    handlebars: '../bower_components/handlebars/handlebars',
    jquery: '../bower_components/jquery/jquery',
    underscore: '../bower_components/underscore/underscore',
    backbone: '../bower_components/backbone/backbone',
    mocha: '../bower_components/mocha/mocha',
    sinon: '../bower_components/sinon/lib/sinon',
    'sinon-chai': '../bower_components/sinon-chai/lib/sinon-chai',
    chai: '../bower_components/chai/chai'
  },
  shim: {
    backbone: {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    },
    thorax: {
      deps: ['backbone', 'handlebars'],
      exports: 'Thorax'
    }
  }
});

// You can do this in the grunt config for each mocha task, see the `options` config
mocha.setup({
  ui: 'bdd',
  ignoreLeaks: true
});

// Assertion libraries and extensions for mocha
var vendorDeps = [
  'chai',
  'sinon',
  'sinon-chai'
];

// Add all your test dependencies here
var deps = [
  '../spec/spec-helpers',
  '../spec/app'
];

deps = vendorDeps.concat(deps);

require(deps, function(chai) {
  window.expect = chai.expect;
  (window.mochaPhantomJS || mocha).run();
});