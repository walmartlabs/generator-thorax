define([
  'hbs!templates/<%= _.dasherize(name) %>.handlebars'
], function (template) {
  return <%= appName %>.View.extend({
    name: '<%= name %>',
    template: template
  });
});
