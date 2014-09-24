/**
 * This file is only run in the browser and mocha_phantomjs
 *
 * It sets up mocha and manually requires files for tests. For tests run
 * outside of karma, files must be manually required below
 *
 */

/*global mocha:true */
/*global mochaPhantomJS:true */

define(function(require) {
  require('mocha');
  mocha.checkLeaks();
  mocha.setup('bdd');
  mocha.reporter('html');

  require("./test-setup-all");

  require([ // require test files
    '<% if (includeCoffeeScript) { %>cs!<% } %>./app.spec',
    '<% if (includeCoffeeScript) { %>cs!<% } %>./views/root.spec',
    '<% if (includeCoffeeScript) { %>cs!<% } %>./helpers/helpers.spec',
    '<% if (includeCoffeeScript) { %>cs!<% } %>./helpers/view-helpers.spec'
  ], function() { // run mocha
    if (window.mochaPhantomJS) { mochaPhantomJS.run(); }
    else { mocha.run(); }
  });

});