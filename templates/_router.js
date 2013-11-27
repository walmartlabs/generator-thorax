define([
  'backbone',
  'views/root'
], function (RootView, Backbone) {
  return Backbone.Router.extend({
    <% if (useStubMethods) { %>
    // For example, if your app was a blog and had a `posts` model, your router
    // might look something like this:
    routes: {
      '': 'posts',
      'posts': 'posts'
      'posts/:id': 'posts'
    },

    initialize: function() {
      // set up any instance variables here
      this.posts = new PostsCollection;
    },

    posts: function(id) {
      if (id) {
        // Fetch a single model with id `id` and render a view for it
        var model = this.posts.get(id) || this.posts.add({id: id});
        var view = new PostView({model: model});
        model.fetch();
      } else {
        // Fetch and populate the posts collection and render a collection view for it
        var view = new PostsView({collection: this.posts});
        this.posts.fetch();
      }
    }<% } %>
  });
});
