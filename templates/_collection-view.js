define([
  'hbs!templates/<%= _.dasherize(name) %>.handlebars',
  'hbs!templates/<%= _.dasherize(name) %>-item.handlebars',
  'hbs!templates/<%= _.dasherize(name) %>-empty.handlebars'
], function (template, itemTemplate, emptyTemplate) {

  return <%= appName %>.CollectionView.extend({
    name: '<%= name %>',
    template: template,
    itemTemplate: itemTemplate,
    emptyTemplate: emptyTemplate
  });

});
