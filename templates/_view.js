/* global <%= appName %>, Backbone, Thorax, $, _, Thorax */
define([
  'templates/<%= _.dasherize(name) %>'
], function (template) {
  return <%= appName %>.View.extend({
    name: '<%= name %>',
    template: template
  });
});
