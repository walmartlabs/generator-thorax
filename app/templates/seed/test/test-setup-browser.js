/**
 * This file is only run in the browser and mocha_phantomjs
 *
 * It sets up mocha and manually requires files for tests. For tests run
 * outside of karma, files must be manually required below
 *
 */


define(function(require) {

  require('mocha');
  global.mocha.checkLeaks();
  global.mocha.setup('bdd');
  global.mocha.reporter('html');

  require([ // require test files
    '<% if (includeCoffeeScript) { %>cs!<% } %>./app.spec',
    '<% if (includeCoffeeScript) { %>cs!<% } %>./views/root.spec',
    '<% if (includeCoffeeScript) { %>cs!<% } %>./helpers/helpers.spec',
    '<% if (includeCoffeeScript) { %>cs!<% } %>./helpers/view-helpers.spec'
  ], function() { // run mocha
    if (global.mochaPhantomJS) { global.mochaPhantomJS.run(); }
    else { global.mocha.run(); }
  });

});