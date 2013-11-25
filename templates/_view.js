define([
  'view',
  'hbs!templates/<%= _.dasherize(name) %>'
], function (View, template) {
  return View.extend({
    name: '<%= name %>',
    template: template
  });
});
