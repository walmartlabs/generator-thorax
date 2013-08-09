/* global <%= appName %>, Backbone, Thorax, $, _, Thorax */
define([
  'templates/<%= _.dasherize(name) %>',
  'templates/<%= _.dasherize(name) %>-item',
  'templates/<%= _.dasherize(name) %>-empty'
], function (template, itemTemplate, emptyTemplate) {

  return <%= appName %>.CollectionView.extend({
    name: '<%= name %>',
    template: template,
    itemTemplate: itemTemplate,
    emptyTemplate: emptyTemplate
  });

});
