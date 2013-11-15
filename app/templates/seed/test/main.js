function isKarma() {
  return typeof window.__karma__ !== "undefined";
}

var pathPrefix;
if (isKarma()) {
  pathPrefix = '/base/';
} else {
  pathPrefix = '../';
}

function configDeps() {
  // include this module with all test runners,
  // e.g., browser, mocha_phantomjs, karma
  var testSetupAll = [pathPrefix + 'test/test-setup-all.js'];

  // not running karma? return an array with test-setup-all plus
  // include test-setup-browser for browser/mocha_phantomjs test runners only
  if (!isKarma()) {
    return testSetupAll.concat([pathPrefix + 'test/test-setup-browser']);
  }

  // still here?, means we're using karma
  // grab all the test files karma is serving in karma.conf.js
  var tests = [];
  for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
      if (/\.spec\.js$/.test(file)) {
        tests.push(file);
      }
    }
  }

  // include test-setup-all
  // plus all files served by karma that contain .spec in their name
  return testSetupAll.concat(tests);
}

function configCallback() {
  // if using karma, start the runner from requirejs.config callback option
  if (isKarma()) { return window.__karma__.start; }
}

function configUrlArgs() {
  if (isKarma()) { return ''; } // karma handles all caching concerns
  return "bust=" +  (new Date()).getTime();
}

require.config({
  baseUrl: pathPrefix + 'js',
  deps: configDeps(),
  callback: configCallback(),
  paths: {
    'handlebars': pathPrefix + 'bower_components/handlebars/handlebars', // use regular so .compile works
    'mocha': pathPrefix + 'bower_components/mocha/mocha', // only used for browser/mocha_phantomjs
    'sinon': pathPrefix + 'bower_components/sinon/lib/sinon',
    'sinon-chai': pathPrefix + 'bower_components/sinon-chai/lib/sinon-chai',
    'chai': pathPrefix + 'bower_components/chai/chai',
    'fixtures': pathPrefix + 'bower_components/fixtures/fixtures'
  },
  shim: {
    'handlebars': {
      exports: 'Handlebars'
    },
    'backbone': {
      exports: 'Backbone',
      deps: ['jquery', 'underscore']
    },
    'underscore': {
      exports: '_'
    },
    'thorax': {
      exports: 'Thorax',
      deps: ['handlebars', 'backbone']
    },
  },
  urlArgs: configUrlArgs()
});