define([
  'view',
  'templates/<%= _.dasherize(name) %>'
], function (View, template) {
  return View.extend({
    name: '<%= name %>',
    template: template
  });
});
