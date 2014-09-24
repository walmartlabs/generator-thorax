/**
 * This file is loaded by all test runners, including
 * karma. If you need to include a library for use in your tests:
 *
 *   1. Make sure the library is provided as an AMD module(if not, shim it, see
 *      how sinon is shimed in test/main.js for an example).
 *   2. Require the module using the `require('moduleName')` syntax below.
 *   3. Optionally export a property provided by the module to mocha's global
 *      object, e.g, `expect = require('chai').expect`.
 *
 * This file is itself a module and it will not be resolved to it's consumer until
 * all modules it consumes are themselves resolved.
 *
 */

/*global expect:true */
/*global fixtures:true */
/*global hbsFixture:true */

define(function(require) {
  var chai = require('chai');
  expect = chai.expect;

  var sinonChai = require("sinon-chai");
  chai.use(sinonChai);

  require("sinon");

  // unique to thorax apps
  require('handlebars');
  require('backbone');
  require('thorax');

  // hbs fixture support
  fixtures = require('fixtures');
  if (window.__karma__) {
    fixtures.path = 'base/test/fixtures';
  } else {
    fixtures.path = 'fixtures';
  }
  hbsFixture = function(template) {
    var raw = fixtures.read(template);
    return Handlebars.compile(raw);
  };
});