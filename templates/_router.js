/* global <%= appName %>, Backbone, Thorax, $, _, Thorax */
define(function () {
  var Router = Backbone.Router.extend({
    routes: <%= appName %>.routes['<%= _.dasherize(name) %>'],
    index: function () {

    }
  });

  return new Router();
});
