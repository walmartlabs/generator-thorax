define [
  'cs!collection-view',
  'hbs!templates/<%= dasherizedName %>-item',
  'hbs!templates/<%= dasherizedName %>-empty'
], (CollectionView, itemTemplate, emptyTemplate) ->
  CollectionView.extend
    name: '<%= dasherizedName %>'
    itemTemplate: itemTemplate
    emptyTemplate: emptyTemplate