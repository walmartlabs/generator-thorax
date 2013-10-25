require.config({
  baseUrl: "../js",
  paths: {
    thorax: '../bower_components/thorax/thorax',
    hbs: '../bower_components/hbs/hbs',
    i18nprecompile: '../bower_components/hbs/hbs/i18nprecompile',
    json2: '../bower_components/hbs/hbs/json2',
    Handlebars: '../bower_components/handlebars/Handlebars',
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
    underscore: {
      exports: '_'
    },
    Handlebars: {
      exports: 'Handlebars'
    },
    thorax: {
      deps: ['backbone', 'Handlebars', 'hbs'],
      exports: 'Thorax'
    }
  },
  hbs: {
    templateExtension : 'hbs',
    // if disableI18n is `true` it won't load locales and the i18n helper
    // won't work as well.
    disableI18n : true,

    // Don't auto-load helpers from a templates directory
    disableHelpers: true
  },
  map: {
    "*": {"handlebars": "Handlebars"}
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