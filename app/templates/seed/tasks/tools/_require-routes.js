/* global require, Backbone */
(function () {
  var handlers = {};

  handlers.routes = {};

  _.each(<%= routes %>, function (module, route) {
    var routeName = 'require_' + route;
    // Requirejs module loading when we hit the route
    handlers[routeName] = function () {
      // Use requirejs to load the route and related backbone view
      require([module], function () {
        // Trigger a reload so the anything new can catch it
        Backbone.history.loadUrl();
      });
    };
    // Bind the route name spaced for Backbone
    handlers.routes[route] = routeName;
  });

  new (Backbone.Router.extend(handlers))();
})();
