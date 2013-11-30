define([
  'collection-view',
  'hbs!templates/<%= _.dasherize(name) %>',
  'hbs!templates/<%= _.dasherize(name) %>-item',
  'hbs!templates/<%= _.dasherize(name) %>-empty'
], function (CollectionView, template, itemTemplate, emptyTemplate) {

  return CollectionView.extend({
    name: '<%= name %>',
    template: template,
    itemTemplate: itemTemplate,
    emptyTemplate: emptyTemplate
  });

});
