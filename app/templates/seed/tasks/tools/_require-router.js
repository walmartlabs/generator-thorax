/* global <%= appName %>, require */
require(['backbone'], function (Backbone) {
  <%= appName %>.routes = <%= routers %>;

  var handlers = {};
  handlers.routes = {};

  _.each(<%= appName %>.routes, function (routes, file) {
    // Since every route here will be loading the same resource, we should
    // reuse the same function in the Backbone.Router instance
    var fn = function () {
      return require([ 'routers/' + file ], function () {
        Backbone.history.loadUrl();
      });
    };

    // Loop through each of the routes and add to the loader
    _.each(routes, function (invoke, route) {
      var uniqueId = _.uniqueId('require');

      handlers[uniqueId]     = fn;
      handlers.routes[route] = uniqueId;
    });
  });

  new (Backbone.Router.extend(handlers))();

  return Backbone.history.loadUrl();
});
