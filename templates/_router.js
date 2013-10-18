define([
  'views/root',
  'backbone'
], function (RootView, Backbone) {
  return Backbone.Router.extend({
    routes: {
      '': 'posts',
      'posts': 'posts'
      'posts/:id': 'posts'
    },

    initialize: function() {
      // set up any instance variables here
      // this.posts = new PostsCollection;
    },

    posts: function(id) {
      if (id) {
        // Fetch a single model with id `id` and render a view for it
        var model = this.posts.get(id);
        var view = new PostView({model: model});
        model.fetch();
      } else {
        // Fetch and populate the posts collection and render a collection view for it
        var view = new PostsView({collection: this.posts});
        this.posts.fetch();
      }
    }

  });
});
