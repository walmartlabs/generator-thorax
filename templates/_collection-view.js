define([
  'collection-view',
  'templates/<%= _.dasherize(name) %>',
  'templates/<%= _.dasherize(name) %>-item',
  'templates/<%= _.dasherize(name) %>-empty'
], function (CollectionView, template, itemTemplate, emptyTemplate) {

  return CollectionView.extend({
    name: '<%= name %>',
    template: template,
    itemTemplate: itemTemplate,
    emptyTemplate: emptyTemplate
  });

});
