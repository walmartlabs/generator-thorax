###
This file is only run in the browser and mocha_phantomjs

It sets up mocha and manually requires files for tests. For tests run
outside of karma, files must be manually required below
###

define (require) ->
  require "mocha"
  global.mocha.checkLeaks()
  global.mocha.setup "bdd"
  global.mocha.reporter "html"

  require [
    "./app.spec",
    "./views/root.spec",
    "cs!./views/root-coffee.spec",
    "./helpers/helpers.spec",
    "./helpers/view-helpers.spec"
  ], -> # run mocha
    if global.mochaPhantomJS
      global.mochaPhantomJS.run()
    else
      global.mocha.run()


