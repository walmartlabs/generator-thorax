define(['collection'], function (Collection) {
  return Collection.extend({
    name: '<%= name %>',
    url: '<%= name %>'<% if (useStubMethods) { %>,

    // Set up event listeners for related models and collections (but not views)
    initialize: function(models, options) {

    },

    // Perform any data massaging of your server response, including
    // setting up nested relationships, here.
    parse: function(resp) {

      // If your JSON response is namespaced like:
      // {
      //   ...
      //   posts: [...]
      // }
      // you would return resp.posts

      // By default just returns what was passed in.
      return resp;
    },


    // Prepare and serialize your models along with any nested relationships
    // for sending to the server
    toJSON: function() {

      // By default returns the collection's models. Be sure to `clone` if you
      // plan to modify it for the server
      var data = _.clone(this.models);

      return data;
    }<% } %>
  });
});
