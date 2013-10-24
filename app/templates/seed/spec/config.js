require.config({
  baseUrl: "../js",
  paths: {
    thorax: '../bower_components/thorax/thorax',
    handlebars: '../bower_components/handlebars/handlebars',
    jquery: '../bower_components/jquery/jquery',
    underscore: '../bower_components/underscore/underscore',
    backbone: '../bower_components/backbone/backbone',
    mocha: '../bower_components/mocha/mocha',
    sinon: '../bower_components/sinon/sinon',
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

// Add all your test dependencies here
var deps = [
  '../spec/spec-helpers',
  '../spec/app'
]

require(deps, function() {
  window.expect = chai.expect;

  if (typeof mochaPhantomJS !== "undefined") {
    mochaPhantomJS.run();
  } else {
    mocha.run();
  }
});