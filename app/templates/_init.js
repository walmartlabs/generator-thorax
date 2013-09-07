require([
  'views/root',
  'routers/welcome'
], function (RootView, WelcomeRouter) {
  // set base on window object for easy debugging
  window.<%= _.classify(name) %> = Base;
  
  // initialize the root view and append it to the body
  RootView.getInstance(document.body);


  Base.setup();
  Base.start(function() {
    // initialize any routers here
    new WelcomeRouter;
  });
});



define([
  'views/root',
  'underscore',
  'jquery',
  'view',
  'layout-view',
  'collection-view',
  'model',
  'collection'
], function(RootView, _) {
  return _.extend({
    setup: function() {
      this.root = new RootView;
    },
    start: function(complete) {
      $(_.bind(function() {
        Backbone.history.start({
          pushState: false,
          root: '/',
          silent: true
        });

        // View may use link or url helpers which
        // depend on Backbone history being setup
        // so need to wait to loadUrl() (which will)
        // actually execute the route
        this.root.appendTo(document.body);

        complete(function() {
          Backbone.history.loadUrl();
        });

      }, this));
    }
  }, Backbone.Events);
});