define([
  'backbone',
  'views/root',
  'views/hello-world/index'
], function(Backbone, RootView, IndexView) {
  return Backbone.Router.extend({
    routes: {
      "": "index"
    },
    index: function() {
      var view = new IndexView();
      RootView.getInstance().setView(view);
    }
  });
});