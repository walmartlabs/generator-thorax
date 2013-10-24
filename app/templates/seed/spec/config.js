require.config({
  baseUrl: "../js",
  paths: {
    thorax: '../bower_components/thorax/thorax',
    handlebars: '../bower_components/handlebars/handlebars',
    jquery: '../bower_components/jquery/jquery',
    underscore: '../bower_components/underscore/underscore',
    backbone: '../bower_components/backbone/backbone',
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

// Add all your test dependencies here
var testDeps = [
  'app'
];

testDeps = testDeps.map(function(dep) {
  return '../spec/' + dep;
});

var deps = ['../spec/spec-helpers'].concat(testDeps);

require(deps, function() {
  if (typeof mochaPhantomJS !== "undefined") { mochaPhantomJS.run(); }
  else { mocha.run(); }
});