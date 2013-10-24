define(['model'], function (Model) {
  return Model.extend({
    urlRoot: '/<%= name %>',

    name: '<%= name %>'<% if (useStubMethods) { %>,

    // Set up event listeners for related models and collections (but not views)
    initialize: function(attributes, options) {

    },

    // Perform any data massaging of your server response, including
    // setting up nested relationships, here.
    parse: function(resp) {

      // By default just returns what was passed in
      return resp;
    },


    // Prepare and serialize your attributes along with any nested relationships
    // for sending to the server
    toJSON: function() {

      // By default returns the model's attributes. Be sure to `clone` if you
      // plan to modify it for the server
      var data = _.clone(this.attributes);
      data.foo = 'bar';

      return data;
    }<% } %>
  });
});
