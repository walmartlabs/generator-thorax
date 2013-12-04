define([
  'collection-view',
  'hbs!templates/<%= dasherizedName %>',
  'hbs!templates/<%= dasherizedName %>-item',
  'hbs!templates/<%= dasherizedName %>-empty'
], function (CollectionView, template, itemTemplate, emptyTemplate) {

  return CollectionView.extend({
    name: '<%= dasherizedName %>',
    template: template,
    itemTemplate: itemTemplate,
    emptyTemplate: emptyTemplate
  });

});
