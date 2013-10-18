define([
  'view',
  'templates/<%= _.dasherize(name) %>'
], function (View, template) {
  return View.extend({
    name: '<%= name %>',
    template: template<% if (useStubMethods) { %>,

    // Any DOM events mapped to handlers
    events: {
      'click .item': 'updateItem'
    },

    // Set up any child views either in initialize or directly on the prototype
    child: new View(),

    // Set up any event listeners on the view's model / collection and any
    // child views
    initialize: function(options) {
      this.listenTo(this.model, 'change', this.render);
      this.child.on('invalid', this.markAsInvalid, this);
    }
    <% } %>
  });
});
