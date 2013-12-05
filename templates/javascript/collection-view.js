define([
  'collection-view',
  'hbs!templates/<%= dasherizedName %>-item',
  'hbs!templates/<%= dasherizedName %>-empty'
], function (CollectionView, itemTemplate, emptyTemplate) {
  return CollectionView.extend({
    name: '<%= dasherizedName %>',
    itemTemplate: itemTemplate,
    emptyTemplate: emptyTemplate
  });
});
