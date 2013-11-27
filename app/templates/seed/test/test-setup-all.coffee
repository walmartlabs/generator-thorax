###
This file is loaded by all test runners, including
karma. If you need to include a library for use in your tests:

1. Make sure the library is provided as an AMD module(if not, shim it, see
how sinon is shimed in test/main.js for an example).
2. Require the module using the `require('moduleName')` syntax below.
3. Optionally export a property provided by the module to mocha's global
object, e.g, `global.expect = require('chai').expect`.

This file is itself a module and it will not be resolved to it's consumer until
all modules it consumes are themselves resolved.
###

define (require) ->
  chai = require("chai")
  global.expect = chai.expect
  global.AssertionError = chai.AssertionError
  sinonChai = require("sinon-chai")
  chai.use sinonChai
  require "sinon"

  # unique to thorax apps
  require "handlebars"
  require "backbone"
  require "thorax"

  # hbs fixture support
  global.fixtures = require("fixtures")
  if typeof window.__karma__ isnt "undefined"
    global.fixtures.path = "base/test/fixtures"
  else
    global.fixtures.path = "fixtures"
  global.hbsFixture = (template) ->
    raw = global.fixtures.read(template)
    Handlebars.compile raw