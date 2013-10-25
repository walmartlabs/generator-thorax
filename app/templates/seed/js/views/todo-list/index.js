define([
  'view',
  'hbs!templates/todo-list/index'
], function(View, template) {
  return View.extend({
    name: "todo-list/index",
    template: template,
    events: {
      "submit form": function(event) {
        event.preventDefault();
        var attrs = this.serialize();
        this.collection.add(attrs);
        this.$('input[name="title"]').val('');
      },
      'change input[type="checkbox"]': function(event) {
        var model = $(event.target).model();
        model.set({done: event.target.checked});
      }
    }
  });
});

