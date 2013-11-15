/**
 * This file is loaded before all other files by all test runners, including
 * karma. If you need to specify something require an AMD library/module, this
 * is the place to do it.
 *
 * Keep in mind karma has a different base path the browser based runner,
 * see test/main.karma.js for more information.
 *
 */

define(function(require) {
  global.chai = require("chai");
  // global.should = require("chai").should(); // TODO: errors in phantom
  global.expect = require("chai").expect;
  global.assert = require("chai").assert;
  global.AssertionError = require("chai").AssertionError;

  // https://github.com/domenic/sinon-chai/blob/master/test/throwing.coffee
  global.swallow = function (thrower) {
    try {
      thrower();
    } catch (e) { }
  };

  var sinonChai = require("sinon-chai");
  chai.use(sinonChai);

  // Sinon + Require = time sucker, be careful, require locally
  require("sinon");
  // TODO: throws error, likey something async, 1 in 20 times
  // require("sinon/stub");

  // TODO: global? Something is wrong with mock
  // require("sinon/mock");
  // require("sinon/spy");

  /**
   * require these locally within a define(function(require) {});
   * block when you need them, requiring them globally will break the world
   *
   * require("sinon/util/event");
   * require("sinon/util/fake_server");
   * require("sinon/util/fake_server_with_clock");
   * require("sinon/util/fake_timers");
   * require("sinon/util/fake_xml_http_request.js");
   * require("sinon/util/timers_ie");
   * require("sinon/util/xhr_ie");
   *
   */

  // unique to thorax apps
  global.Handlebars = require('handlebars');
  global.Backbone = require('backbone');
  global.Thorax = require('thorax');

  global.fixtures = require('fixtures');

  if (typeof window.__karma__ !== "undefined") {
    global.fixtures.path = 'base/test/fixtures';
  } else {
    global.fixtures.path = 'fixtures';
  }


  // TODO: make npm module!
  global.hbsFixture = function(template) {
    var raw = fixtures.read(template);
    return Handlebars.compile(raw);
  };

  // require handlebars helpers
  require('helpers');
});